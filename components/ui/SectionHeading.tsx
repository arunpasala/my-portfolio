type SectionHeadingProps = {
  label: string;
  title: string;
  description?: string;
};

export default function SectionHeading({
  label,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div className="mb-10 max-w-3xl">
      <p className="mb-3 text-sm uppercase tracking-[0.25em] text-cyan-300/80">
        {label}
      </p>

      <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
        {title}
      </h2>

      {description && (
        <p className="mt-4 text-base leading-7 text-slate-300">
          {description}
        </p>
      )}
    </div>
  );
}