const styles = "text-sm font-medium text-gray-500 dark:text-gray-400";

interface DetailPanelTextProps {
  children: React.ReactNode;
}

export function DetailPanelText({ children }: DetailPanelTextProps) {
  return <span className={styles}>{children}</span>;
}
