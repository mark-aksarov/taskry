export function CommentItemContent({
  children,
}: {
  children: React.ReactNode;
}) {
  return <span className="ml-12 flex flex-col gap-4">{children}</span>;
}
