const wrapperStyles =
  "overflow-hidden max-w-full text-nowrap overflow-ellipsis p-1 -m-1";

interface ItemCardFieldBoxProps {
  children: React.ReactNode;
}

export function ItemCardFieldBox({ children }: ItemCardFieldBoxProps) {
  return <div className={wrapperStyles}>{children}</div>;
}
