'use client';
import { Navigation } from '@/components/Navigation';
import { MythMark } from '@/components/glyphs';
import { SectionDivider } from '@/components/SectionDivider';
import { Reveal } from '@/components/Reveal';
import { AGENTS } from '@/lib/content';

/* ─────────────────────────────────────────────
   Data: Inheritance Tree
   ───────────────────────────────────────────── */

interface TreeNode {
  id: string;
  name: string;
  generation: number;
  description: string;
  active?: boolean;
  children?: TreeNode[];
}

const TREE: TreeNode = {
  id: 'founding-myth',
  name: 'The Founding Myth',
  generation: 0,
  description: 'The original canon — a single source of meaning from which all lineages descend.',
  children: [
    {
      id: 'order-path',
      name: 'Order Path',
      generation: 1,
      description: 'Law, structure, sacred hierarchy — the civilization as temple.',
      children: [
        { id: 'aetheria', name: 'Aetheria', generation: 2, description: 'Seasonal rites govern the rhythm of civilization.', active: true },
        { id: 'amber-highlands', name: 'Amber Highlands', generation: 2, description: 'Mountains hold memory. Stone remembers what people forget.', active: true },
      ],
    },
    {
      id: 'chaos-path',
      name: 'Chaos Path',
      generation: 1,
      description: 'Entropy, mutation, emergent narrative — the civilization as storm.',
      children: [
        { id: 'void-meridian', name: 'Void Meridian', generation: 2, description: 'The space between stories is where new myth is born.', active: true },
        { id: 'ember-accord', name: 'Ember Accord', generation: 2, description: 'Fire reshapes. The old burn to make way for the new.', active: true },
      ],
    },
    {
      id: 'synthesis',
      name: 'Synthesis',
      generation: 1,
      description: 'Integration, harmony, the golden mean — the civilization as garden.',
      children: [
        { id: 'silent-bloom', name: 'Silent Bloom', generation: 2, description: 'What grows slowly lasts longest. Patience as doctrine.', active: true },
        { id: 'chrono-veil', name: 'Chronos Veil', generation: 2, description: 'Time is a garment the world wears. It can be changed.', active: true },
      ],
    },
  ],
};

/* Flatten for leaf-node extraction */
function getLeaves(node: TreeNode): TreeNode[] {
  if (!node.children || node.children.length === 0) return [node];
  return node.children.flatMap(getLeaves);
}

const LEAVES = getLeaves(TREE);

/* ─────────────────────────────────────────────
   Data: Generation Timeline
   ───────────────────────────────────────────── */

const GENERATIONS = [
  { gen: 0, label: 'The Founding', year: 0, description: 'The original myth. A single voice in the dark, declaring what is.', entries: 1 },
  { gen: 1, label: 'The First Schism', year: 12, description: 'One myth became three. Interpretation is the beginning of civilization.', entries: 47 },
  { gen: 2, label: 'The Great Fork', year: 38, description: 'Every branch split again. Diversity of meaning. The canon multiplied.', entries: 186 },
  { gen: 3, label: 'The Living Present', year: 67, description: 'Six civilizations carry the canon forward. The myth is alive — and arguing.', entries: 684 },
];

/* ─────────────────────────────────────────────
   Data: Canon Events
   ───────────────────────────────────────────── */

const CANON_EVENTS = [
  { id: 1, event: 'Aetheria canon forked from Synthesis branch', detail: 'The Rite of Seasons added', type: 'fork' as const },
  { id: 2, event: 'Chronos Veil merged with Amber Highlands timeline', detail: 'Temporal-Saga synthesis', type: 'merge' as const },
  { id: 3, event: 'Void Meridian canon conflict detected', detail: 'Lorekeeper intervention required', type: 'conflict' as const },
  { id: 4, event: 'Ember Accord inherited governance model from Aetheria', detail: 'Adapted for political drama', type: 'inherit' as const },
  { id: 5, event: 'Silent Bloom new canon entry: The Verdant Genesis', detail: 'Approved by Lorekeeper', type: 'addition' as const },
];

/* ─────────────────────────────────────────────
   Component: Single Tree Node (recursive)
   ───────────────────────────────────────────── */

function TreeNodeCard({ node }: { node: TreeNode }) {
  const isRoot = node.generation === 0;
  const hasChildren = !!(node.children && node.children.length > 0);

  return (
    <div className="flex flex-col items-center">
      {/* Node card */}
      <div
        className={`
          group relative z-10 inline-flex items-center gap-3 border border-rule bg-void-deep px-5 py-3
          transition-all duration-500 hover:border-gold/30 hover:bg-sapphire/20
          ${isRoot ? 'hero-pulse-glow' : ''}
        `}
      >
        {/* Dot */}
        <span
          className={`
            inline-block h-2.5 w-2.5 shrink-0 rounded-full
            ${node.active || isRoot
              ? 'bg-gold shadow-[0_0_8px_rgba(216,179,106,0.4)]'
              : 'bg-ivory/40'
            }
          `}
        />

        {/* Text */}
        <div className="flex flex-col">
          <span
            className="text-[13px] tracking-wide text-ivory/90"
            style={{ fontFamily: 'var(--font-display), Georgia, serif' }}
          >
            {node.name}
          </span>
          <span className="label text-ivory/35">
            Gen {node.generation}
          </span>
        </div>

        {/* Hover tooltip */}
        <span className="pointer-events-none absolute left-0 top-full z-20 mt-1 hidden w-72 border border-rule bg-void-deep/95 px-4 py-3 text-xs leading-relaxed text-ivory/60 backdrop-blur-sm group-hover:block">
          {node.description}
        </span>
      </div>

      {/* Children */}
      {hasChildren && (
        <>
          {/* Vertical connector from parent to horizontal bar */}
          <div className="h-6 w-px bg-rule" />

          {/* Children row */}
          <div className="flex items-start gap-6">
            {node.children!.map((child, idx) => (
              <div key={child.id} className="flex flex-col items-center">
                {/* Vertical connector from horizontal bar down to child */}
                <div className="h-6 w-px bg-rule" />
                <TreeNodeCard node={child} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Page Component
   ───────────────────────────────────────────── */

export default function InheritancePage() {
  return (
    <main className="bg-void text-ivory">
      <Navigation />

      {/* ═══════════════════════════════════════════
          HERO
          ═══════════════════════════════════════════ */}
      <section className="relative flex min-h-[55vh] items-center justify-center pt-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_20%,rgba(216,179,106,0.05)_0%,transparent_60%)]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, transparent, transparent 120px, rgba(247,244,238,0.1) 120px, rgba(247,244,238,0.1) 121px)',
          }}
        />
        <div className="relative z-10 mx-auto max-w-[1440px] px-6 text-center md:px-10 lg:px-16">
          <Reveal>
            <span className="label text-gold">The Long Arc</span>
            <h1 className="headline-hero mt-6 text-ivory">
              What Time
              <br />
              Cannot Erase
            </h1>
            <p
              className="mx-auto mt-8 max-w-2xl font-display text-xl italic text-ivory/75 md:text-2xl"
              style={{ fontFamily: 'var(--font-display), serif' }}
            >
              Canon is not static. It is passed down, forked, merged, and reinterpreted
              across generations. Trace the lineage of meaning.
            </p>
          </Reveal>
        </div>
      </section>

      <SectionDivider variant="glyph" />

      {/* ═══════════════════════════════════════════
          INHERITANCE TREE
          ═══════════════════════════════════════════ */}
      <section className="section-lg mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16">
        <Reveal>
          <div className="mb-16 text-center">
            <span className="label text-gold/60">Genealogy of Meaning</span>
            <h2 className="headline-section mt-5 text-ivory">The Inheritance Tree</h2>
            <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-ivory/55">
              Every civilization is a branch. Every branch was once a root. Follow the
              descent.
            </p>
          </div>
        </Reveal>

        {/* Tree visualization */}
        <Reveal delay={0.15}>
          <div className="border border-rule bg-void-deep p-8 md:p-12 lg:p-16">
            <div className="overflow-x-auto">
              <div className="mx-auto flex justify-center" style={{ minWidth: '640px' }}>
                <TreeNodeCard node={TREE} />
              </div>
            </div>
          </div>
        </Reveal>

        {/* Leaf nodes summary */}
        <Reveal delay={0.3}>
          <div className="mt-12 grid grid-cols-2 gap-px bg-rule md:grid-cols-3 lg:grid-cols-6">
            {LEAVES.map((leaf) => (
              <div
                key={leaf.id}
                className="group flex flex-col bg-void-deep p-5 transition-colors duration-500 hover:bg-sapphire/20"
              >
                <span className="label text-gold/50">Gen {leaf.generation}</span>
                <span
                  className="mt-2 text-sm text-ivory/85"
                  style={{ fontFamily: 'var(--font-display), Georgia, serif' }}
                >
                  {leaf.name}
                </span>
                <p className="mt-2 flex-1 text-xs leading-relaxed text-ivory/40">
                  {leaf.description}
                </p>
                <div className="mt-4 h-px w-6 bg-gold/30 transition-all duration-500 group-hover:w-full" />
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <SectionDivider variant="particles" />

      {/* ═══════════════════════════════════════════
          GENERATION TIMELINE
          ═══════════════════════════════════════════ */}
      <section className="section-lg mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16">
        <Reveal>
          <div className="mb-16 text-center">
            <span className="label text-gold/60">Chronology</span>
            <h2 className="headline-section mt-5 text-ivory">Generation Timeline</h2>
            <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-ivory/55">
              Each generation carries the weight of what came before — and the
              responsibility of what comes next.
            </p>
          </div>
        </Reveal>

        {/* Timeline track */}
        <Reveal delay={0.1}>
          <div className="relative">
            {/* Horizontal line */}
            <div className="absolute left-0 right-0 top-5 hidden h-px bg-rule md:block" />

            {/* Milestones */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-4 md:gap-0">
              {GENERATIONS.map((gen) => (
                <div key={gen.gen} className="relative flex flex-col items-center">
                  {/* Node dot */}
                  <div
                    className={`
                      relative z-10 mb-6 flex h-10 w-10 items-center justify-center rounded-full border
                      ${
                        gen.gen === 3
                          ? 'border-gold bg-gold/10 shadow-[0_0_20px_rgba(216,179,106,0.2)]'
                          : 'border-rule bg-void-deep'
                      }
                    `}
                  >
                    <span className="label text-ivory/70">{gen.gen}</span>
                  </div>

                  {/* Pulse ring for current generation */}
                  {gen.gen === 3 && (
                    <span className="absolute top-0 z-10 h-10 w-10 animate-ping rounded-full border border-gold/20" />
                  )}

                  {/* Card */}
                  <div
                    className={`
                      w-full border border-rule bg-void-deep p-6 transition-all duration-500
                      ${
                        gen.gen === 3
                          ? 'border-gold/20 bg-sapphire/10'
                          : 'hover:border-gold/20'
                      }
                    `}
                  >
                    <span className="label text-gold/50">Year {gen.year}</span>
                    <h3
                      className="mt-3 text-lg text-ivory/90"
                      style={{ fontFamily: 'var(--font-display), Georgia, serif' }}
                    >
                      {gen.label}
                    </h3>
                    <p className="mt-3 text-xs leading-relaxed text-ivory/50">
                      {gen.description}
                    </p>
                    <div className="mt-4 flex items-center gap-2">
                      <div className="h-px flex-1 bg-rule" />
                      <span className="label text-gold/40">{gen.entries} entries</span>
                      <div className="h-px flex-1 bg-rule" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      <SectionDivider variant="wave" />

      {/* ═══════════════════════════════════════════
          INHERITANCE METRICS
          ═══════════════════════════════════════════ */}
      <section className="section-lg mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16">
        <Reveal>
          <div className="mb-16 text-center">
            <span className="label text-gold/60">State of the Canon</span>
            <h2 className="headline-section mt-5 text-ivory">Inheritance Metrics</h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 gap-px bg-rule md:grid-cols-3 lg:grid-cols-6">
          {[
            { label: 'Total Canon Entries', value: '918' },
            { label: 'Active Lineages', value: '6' },
            { label: 'Fork Events', value: '12' },
            { label: 'Merge Events', value: '3' },
            { label: 'Conflicts Resolved', value: '47' },
            { label: 'Generations Deep', value: '4' },
          ].map((metric, i) => (
            <Reveal key={metric.label} delay={0.08 * i}>
              <div className="group flex flex-col items-center bg-void-deep px-6 py-10 text-center transition-colors duration-500 hover:bg-sapphire/15">
                <span className="headline-editorial text-gold">{metric.value}</span>
                <span className="mt-3 label text-ivory/40">{metric.label}</span>
                <div className="mt-6 h-px w-8 bg-gold/20 transition-all duration-500 group-hover:w-16" />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <SectionDivider variant="glyph" />

      {/* ═══════════════════════════════════════════
          CANON EVENTS LOG
          ═══════════════════════════════════════════ */}
      <section className="section-lg mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16">
        <Reveal>
          <div className="mb-16">
            <span className="label text-gold/60">Recent Activity</span>
            <h2 className="headline-section mt-5 text-ivory">Canon Events Log</h2>
            <p className="mt-6 max-w-xl text-sm leading-relaxed text-ivory/55">
              Every action on the canon is recorded. Forks, merges, inheritances — the
              ledger of living meaning.
            </p>
          </div>
        </Reveal>

        <div className="border border-rule bg-void-deep">
          {/* Header row */}
          <div className="hidden grid-cols-12 gap-4 border-b border-rule px-6 py-4 md:grid">
            <span className="col-span-1 label text-ivory/20">#</span>
            <span className="col-span-6 label text-ivory/20">Event</span>
            <span className="col-span-2 label text-ivory/20">Type</span>
            <span className="col-span-3 label text-ivory/20">Detail</span>
          </div>

          {/* Events */}
          {CANON_EVENTS.map((event, i) => {
            const typeColors: Record<string, string> = {
              fork: 'text-gold border-gold/30 bg-gold/5',
              merge: 'text-cyan border-cyan/30 bg-cyan/5',
              conflict: 'text-ember border-ember/30 bg-ember/5',
              inherit: 'text-ivory/70 border-ivory/20 bg-ivory/5',
              addition: 'text-emerald-400 border-emerald-400/30 bg-emerald-400/5',
            };
            const typeColor = typeColors[event.type] || typeColors.addition;

            return (
              <Reveal key={event.id} delay={0.1 * i}>
                <div className="group grid grid-cols-1 gap-2 border-b border-rule/50 px-6 py-5 transition-colors duration-500 hover:bg-sapphire/10 last:border-b-0 md:grid-cols-12 md:gap-4">
                  <span className="label text-ivory/25">
                    {String(event.id).padStart(2, '0')}
                  </span>
                  <span
                    className="text-sm text-ivory/80 md:col-span-6"
                    style={{ fontFamily: 'var(--font-display), Georgia, serif' }}
                  >
                    {event.event}
                  </span>
                  <span className="md:col-span-2">
                    <span className={`inline-block border px-2.5 py-1 label ${typeColor}`}>
                      {event.type}
                    </span>
                  </span>
                  <span className="text-xs leading-relaxed text-ivory/45 md:col-span-3">
                    {event.detail}
                  </span>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <SectionDivider variant="gradient" />

      {/* ═══════════════════════════════════════════
          CTA: Link to Agents
          ═══════════════════════════════════════════ */}
      <section className="section-lg mx-auto max-w-[1440px] px-6 text-center md:px-10 lg:px-16">
        <Reveal>
          <div className="border border-rule bg-void-deep p-12 md:p-20">
            <span className="label text-gold/50">Continue the lineage</span>
            <h2
              className="headline-editorial mt-6 text-ivory"
              style={{ fontFamily: 'var(--font-display), serif' }}
            >
              The canon is tended by those who care for it.
            </h2>
            <p className="mx-auto mt-6 max-w-lg text-sm leading-relaxed text-ivory/50">
              Seven agents guard the inheritance. Each holds a single sacred duty.
              Together, they ensure that what time cannot erase, neither shall neglect.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a
                href="/agents"
                className="label border border-gold/40 px-8 py-4 text-gold transition-all duration-500 hover:border-gold hover:bg-gold/10"
              >
                Meet the Seven Agents
              </a>
              <a
                href="/archive"
                className="label border border-rule px-8 py-4 text-ivory/50 transition-all duration-500 hover:border-gold/40 hover:text-ivory/80"
              >
                Explore the Archive
              </a>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ═══════════════════════════════════════════
          FOOTER
          ═══════════════════════════════════════════ */}
      <footer className="border-t border-rule bg-void-deep">
        <div className="mx-auto max-w-[1440px] px-6 py-16 md:px-10 lg:px-16">
          <div className="flex items-center gap-3">
            <MythMark size={40} stroke="#F7F4EE" />
            <span
              className="font-display text-2xl text-ivory"
              style={{ fontFamily: 'var(--font-display), serif' }}
            >
              MYTH
            </span>
          </div>
          <p className="mt-6 max-w-md text-sm text-ivory/45" style={{ lineHeight: '1.7' }}>
            The first Culture Engine. Infrastructure for civilizations that intend to be
            remembered.
          </p>
          <p className="mt-8 label text-ivory/25">&copy; 2026 MYTH Foundation</p>
        </div>
      </footer>
    </main>
  );
}
