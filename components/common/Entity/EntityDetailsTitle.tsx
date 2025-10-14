export const titleStyles = "text-xs font-bold text-black dark:text-white";

interface EntityDetailsTitleProps {
  children: React.ReactNode;
}

export function EntityDetailsTitle({ children }: EntityDetailsTitleProps) {
  return <span className={titleStyles}>{children}</span>;
}
