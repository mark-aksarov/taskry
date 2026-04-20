interface DetailStatTextProps {
  children: React.ReactNode;
}

export function DetailStatText({ children }: DetailStatTextProps) {
  return (
    <div className="text-sm text-gray-500 dark:text-gray-400">{children}</div>
  );
}
