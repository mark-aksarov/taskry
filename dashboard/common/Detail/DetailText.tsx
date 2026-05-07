const styles = "text-sm font-normal text-(--text-primary)";

interface DetailTextProps {
  children: React.ReactNode;
}

export function DetailText({ children }: DetailTextProps) {
  return <div className={styles}>{children}</div>;
}
