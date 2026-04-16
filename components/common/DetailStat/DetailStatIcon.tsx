interface DetailStatIconProps {
  children: React.ReactNode;
}

export function DetailStatIcon({ children }: DetailStatIconProps) {
  return <div className="text-gray-500 dark:text-gray-400">{children}</div>;
}
