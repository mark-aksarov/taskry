import { twMerge } from "tailwind-merge";

interface AttachmentProps {
  className?: string;
  children: React.ReactNode;
}

export function Attachment({ className, children }: AttachmentProps) {
  return (
    <div
      className={twMerge(
        "relative h-[6rem] w-[6rem] flex-none overflow-hidden rounded-md",
        className,
      )}
    >
      {children}
    </div>
  );
}
