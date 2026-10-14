import math
import subprocess
import random

WIDTH = 960
HEIGHT = 540
FPS = 30
DURATION = 10
TOTAL_FRAMES = FPS * DURATION

print(f"Generating {TOTAL_FRAMES} frames of 3D Plexus Network at {WIDTH}x{HEIGHT}...")

# Fixed seed for deterministic, aesthetically balanced nodes
rng = random.Random(42)

# Generate 3D nodes (X, Y, Z) in range [-300, 300]
NUM_NODES = 52
nodes = []
for i in range(NUM_NODES):
    # Cluster slightly along a toroidal / spherical cloud
    r = rng.uniform(120, 280)
    theta = rng.uniform(0, 2 * math.pi)
    phi = rng.uniform(-math.pi / 2.5, math.pi / 2.5)
    x = r * math.cos(phi) * math.cos(theta)
    y = r * math.sin(phi) * 0.75  # slightly flatter vertically
    z = r * math.cos(phi) * math.sin(theta)

    # Type of node: 0 = white, 1 = cyan, 2 = red
    n_type = 2 if i % 4 == 0 else (1 if i % 2 == 0 else 0)
    nodes.append({
        'x': x, 'y': y, 'z': z,
        'type': n_type,
        'size': rng.uniform(2.5, 4.5)
    })

# Compute static connection edges (if distance < 140)
edges = []
for i in range(NUM_NODES):
    for j in range(i + 1, NUM_NODES):
        dx = nodes[i]['x'] - nodes[j]['x']
        dy = nodes[i]['y'] - nodes[j]['y']
        dz = nodes[i]['z'] - nodes[j]['z']
        d = math.sqrt(dx*dx + dy*dy + dz*dz)
        if d < 135:
            edges.append((i, j, d))

print(f"Nodes: {NUM_NODES}, Edges: {len(edges)}")

# Open ffmpeg pipe
p = subprocess.Popen([
    'ffmpeg', '-y', '-f', 'rawvideo', '-pix_fmt', 'rgb24',
    '-s', f'{WIDTH}x{HEIGHT}', '-r', str(FPS),
    '-i', '-',
    '-vf', 'scale=1280:720',
    '-c:v', 'libx264', '-pix_fmt', 'yuv420p',
    '-preset', 'fast', '-crf', '22',
    '-movflags', '+faststart',
    'public/videos/cyber-plexus.mp4'
], stdin=subprocess.PIPE, stderr=subprocess.DEVNULL)

# Pre-generate base background gradient buffer (deep navy/black)
bg_base = bytearray(WIDTH * HEIGHT * 3)
cy = HEIGHT // 2
cx = WIDTH // 2

for y in range(HEIGHT):
    dy = abs(y - cy)
    # Horizontal horizon subtle green/cyan beam
    beam = max(0, 1.0 - (dy / 25.0)) * 25.0
    for x in range(WIDTH):
        dx = abs(x - cx)
        # Radial vignette
        dist = math.sqrt(dx*dx + dy*dy) / (WIDTH * 0.6)
        vignette = max(0.2, 1.0 - dist * 0.6)

        r = int((5 + beam * 0.1) * vignette)
        g = int((12 + beam * 0.9) * vignette)
        b = int((22 + beam * 0.5) * vignette)
        idx = (y * WIDTH + x) * 3
        bg_base[idx] = min(255, r)
        bg_base[idx + 1] = min(255, g)
        bg_base[idx + 2] = min(255, b)

# Bresenham line drawer on bytearray with alpha blending
def draw_line(buf, x0, y0, x1, y1, cr, cg, cb, alpha):
    dx = abs(x1 - x0)
    dy = abs(y1 - y0)
    sx = 1 if x0 < x1 else -1
    sy = 1 if y0 < y1 else -1
    err = dx - dy

    inv_a = 1.0 - alpha
    ar = cr * alpha
    ag = cg * alpha
    ab = cb * alpha

    while True:
        if 0 <= x0 < WIDTH and 0 <= y0 < HEIGHT:
            idx = (y0 * WIDTH + x0) * 3
            buf[idx] = int(buf[idx] * inv_a + ar)
            buf[idx + 1] = int(buf[idx + 1] * inv_a + ag)
            buf[idx + 2] = int(buf[idx + 2] * inv_a + ab)

        if x0 == x1 and y0 == y1:
            break
        e2 = 2 * err
        if e2 > -dy:
            err -= dy
            x0 += sx
        if e2 < dx:
            err += dx
            y0 += sy

# Draw filled disk
def draw_node(buf, cx, cy, rad, cr, cg, cb):
    irad = int(rad + 0.5)
    for dy in range(-irad, irad + 1):
        py = cy + dy
        if py < 0 or py >= HEIGHT:
            continue
        for dx in range(-irad, irad + 1):
            px = cx + dx
            if px < 0 or px >= WIDTH:
                continue
            if dx*dx + dy*dy <= rad*rad:
                idx = (py * WIDTH + px) * 3
                buf[idx] = min(255, max(buf[idx], cr))
                buf[idx + 1] = min(255, max(buf[idx + 1], cg))
                buf[idx + 2] = min(255, max(buf[idx + 2], cb))

# Render each frame
focal = 380.0
cam_dist = 420.0

for frame_idx in range(TOTAL_FRAMES):
    # Perfect loop angle: 0 to 2*PI
    angle_y = (frame_idx / TOTAL_FRAMES) * 2 * math.pi
    angle_x = math.sin(angle_y) * 0.18

    cos_y = math.cos(angle_y)
    sin_y = math.sin(angle_y)
    cos_x = math.cos(angle_x)
    sin_x = math.sin(angle_x)

    # Transform all nodes
    proj_nodes = []
    for node in nodes:
        # Rotate around Y
        nx = node['x'] * cos_y - node['z'] * sin_y
        nz = node['x'] * sin_y + node['z'] * cos_y
        # Rotate around X
        ny = node['y'] * cos_x - nz * sin_x
        nz2 = node['y'] * sin_x + nz * cos_x + cam_dist

        if nz2 <= 10:
            nz2 = 10

        scale = focal / nz2
        sx = int(WIDTH / 2 + nx * scale)
        sy = int(HEIGHT / 2 + ny * scale)
        proj_nodes.append((sx, sy, scale, nz2, node['type'], node['size']))

    # Copy base frame
    buf = bytearray(bg_base)

    # Draw edges
    for i, j, orig_d in edges:
        p1 = proj_nodes[i]
        p2 = proj_nodes[j]

        # Depth fade
        avg_z = (p1[3] + p2[3]) * 0.5
        alpha = max(0.08, min(0.7, (500.0 / avg_z) * (1.0 - orig_d / 140.0)))

        # Edge color (cyan-white)
        draw_line(buf, p1[0], p1[1], p2[0], p2[1], 100, 220, 255, alpha)

    # Draw nodes
    for sx, sy, scale, z, n_type, base_sz in proj_nodes:
        if 0 <= sx < WIDTH and 0 <= sy < HEIGHT:
            sz = max(1.5, base_sz * scale * 1.8)
            if n_type == 2:  # Red/molten accent
                draw_node(buf, sx, sy, sz, 255, 60, 50)
                # halo
                draw_node(buf, sx, sy, sz * 1.8, 120, 25, 20)
            elif n_type == 1:  # Cyan
                draw_node(buf, sx, sy, sz, 0, 235, 255)
                draw_node(buf, sx, sy, sz * 1.8, 0, 90, 110)
            else:  # White / core
                draw_node(buf, sx, sy, sz, 245, 250, 255)
                draw_node(buf, sx, sy, sz * 1.6, 60, 120, 160)

    p.stdin.write(buf)

p.stdin.close()
p.wait()
print(f"Done! Saved public/videos/cyber-plexus.mp4 (Exit code: {p.returncode})")
