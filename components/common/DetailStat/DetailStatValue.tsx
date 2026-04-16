interface DetailStatValueProps {
  children: React.ReactNode;
}

export function DetailStatValue({ children }: DetailStatValueProps) {
  return (
    <div className="text-base font-bold text-black dark:text-white">
      {children}
    </div>
  );
}
