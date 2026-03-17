interface ToolbarFiltersMobileProps {
  children: React.ReactNode;
}

export function ToolbarFiltersMobile({ children }: ToolbarFiltersMobileProps) {
  return (
    <div className="flex w-full items-center gap-2 overflow-x-auto md:hidden">
      {children}
    </div>
  );
}
