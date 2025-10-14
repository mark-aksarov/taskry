const styles = "text-sm font-normal text-black dark:text-white";

interface EntityDetailsTextProps {
  children: React.ReactNode;
}

export function EntityDetailsText({ children }: EntityDetailsTextProps) {
  return <span className={styles}>{children}</span>;
}
