const wrapperStyles =
  "overflow-hidden max-w-full text-nowrap overflow-ellipsis p-1 -m-1 inline leading-none";

interface GridItemEllipsisWrapperProps {
  children: React.ReactNode;
}

export function GridItemEllipsisWrapper({
  children,
}: GridItemEllipsisWrapperProps) {
  return <div className={wrapperStyles}>{children}</div>;
}
