interface ToolbarMobileBottomProps {
  children: React.ReactNode;
}

export function ToolbarMobileBottom({ children }: ToolbarMobileBottomProps) {
  return (
    <div className="flex items-center justify-between md:hidden">
      {children}
    </div>
  );
}
