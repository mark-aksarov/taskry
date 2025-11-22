const styles = "text-sm font-medium text-gray-500 dark:text-gray-400";

interface PersonHeaderTextProps {
  children: React.ReactNode;
}

export function PersonHeaderText({ children }: PersonHeaderTextProps) {
  return <span className={styles}>{children}</span>;
}
