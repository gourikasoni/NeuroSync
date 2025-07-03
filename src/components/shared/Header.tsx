'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Journal', href: '/journal' },
  { name: 'About', href: '/about' },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#fceeee] bg-white/60 backdrop-blur-lg shadow-md transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4">
        
        {/* 🧠 Logo with pastel gradient */}
        <Link
          href="/"
          className="text-2xl font-bold bg-gradient-to-r from-[#f99cd6] to-[#ad8cca] text-transparent bg-clip-text"
        >
          NeuroSync
        </Link>

        {/* 🌸 Nav links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`transition-colors ${
                pathname === link.href
                  ? 'text-[#B28BE5] font-semibold'
                  : 'text-gray-500 hover:text-[#9cc3e5]'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* 👤 Auth Section */}
        <div className="flex items-center gap-4">
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>

          <SignedOut>
  {/* Sign In - subtle outlined pink button */}
  <Button
    variant="ghost"
    className="border border-pink-300 text-pink-500 hover:bg-pink-50 hover:shadow-sm rounded-full text-sm px-4 py-2 transition"
    asChild
  >
    <Link href="/sign-in">Sign In</Link>
  </Button>

  {/* Sign Up - pastel gradient filled button */}
  <Button
    className="bg-gradient-to-r from-[#F79BD3] to-[#B5B9F8] text-white font-semibold hover:opacity-90 shadow-md rounded-full text-sm px-4 py-2 transition"
    asChild
  >
    <Link href="/sign-up">Sign Up</Link>
  </Button>
</SignedOut>

        </div>
      </div>
    </header>
  );
}

