interface ItemCardFieldTextProps {
  children: React.ReactNode;
}

export function ItemCardFieldText({ children }: ItemCardFieldTextProps) {
  const classes =
    "overflow-hidden text-nowrap overflow-ellipsis text-xs font-medium text-gray-500 dark:text-gray-400";

  return <div className={classes}>{children}</div>;
}
