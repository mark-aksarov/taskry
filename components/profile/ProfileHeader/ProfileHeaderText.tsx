const styles = "text-sm font-medium text-gray-500 dark:text-gray-400";

interface ProfileHeaderTextProps {
  children: React.ReactNode;
}

export function ProfileHeaderText({ children }: ProfileHeaderTextProps) {
  return <span className={styles}>{children}</span>;
}
