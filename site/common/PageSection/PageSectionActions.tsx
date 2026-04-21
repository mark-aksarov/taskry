interface PageSectionActionsProps {
  children: React.ReactNode;
}

export function PageSectionActions({ children }: PageSectionActionsProps) {
  return (
    <div className="flex justify-center gap-4 self-stretch max-sm:flex-col">
      {children}
    </div>
  );
}
