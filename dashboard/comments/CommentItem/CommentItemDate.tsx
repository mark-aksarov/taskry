const styles =
  "overflow-hidden text-nowrap overflow-ellipsis text-xs font-medium text-(--text-secondary)";

interface CommentItemDateProps {
  children: React.ReactNode;
}

export function CommentItemDate({ children }: CommentItemDateProps) {
  return <div className={styles}>{children}</div>;
}
