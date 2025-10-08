export const titleStyles =
  "text-sm font-bold text-black dark:text-white inline";

interface GridItemTitleProps {
  children: React.ReactNode;
}

export function GridItemTitle({ children }: GridItemTitleProps) {
  return <h4 className={titleStyles}>{children}</h4>;
}
