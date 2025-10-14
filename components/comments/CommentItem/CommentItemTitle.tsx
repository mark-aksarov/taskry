export const styles =
  "overflow-hidden p-1 -m-1 text-nowrap overflow-ellipsis text-sm font-bold text-black dark:text-white inline";

interface CommentItemTitleProps {
  children: React.ReactNode;
}

export function CommentItemTitle({ children }: CommentItemTitleProps) {
  return <h4 className={styles}>{children}</h4>;
}
