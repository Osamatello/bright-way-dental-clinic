type SectionIntroProps = {
  eyebrow: string;
  title: string;
  body: string;
};

export function SectionIntro({ eyebrow, title, body }: SectionIntroProps) {
  return (
    <div className="grid gap-8 border-t fine-rule pt-6 lg:grid-cols-[0.9fr_1.35fr_1fr] lg:gap-12">
      <p className="text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-slate">
        {eyebrow}
      </p>
      <h2 className="display-heading max-w-xl text-4xl leading-[1.08] text-navy sm:text-5xl">
        {title}
      </h2>
      <p className="max-w-md text-sm leading-7 text-slate sm:text-base sm:leading-8">
        {body}
      </p>
    </div>
  );
}
