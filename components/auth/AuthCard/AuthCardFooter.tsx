export function AuthCardFooter({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-between gap-4 max-md:flex-col md:items-center">
      {children}
    </div>
  );
}
