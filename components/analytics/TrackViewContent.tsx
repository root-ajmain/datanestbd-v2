'use client';

import { useEffect } from 'react';
import { trackViewContent } from '@/lib/analytics';

/** Drop into any server-rendered page to fire a Pixel ViewContent event once on mount. */
export function TrackViewContent({ contentName }: { contentName: string }) {
  useEffect(() => {
    trackViewContent(contentName);
  }, [contentName]);

  return null;
}
