interface ErrorBannerTextProps {
  children: React.ReactNode;
}

export function FormErrorText({ children }: ErrorBannerTextProps) {
  return (
    <p className="text-xs font-bold text-red-600 dark:text-red-400">
      {children}
    </p>
  );
}
