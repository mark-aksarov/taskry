interface ToolbarMobileTopProps {
  children: React.ReactNode;
}

export function ToolbarMobileTop({ children }: ToolbarMobileTopProps) {
  return (
    <div className="flex items-center justify-between gap-2 md:hidden">
      {children}
    </div>
  );
}
