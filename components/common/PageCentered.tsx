import { ReactNode } from "react";

interface PageCenteredProps {
  children: ReactNode;
}

export const PageCentered = ({ children }: PageCenteredProps) => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      {children}
    </div>
  );
};
