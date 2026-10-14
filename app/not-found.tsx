import React from 'react';
import Link from 'next/link';
import { Home, ArrowLeft } from 'lucide-react';
import { AppShell } from '@/components/shell/AppShell';

export default function NotFound() {
  return (
    <AppShell>
      <div className="py-20 text-center space-y-6 max-w-lg mx-auto">
        <span className="font-mono text-xs font-bold text-[var(--red-700)] dark:text-[var(--orange-500)] uppercase">
          Status 404
        </span>
        <h1 className="text-4xl font-extrabold text-[var(--navy-900)] dark:text-[var(--white)]">
          Page Not Found
        </h1>
        <p className="text-sm leading-relaxed text-[var(--navy-800)] dark:text-[#C7D4DB]">
          The requested page or resource could not be found. Please check the URL or use the navigation below to return to published services.
        </p>

        <div className="pt-4 flex flex-wrap gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[var(--orange-600)] hover:bg-[var(--orange-700)] text-white text-sm font-bold shadow-xs transition-colors"
          >
            <Home className="h-4 w-4" />
            <span>Return to Homepage</span>
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-[var(--navy-800)] dark:border-[var(--color-border)] hover:bg-[var(--navy-50)] dark:hover:bg-[var(--navy-800)] text-[var(--navy-800)] dark:text-[var(--white)] text-sm font-semibold transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>View All Services</span>
          </Link>
        </div>
      </div>
    </AppShell>
  );
}
