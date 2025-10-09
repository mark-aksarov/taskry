export const titleStyles =
  "overflow-hidden max-w-full p-1 -m-1 text-nowrap overflow-ellipsis text-sm font-bold text-black dark:text-white inline";

interface ListItemTitleProps {
  children: React.ReactNode;
}

export function ListItemTitle({ children }: ListItemTitleProps) {
  return <h4 className={titleStyles}>{children}</h4>;
}
