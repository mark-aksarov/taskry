const wrapperStyles =
  "overflow-hidden max-w-full text-nowrap overflow-ellipsis p-1 -m-1 inline leading-none";

interface ListItemEllipsisWrapperProps {
  children: React.ReactNode;
}

export function ListItemEllipsisWrapper({
  children,
}: ListItemEllipsisWrapperProps) {
  return <div className={wrapperStyles}>{children}</div>;
}
