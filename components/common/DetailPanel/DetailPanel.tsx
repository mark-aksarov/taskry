interface DetailPanelProps {
  children: React.ReactNode;
}

export function DetailPanel({ children }: DetailPanelProps) {
  return (
    <div className="flex shrink-0 grow-0 flex-col gap-6 max-md:w-full md:w-[20rem] md:px-4 md:py-6">
      {children}
    </div>
  );
}
