type LogoProps = {
  /** Rendered height in px (width scales automatically). */
  height?: number;
  className?: string;
};

/** hello22.ai logo — white wordmark from public/hello22-logo.png. */
export function Logo({ height = 40, className = "" }: LogoProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/hello22-logo.png"
      alt="hello22.ai"
      style={{ height, width: "auto" }}
      className={`object-contain ${className}`}
    />
  );
}
