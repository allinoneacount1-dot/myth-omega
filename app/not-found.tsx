import Link from 'next/link';
import { MythMark } from '@/components/glyphs';

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-void text-ivory">
      <div className="text-center">
        <MythMark size={80} stroke="#D8B36A" />
        <h1 className="headline-hero mt-12 text-gold">404</h1>
        <p className="mx-auto mt-8 max-w-md font-display text-xl italic text-ivory/70" style={{ fontFamily: 'var(--font-display), serif' }}>
          This chapter has not been written yet. The civilization you seek exists only in the minds of its architects.
        </p>
        <Link href="/" className="label mt-12 inline-flex items-center gap-3 border border-gold px-10 py-5 text-gold transition-all duration-700 hover:bg-gold hover:text-void">
          Return Home<span aria-hidden="true">→</span>
        </Link>
      </div>
    </main>
  );
}
