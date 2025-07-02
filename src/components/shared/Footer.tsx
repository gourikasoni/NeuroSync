import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white/70 backdrop-blur-md border-t border-[#fceeee] py-6 mt-12 text-sm text-gray-600">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center px-4 gap-4 text-center sm:text-left">
        <p className="text-xs">&copy; {new Date().getFullYear()} NeuroSync-Made with 💖 by Gourika.</p>

        <div className="flex items-center gap-4">
          <Link href="/about" className="hover:text-[#b28be5] transition">About</Link>
          <Link href="/privacy" className="hover:text-[#b28be5] transition">Privacy</Link>
          <Link href="/terms" className="hover:text-[#b28be5] transition">Terms</Link>
        </div>
      </div>
    </footer>
  );
}
