import { BaseLink } from "@/ui/Link";

export const headingStyles = "text-xl font-bold text-(--text-primary)";

export const Logo = () => {
  return (
    <BaseLink href="/" className={headingStyles}>
      Taskry
    </BaseLink>
  );
};
