import { Hero } from '@/components/Hero';
import { ChapterSection } from '@/components/ChapterSection';
import { CHAPTERS } from '@/lib/content';

export default function Home() {
  const chapter1 = CHAPTERS[0];

  return (
    <main className="bg-void">
      <Hero />
      <ChapterSection chapter={chapter1} />
    </main>
  );
}