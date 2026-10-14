'use client';

import React, { useEffect, useState } from 'react';

export function DhakaClock() {
  const [timeString, setTimeString] = useState<string>('06:00 PM GMT+6');

  useEffect(() => {
    function updateClock() {
      try {
        const formatter = new Intl.DateTimeFormat('en-US', {
          timeZone: 'Asia/Dhaka',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        });
        setTimeString(`${formatter.format(new Date())} (Dhaka)`);
      } catch {
        setTimeString('Dhaka GMT+6');
      }
    }

    updateClock();
    const interval = setInterval(updateClock, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="inline-flex items-center gap-2 text-xs font-medium tracking-wide text-[var(--navy-400)] dark:text-[var(--color-text-secondary)]"
      title="Current local time in Dhaka, Bangladesh"
    >
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--orange-500)] opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--orange-500)]"></span>
      </span>
      <span className="tabular-nums font-mono">{timeString}</span>
    </div>
  );
}
