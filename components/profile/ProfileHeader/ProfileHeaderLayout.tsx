import { ReactNode } from "react";

export interface ProfileHeaderLayoutProps {
  imageSlot: ReactNode;
  infoSlot: ReactNode;
}

export function ProfileHeaderLayout({
  imageSlot,
  infoSlot,
}: ProfileHeaderLayoutProps) {
  return (
    <div className="inline-flex flex-col items-center gap-4">
      {imageSlot}
      {infoSlot}
    </div>
  );
}
