import { MythMark } from './glyphs';

export function Footer() {
  return (
    <footer className="border-t border-rule bg-void-deep">
      <div className="mx-auto max-w-[1440px] px-6 py-16 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <MythMark size={40} stroke="#F7F4EE" />
              <span className="font-display text-2xl text-ivory" style={{ fontFamily: 'var(--font-display), serif' }}>
                MYTH
              </span>
            </div>
            <p className="mt-6 max-w-md text-sm text-ivory/55" style={{ lineHeight: '1.7' }}>
              The first Culture Engine. Infrastructure for civilizations that intend to be remembered.
            </p>
            <p className="mt-8 label text-ivory/30">© 2026 MYTH Foundation</p>
          </div>

          {/* Links */}
          <div className="md:col-span-7">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-3">
              <div>
                <span className="label text-gold/70">Engine</span>
                <ul className="mt-4 space-y-3">
                  {['Genesis', 'Intelligence', 'Archive', 'Commons', 'Market', 'Atlas'].map((x) => (
                    <li key={x}>
                      <a href="#" className="text-sm text-ivory/65 transition-colors duration-300 hover:text-gold">{x}</a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <span className="label text-gold/70">Network</span>
                <ul className="mt-4 space-y-3">
                  {['Solana', 'Documentation', 'Whitepaper', 'GitHub', 'Brand Kit'].map((x) => (
                    <li key={x}>
                      <a href="#" className="text-sm text-ivory/65 transition-colors duration-300 hover:text-gold">{x}</a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <span className="label text-gold/70">Civilization</span>
                <ul className="mt-4 space-y-3">
                  {['About', 'Foundation', 'Careers', 'Press', 'Contact'].map((x) => (
                    <li key={x}>
                      <a href="#" className="text-sm text-ivory/65 transition-colors duration-300 hover:text-gold">{x}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom rule */}
        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-rule pt-8 md:flex-row md:items-center">
          <span className="label text-ivory/30">Version 1.0 / Genesis Draft</span>
          <span className="label text-ivory/30">A civilization operating system</span>
        </div>
      </div>
    </footer>
  );
}