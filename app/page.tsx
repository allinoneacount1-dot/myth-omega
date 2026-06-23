import { Hero } from '@/components/Hero';
import { ChapterSection } from '@/components/ChapterSection';
import { AgentsShowcase } from '@/components/AgentsShowcase';
import { TokenSection } from '@/components/TokenSection';
import { Ecosystem } from '@/components/Ecosystem';
import { FinalCTA } from '@/components/FinalCTA';
import { Footer } from '@/components/Footer';
import { Navigation } from '@/components/Navigation';
import { CHAPTERS } from '@/lib/content';

export default function Home() {
  return (
    <main id="top" className="bg-void">
      <Navigation />
      <Hero />

      {CHAPTERS.map((chapter) => (
        <ChapterSection key={chapter.index} chapter={chapter} />
      ))}

      <AgentsShowcase />
      <TokenSection />
      <Ecosystem />
      <FinalCTA />
      <Footer />
    </main>
  );
}