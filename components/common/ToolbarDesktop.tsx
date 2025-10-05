interface ToolbarProps {
  children: React.ReactNode;
}

export function ToolbarDesktop({ children }: ToolbarProps) {
  return (
    <div className="flex items-center justify-between gap-4 max-md:hidden">
      {children}
    </div>
  );
}
