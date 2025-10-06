interface ItemCardFieldTitleProps {
  children: React.ReactNode;
}

export function ItemCardFieldTitle({ children }: ItemCardFieldTitleProps) {
  const classes =
    "overflow-hidden text-nowrap overflow-ellipsis text-sm font-bold text-black dark:text-white";

  return <h4 className={classes}>{children}</h4>;
}
