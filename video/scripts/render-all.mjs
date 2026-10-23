// Renders every WhyChooseUs-* composition to the main Next.js app's
// public/videos/ as why-choose-<id>.mp4 + .webm + a poster .jpg.
//
// Invokes the Remotion CLI entrypoint directly with `node`, bypassing the
// npm-generated .bin launcher — that launcher mis-parses this workspace's
// path at the `&` in "whatsapp-api,-ai-&-web-development" and fails with
// "is not recognized as an internal or external command" (see bug.md
// BUG-001; the main app's package.json scripts use the same workaround).
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { serviceHighlights } from '../src/data/serviceHighlights.ts';

const videoRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const cli = join(videoRoot, 'node_modules', '@remotion', 'cli', 'remotion-cli.js');
const outDir = join(videoRoot, '..', 'public', 'videos');
const POSTER_FRAME = 180; // all three points are fully visible by here

if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

for (const { id } of serviceHighlights) {
  const compositionId = `WhyChooseUs-${id}`;
  const mp4 = join(outDir, `why-choose-${id}.mp4`);
  const webm = join(outDir, `why-choose-${id}.webm`);
  const poster = join(outDir, `why-choose-${id}.jpg`);

  console.log(`\n=== ${compositionId} ===`);
  execFileSync('node', [cli, 'render', compositionId, mp4, '--codec=h264'], { cwd: videoRoot, stdio: 'inherit' });
  execFileSync('node', [cli, 'render', compositionId, webm, '--codec=vp8'], { cwd: videoRoot, stdio: 'inherit' });
  execFileSync('node', [cli, 'still', compositionId, poster, `--frame=${POSTER_FRAME}`, '--image-format=jpeg'], {
    cwd: videoRoot,
    stdio: 'inherit',
  });
}

console.log(`\nRendered ${serviceHighlights.length} service videos to ${outDir}`);
