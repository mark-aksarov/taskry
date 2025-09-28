"use client";

import { Link } from "@/components/ui/Link";
import { CirclePlus } from "lucide-react";
import { twMerge } from "tailwind-merge";

interface EmptyViewProps {
  className?: string;
  children?: React.ReactNode;
}

export function EmptyView({ className, children }: EmptyViewProps) {
  return (
    <div
      className={twMerge(
        "flex w-[18rem] flex-col items-center gap-4",
        className,
      )}
    >
      {children}
    </div>
  );
}

interface EmptyViewTitleProps {
  className?: string;
  children: React.ReactNode;
}

export function EmptyViewTitle({ className, children }: EmptyViewTitleProps) {
  return (
    <h1
      className={twMerge(
        "font-extrabold text-black max-md:text-4xl md:text-5xl dark:text-white",
        className,
      )}
    >
      {children}
    </h1>
  );
}

interface EmptyViewDescriptionProps {
  className?: string;
  children: React.ReactNode;
}

export function EmptyViewDescription({
  className,
  children,
}: EmptyViewDescriptionProps) {
  return (
    <p
      className={twMerge(
        "text-center text-sm text-gray-500 dark:text-gray-400",
        className,
      )}
    >
      {children}
    </p>
  );
}

interface EmptyViewLinkProps {
  href: string;
  children: React.ReactNode;
}

export function EmptyViewLink({ href, children }: EmptyViewLinkProps) {
  return (
    <Link href={href} className="flex items-center gap-2">
      <CirclePlus size={16} strokeWidth={1.5} absoluteStrokeWidth />
      {children}
    </Link>
  );
}
