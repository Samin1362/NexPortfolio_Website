import { techLogos } from "@/content/techLogos";

export function TechBar() {
  const doubled = [...techLogos, ...techLogos];

  return (
    <section
      aria-label="Technologies I work with"
      className="border-y border-border bg-bg-elevated py-6"
    >
      <div className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-bg-elevated to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-bg-elevated to-transparent"
        />
        <ul className="marquee-track flex w-max items-center gap-10 whitespace-nowrap">
          {doubled.map((name, i) => (
            <li
              key={`${name}-${i}`}
              className="font-[family-name:var(--font-mono)] text-sm uppercase tracking-[0.14em] text-text-subtle"
            >
              {name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
