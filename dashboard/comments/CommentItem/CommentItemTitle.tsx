export const styles =
  "overflow-hidden p-1 -m-1 text-nowrap overflow-ellipsis text-sm font-bold text-(--text-primary) inline";

interface CommentItemTitleProps {
  children: React.ReactNode;
}

export function CommentItemTitle({ children }: CommentItemTitleProps) {
  return <h3 className={styles}>{children}</h3>;
}
