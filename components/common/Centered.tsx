import { ReactNode } from "react";

interface CenteredProps {
  children: ReactNode;
}

export const Centered = ({ children }: CenteredProps) => {
  return (
    <div className="flex h-full w-full flex-1 items-center justify-center">
      {children}
    </div>
  );
};
