const styles = "text-sm font-medium text-gray-500 dark:text-gray-400";

interface DetailHeaderTextProps {
  children: React.ReactNode;
}

export function DetailHeaderText({ children }: DetailHeaderTextProps) {
  return <div className={styles}>{children}</div>;
}
