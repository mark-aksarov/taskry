export function Attachment({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative h-[6rem] w-[6rem] flex-none overflow-hidden rounded-md">
      {children}
    </div>
  );
}
