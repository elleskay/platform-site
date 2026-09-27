/* Two-column section header: a large two-line title on the left, a lead-in
   paragraph and optional arrow links on the right. Shared by the server page
   and the gallery island. */
export default function SectionHead({
  title,
  intro,
  links = [],
}: {
  title: React.ReactNode;
  intro: React.ReactNode;
  links?: [string, string][];
}) {
  return (
    <div className="grid gap-6 md:grid-cols-2 md:gap-12">
      <h2 className="text-[36px] font-medium leading-[1.05] tracking-title sm:text-[48px] sm:leading-none">{title}</h2>
      <div>
        <p className="max-w-xl text-[19px] leading-[1.4] tracking-[-0.012em] text-ink-2 sm:text-[24px] sm:leading-[1.33]">{intro}</p>
        {links.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
            {links.map(([label, href]) => (
              <a key={href} href={href} className="text-muted transition-colors hover:text-ink">
                {label} <span aria-hidden>→</span>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
