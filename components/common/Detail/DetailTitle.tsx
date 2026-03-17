export const titleStyles = "text-xs font-bold text-black dark:text-white";

interface DetailTitleProps {
  children: React.ReactNode;
}

export function DetailTitle({ children }: DetailTitleProps) {
  return <div className={titleStyles}>{children}</div>;
}
