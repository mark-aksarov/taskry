const styles = "flex items-center flex-col gap-4";

export function DetailPanelHeader({ children }: { children: React.ReactNode }) {
  return <div className={styles}>{children}</div>;
}
