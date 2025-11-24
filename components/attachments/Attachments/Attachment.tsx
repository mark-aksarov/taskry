import { twMerge } from "tailwind-merge";

interface AttachmentProps {
  className?: string;
  children: React.ReactNode;
}

export function Attachment({ className, children }: AttachmentProps) {
  return (
    <div
      className={twMerge(
        "relative w-[6rem] flex-none overflow-hidden rounded-md max-md:h-[4rem] md:h-[6rem]",
        className,
      )}
    >
      {children}
    </div>
  );
}
