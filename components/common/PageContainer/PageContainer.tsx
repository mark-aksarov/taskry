import { twMerge } from "tailwind-merge";

export interface PageContainerProps {
  className?: string;
  fullscreen?: boolean;
  centered?: boolean;
  headerOffset?: boolean;
  children: React.ReactNode;
}

export function PageContainer({
  className,
  fullscreen,
  centered,
  headerOffset,
  children,
}: PageContainerProps) {
  return (
    <div
      className={twMerge(
        "max-md:p-4 md:p-6",
        fullscreen && headerOffset && "flex h-[calc(100dvh-5.0625rem)]",
        fullscreen && !headerOffset && "flex h-screen",
        centered && "items-center justify-center",
        className,
      )}
    >
      {children}
    </div>
  );
}
