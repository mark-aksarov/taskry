import { ReactNode } from "react";

export interface DetailHeaderLayoutProps {
  imageSlot: ReactNode;
  infoSlot: ReactNode;
}

export function DetailHeaderLayout({
  imageSlot,
  infoSlot,
}: DetailHeaderLayoutProps) {
  return (
    <div className="inline-flex flex-col items-center gap-4">
      {imageSlot}
      {infoSlot}
    </div>
  );
}
