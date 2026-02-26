import { ReactNode } from "react";

export interface DetailHeaderLayoutProps {
  imageSlot: ReactNode;
  mainSlot: ReactNode;
}

export function DetailHeaderLayout({
  imageSlot,
  mainSlot,
}: DetailHeaderLayoutProps) {
  return (
    <div className="inline-flex flex-col items-center gap-4">
      {imageSlot}
      {mainSlot}
    </div>
  );
}
