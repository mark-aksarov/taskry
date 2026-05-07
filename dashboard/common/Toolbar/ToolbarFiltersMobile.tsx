interface ToolbarFiltersMobileProps {
  children: React.ReactNode;
}

export function ToolbarFiltersMobile({ children }: ToolbarFiltersMobileProps) {
  // FIXME: Temporary hardcoded header height (73px (mobile), measured in browser).
  return (
    <div className="sticky top-[73px] z-2 -m-4 bg-(--surface-2) py-4 md:hidden">
      <div className="no-scrollbar flex w-full items-center gap-2 overflow-x-auto px-4">
        {children}
      </div>
    </div>
  );
}
