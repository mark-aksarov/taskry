interface ToolbarFiltersMobileProps {
  children: React.ReactNode;
}

export function ToolbarFiltersMobile({ children }: ToolbarFiltersMobileProps) {
  return (
    <div className="no-scrollbar flex w-full items-center gap-2 overflow-x-auto md:hidden">
      {children}
    </div>
  );
}
