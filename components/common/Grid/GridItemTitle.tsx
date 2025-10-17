export const titleStyles =
  "overflow-hidden max-w-full text-nowrap overflow-ellipsis p-1 -m-1 text-sm font-bold text-black dark:text-white inline";

interface GridItemTitleProps {
  children: React.ReactNode;
}

export function GridItemTitle({ children }: GridItemTitleProps) {
  return <h3 className={titleStyles}>{children}</h3>;
}
