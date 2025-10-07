export const titleStyles =
  "text-sm font-bold text-black dark:text-white inline";

interface ItemCardFieldTitleProps {
  children: React.ReactNode;
}

export function ItemCardFieldTitle({ children }: ItemCardFieldTitleProps) {
  return <h4 className={titleStyles}>{children}</h4>;
}
