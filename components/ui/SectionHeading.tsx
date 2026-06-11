import { Reveal } from "./Reveal";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  dark?: boolean;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  dark = false,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}
    >
      {eyebrow && (
        <span
          className={`eyebrow ${
            align === "center" ? "justify-center" : ""
          } ${dark ? "text-accent" : "text-primary"}`}
        >
          {eyebrow}
        </span>
      )}
      <h2 className={`heading-lg ${dark ? "text-white" : "text-navy"}`}>
        {title}
      </h2>
      {description && (
        <p
          className={`mt-6 text-lg leading-relaxed ${
            dark ? "text-slate-400" : "text-slate-600"
          }`}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}
