interface ToolbarSearchMobileProps {
  children: React.ReactNode;
}

export function ToolbarSearchMobile({ children }: ToolbarSearchMobileProps) {
  return <div className="flex w-full md:hidden">{children}</div>;
}
