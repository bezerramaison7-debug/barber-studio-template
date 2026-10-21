import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

type Variant = "primary" | "outline" | "ghost";

const base =
  "inline-flex min-h-12 items-center justify-center gap-2.5 rounded-sm px-6 text-[0.95rem] font-semibold tracking-wide transition-colors duration-200 disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-accent-foreground hover:bg-foreground",
  outline: "border border-foreground/40 text-foreground hover:border-accent hover:text-accent",
  ghost: "text-foreground underline decoration-accent decoration-2 underline-offset-8 hover:text-accent",
};

export function buttonClasses(variant: Variant = "primary", className = "") {
  return `${base} ${variants[variant]} ${className}`.trim();
}

type LinkButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: Variant; external?: boolean };

/** Link com aparência de botão. `external` abre em nova aba com rel seguro. */
export function LinkButton({ variant, external, className, children, ...props }: LinkButtonProps) {
  const externalProps = external ? { target: "_blank", rel: "noopener noreferrer" } : {};
  return (
    <a className={buttonClasses(variant, className)} {...externalProps} {...props}>
      {children}
      {external && <span className="sr-only"> (abre em nova aba)</span>}
    </a>
  );
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant };

export function Button({ variant, className, type = "button", ...props }: ButtonProps) {
  return <button type={type} className={buttonClasses(variant, className)} {...props} />;
}
