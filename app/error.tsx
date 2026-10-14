'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Unhandled runtime error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[var(--color-page-bg)] flex items-center justify-center p-6 text-center">
      <div className="max-w-md space-y-6">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--red-50)] text-[var(--red-700)]">
          <AlertCircle className="h-8 w-8" />
        </div>
        <h1 className="text-2xl font-bold text-[var(--navy-900)] dark:text-[var(--white)]">
          Application Error
        </h1>
        <p className="text-xs sm:text-sm text-[var(--navy-400)] dark:text-[#C7D4DB]">
          An unexpected error occurred while rendering this interface. Please try again or return to the main homepage.
        </p>

        <div className="flex flex-wrap gap-3 justify-center pt-2">
          {/* Rule 1: Orange fill uses navy-900 label */}
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--orange-600)] text-white text-xs font-bold shadow-xs hover:bg-[var(--orange-700)] transition-colors cursor-pointer"
          >
            <RefreshCw className="h-4 w-4 text-[var(--navy-900)]" />
            <span>Try Again</span>
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[var(--navy-800)] dark:border-[var(--color-border)] text-[var(--navy-800)] dark:text-[var(--white)] text-xs font-semibold hover:bg-[var(--navy-50)] dark:hover:bg-[var(--navy-800)] transition-colors"
          >
            <Home className="h-4 w-4" />
            <span>Go to Homepage</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
