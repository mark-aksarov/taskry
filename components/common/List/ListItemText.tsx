const styles = "text-xs font-medium text-gray-500 dark:text-gray-400";

interface ListItemTextProps {
  children: React.ReactNode;
}

export function ListItemText({ children }: ListItemTextProps) {
  return <span className={styles}>{children}</span>;
}
