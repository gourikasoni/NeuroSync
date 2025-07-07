'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Chat', href: '/chat' },
  { name: 'Journal', href: '/journal/new' },
  { name: 'Calendar', href: '/calendar' },
  { name: 'Mood', href: '/mood' },
];

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#fceeee] bg-white/60 backdrop-blur-lg shadow-md transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4">
        {/* 🌸 Logo */}
        <Link
          href="/"
          className="text-2xl font-bold bg-gradient-to-r from-[#f99cd6] to-[#ad8cca] text-transparent bg-clip-text"
        >
          NeuroSync
        </Link>

        {/* 🌼 Desktop Nav */}
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

        {/* 📱 Mobile menu button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-[#B28BE5]"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* 👤 Auth - Desktop */}
        <div className="hidden md:flex items-center gap-4">
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>

          <SignedOut>
            <Button
              variant="ghost"
              className="border border-pink-300 text-pink-500 hover:bg-pink-50 hover:shadow-sm rounded-full text-sm px-4 py-2 transition"
              asChild
            >
              <Link href="/sign-in">Sign In</Link>
            </Button>

            <Button
              className="bg-gradient-to-r from-[#F79BD3] to-[#B5B9F8] text-white font-semibold hover:opacity-90 shadow-md rounded-full text-sm px-4 py-2 transition"
              asChild
            >
              <Link href="/sign-up">Sign Up</Link>
            </Button>
          </SignedOut>
        </div>
      </div>

      {/* 📱 Mobile dropdown menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-[#fceeee] px-4 py-3 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block text-sm font-medium ${
                pathname === link.href
                  ? 'text-[#B28BE5]'
                  : 'text-gray-600 hover:text-[#9cc3e5]'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}

          {/* Auth - Mobile */}
          <div className="pt-3 flex flex-col gap-2">
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>

            <SignedOut>
              <Button
                variant="outline"
                className="text-pink-500 border-pink-300 hover:bg-pink-50 text-sm"
                asChild
              >
                <Link href="/sign-in">Sign In</Link>
              </Button>
              <Button
                className="bg-gradient-to-r from-[#F79BD3] to-[#B5B9F8] text-white text-sm font-semibold"
                asChild
              >
                <Link href="/sign-up">Sign Up</Link>
              </Button>
            </SignedOut>
          </div>
        </div>
      )}
    </header>
  );
}
