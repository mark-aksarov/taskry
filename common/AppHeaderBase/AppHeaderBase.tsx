interface AppHeaderBaseProps {
  children?: React.ReactNode;
}

export const AppHeaderBase = ({ children }: AppHeaderBaseProps) => {
  return (
    <header className="sticky top-0 z-2 border-b border-gray-300 py-4 dark:border-gray-600">
      {children}
    </header>
  );
};
