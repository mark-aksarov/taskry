interface DetailCardRightProps {
  children: React.ReactNode;
}

export function DetailCardRight({ children }: DetailCardRightProps) {
  return (
    <div className="flex flex-none flex-col pl-5 max-lg:hidden">{children}</div>
  );
}
