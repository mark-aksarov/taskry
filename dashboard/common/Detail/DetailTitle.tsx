export const titleStyles = "text-sm font-bold text-(--text-primary)";

interface DetailTitleProps {
  children: React.ReactNode;
}

export function DetailTitle({ children }: DetailTitleProps) {
  return <div className={titleStyles}>{children}</div>;
}
