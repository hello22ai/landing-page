import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

type SectionHeadingProps = {
  eyebrow?: string;
  /** Plain string or JSX. Wrap the accent phrase in <em>…</em> for the italic blue treatment. */
  title: ReactNode;
  description?: string;
  align?: "center" | "left";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: SectionHeadingProps) {
  return (
    <Reveal
      className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}
    >
      {eyebrow && (
        <span
          className={`eyebrow text-primary ${
            align === "center" ? "justify-center" : ""
          }`}
        >
          {eyebrow}
        </span>
      )}
      <h2 className="heading-lg text-white">{title}</h2>
      {description && (
        <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-400">
          {description}
        </p>
      )}
    </Reveal>
  );
}
