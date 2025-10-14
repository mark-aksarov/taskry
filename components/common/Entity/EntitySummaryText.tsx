const styles = "text-sm font-medium text-black dark:text-white";

interface EntitySummaryTextProps {
  children: React.ReactNode;
}

export function EntitySummaryText({ children }: EntitySummaryTextProps) {
  return <span className={styles}>{children}</span>;
}
