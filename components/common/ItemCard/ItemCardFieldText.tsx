const styles = "text-xs font-medium text-gray-500 dark:text-gray-400";

interface ItemCardFieldTextProps {
  children: React.ReactNode;
}

export function ItemCardFieldText({ children }: ItemCardFieldTextProps) {
  return <span className={styles}>{children}</span>;
}
