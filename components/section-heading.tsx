export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-8 max-w-2xl">
      <span className="mb-3 block text-xs font-medium uppercase tracking-[0.18em] text-violet-400">
        {eyebrow}
      </span>
      <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-sm leading-6 text-zinc-400">{description}</p>
      )}
    </div>
  );
}
