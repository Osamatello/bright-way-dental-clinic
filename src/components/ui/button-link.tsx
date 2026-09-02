import Link from "next/link";

type ButtonLinkProps = {
  children: React.ReactNode;
  href: string;
  variant?: "primary" | "secondary" | "light";
  className?: string;
};

const variants = {
  primary:
    "border-gold bg-gold text-white hover:bg-transparent hover:text-gold",
  secondary:
    "border-navy/25 bg-transparent text-navy hover:border-navy hover:bg-navy hover:text-white",
  light:
    "border-white bg-white text-navy hover:bg-transparent hover:text-white",
};

export function ButtonLink({
  children,
  href,
  variant = "primary",
  className = "",
}: ButtonLinkProps) {
  return (
    <Link
      className={`inline-flex min-h-12 items-center justify-center border px-6 text-[0.72rem] font-semibold uppercase tracking-[0.14em] transition-colors duration-300 ${variants[variant]} ${className}`}
      href={href}
    >
      {children}
    </Link>
  );
}
