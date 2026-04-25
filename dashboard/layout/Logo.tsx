import { BaseLink } from "@/ui/Link";

export const headingStyles = "text-xl font-bold text-black dark:text-white";

export const Logo = () => {
  return (
    <BaseLink href="/" className={headingStyles}>
      Taskry
    </BaseLink>
  );
};
