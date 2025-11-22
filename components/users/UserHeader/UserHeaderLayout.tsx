import { ReactNode } from "react";

export interface UserHeaderLayoutProps {
  imageSlot: ReactNode;
  infoSlot: ReactNode;
}

export function UserHeaderLayout({
  imageSlot,
  infoSlot,
}: UserHeaderLayoutProps) {
  return (
    <div className="inline-flex flex-col items-center gap-4">
      {imageSlot}
      {infoSlot}
    </div>
  );
}
