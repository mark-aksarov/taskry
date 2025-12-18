interface AuthCardFormErrorTextProps {
  children: React.ReactNode;
}

export function AuthCardFormErrorText({
  children,
}: AuthCardFormErrorTextProps) {
  return (
    <p className="text-xs font-bold text-red-600 dark:text-red-400">
      {children}
    </p>
  );
}
