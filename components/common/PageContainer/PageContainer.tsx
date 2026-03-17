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
  // FIXME: Temporary hardcoded header height (73px / 83px, measured in browser).
  return (
    <div
      className={twMerge(
        "max-md:p-4 md:p-6",
        fullscreen &&
          headerOffset &&
          "flex max-md:h-[calc(100dvh-73px)] md:h-[calc(100dvh-83px)]",
        fullscreen && !headerOffset && "flex h-dvh",
        centered && "items-center justify-center",
        className,
      )}
    >
      {children}
    </div>
  );
}
