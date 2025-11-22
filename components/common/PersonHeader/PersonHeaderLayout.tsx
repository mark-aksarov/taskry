import { ReactNode } from "react";

export interface PersonHeaderLayoutProps {
  imageSlot: ReactNode;
  infoSlot: ReactNode;
}

export function PersonHeaderLayout({
  imageSlot,
  infoSlot,
}: PersonHeaderLayoutProps) {
  return (
    <div className="inline-flex flex-col items-center gap-4">
      {imageSlot}
      {infoSlot}
    </div>
  );
}
