interface FormErrorTextProps {
  children: React.ReactNode;
}

export function FormErrorText({ children }: FormErrorTextProps) {
  return (
    <p className="text-xs font-bold text-red-600 dark:text-red-400">
      {children}
    </p>
  );
}
