const styles = "text-sm font-normal text-black dark:text-white";

interface DetailTextProps {
  children: React.ReactNode;
}

export function DetailText({ children }: DetailTextProps) {
  return <span className={styles}>{children}</span>;
}
