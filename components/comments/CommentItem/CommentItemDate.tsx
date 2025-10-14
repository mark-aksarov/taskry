const styles =
  "overflow-hidden text-nowrap overflow-ellipsis text-xs font-medium text-gray-500 dark:text-gray-400";

interface CommentItemDateProps {
  children: React.ReactNode;
}

export function CommentItemDate({ children }: CommentItemDateProps) {
  return <span className={styles}>{children}</span>;
}
