export const titleStyles =
  "text-sm font-bold text-black dark:text-white inline";

interface ListItemTitleProps {
  children: React.ReactNode;
}

export function ListItemTitle({ children }: ListItemTitleProps) {
  return <h4 className={titleStyles}>{children}</h4>;
}
