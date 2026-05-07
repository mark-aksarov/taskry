export function DetailCardLeft({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-auto flex-col border-r-1 border-(--border-primary)">
      {children}
    </div>
  );
}
