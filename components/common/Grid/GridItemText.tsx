const styles =
  "max-w-full truncate p-1 -m-1 text-xs font-medium text-gray-500 dark:text-gray-400";

interface GridItemTextProps {
  children: React.ReactNode;
}

export function GridItemText({ children }: GridItemTextProps) {
  return <span className={styles}>{children}</span>;
}
