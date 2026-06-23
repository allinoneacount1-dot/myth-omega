import { Navigation } from '@/components/Navigation';
import { CivilizationProfileClient } from '@/components/CivilizationProfile';
import { CIVILIZATION_PROFILES, getAllCivilizationSlugs } from '@/lib/civilizations';

export function generateStaticParams() {
  return getAllCivilizationSlugs().map((slug) => ({ name: slug }));
}

export default function CivilizationProfilePage({ params }: { params: { name: string } }) {
  const slug = decodeURIComponent(params.name).toLowerCase();
  const profile = CIVILIZATION_PROFILES[slug];

  if (!profile) {
    return (
      <main className="bg-void text-ivory min-h-screen">
        <Navigation />
        <section className="section-lg pt-40 text-center">
          <h1 className="headline-section text-ivory">Civilization Not Found</h1>
          <p className="mt-6 text-ivory/60">This civilization does not exist in the MYTH network.</p>
          <a href="/atlas" className="label mt-8 inline-flex items-center gap-3 border border-gold px-8 py-4 text-gold">
            Explore the Atlas<span aria-hidden="true">→</span>
          </a>
        </section>
      </main>
    );
  }

  const otherCivs = Object.values(CIVILIZATION_PROFILES)
    .filter((c) => c.slug !== slug)
    .map((c) => ({ slug: c.slug, name: c.name, genre: c.genre, color: c.color }));

  return (
    <>
      <Navigation />
      <CivilizationProfileClient profile={profile} otherCivs={otherCivs} />
    </>
  );
}
