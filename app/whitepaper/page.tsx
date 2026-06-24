import { DashboardLayout } from '@/components/DashboardLayout';
import { CHAPTERS, TOKEN } from '@/lib/content';

export default function WhitepaperPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-display text-ivory" style={{ fontFamily: 'var(--font-display), serif' }}>Whitepaper</h1>
            <p className="mt-1 text-sm text-ivory/50">MYTH Culture Engine v1.0.0</p>
          </div>
          <a href="/api/whitepaper" className="label border border-gold px-4 py-2 text-gold text-xs hover:bg-gold hover:text-void">
            📄 Download Markdown
          </a>
        </div>

        <div className="border border-rule bg-void-deep p-8 max-w-3xl">
          <div className="space-y-8">
            {CHAPTERS.map((chapter) => (
              <div key={chapter.index}>
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="label text-gold">Chapter {chapter.roman}</span>
                  <span className="h-px flex-1 bg-rule" />
                </div>
                <h2 className="text-xl font-display text-ivory mb-4" style={{ fontFamily: 'var(--font-display), serif' }}>{chapter.title}</h2>
                <p className="text-sm text-ivory/70 italic mb-4" style={{ fontFamily: 'var(--font-display), serif' }}>{chapter.sub}</p>
                {chapter.body.map((para, i) => (
                  <p key={i} className="text-sm text-ivory/70 leading-relaxed mb-3">{para}</p>
                ))}
                {chapter.manifest && (
                  <div className="mt-4 border-l-2 border-gold/30 pl-4">
                    <p className="text-sm text-gold/80 italic" style={{ fontFamily: 'var(--font-display), serif' }}>{chapter.manifest}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
