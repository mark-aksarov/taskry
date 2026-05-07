const styles = "text-sm font-medium text-(--text-secondary)";

interface DetailHeaderTextProps {
  children: React.ReactNode;
}

export function DetailHeaderText({ children }: DetailHeaderTextProps) {
  return <div className={styles}>{children}</div>;
}
