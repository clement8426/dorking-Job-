'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BriefcaseIcon, EnvelopeIcon } from '@heroicons/react/24/outline';

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="flex justify-center py-4 bg-gray-900 mb-6 border-b border-gray-800">
      <div className="flex gap-4">
        <Link
          href="/"
          className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
            pathname === '/' ? 'bg-blue-900 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
        >
          <BriefcaseIcon className="h-5 w-5" />
          <span>Recherche d&apos;emploi</span>
        </Link>

        <Link
          href="/emails"
          className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
            pathname === '/emails' ? 'bg-blue-900 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
        >
          <EnvelopeIcon className="h-5 w-5" />
          <span>Recherche d&apos;emails</span>
        </Link>
      </div>
    </nav>
  );
}
