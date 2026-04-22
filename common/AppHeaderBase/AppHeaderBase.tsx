import { twMerge } from "tailwind-merge";

interface AppHeaderBaseProps {
  className?: string;
  children?: React.ReactNode;
}

export const AppHeaderBase = ({ className, children }: AppHeaderBaseProps) => {
  return (
    <header className={twMerge("sticky top-0 z-2 border-b py-4", className)}>
      {children}
    </header>
  );
};
