"use client";

import { RACButtonProps, linkStyles, RACButton } from "@/components/ui";
import { CirclePlus } from "lucide-react";
import { tv } from "tailwind-variants";

interface EmptySectionButtonProps extends RACButtonProps {
  href: string;
  children: React.ReactNode;
}

const styles = tv({
  extend: linkStyles,
  base: "gap-2 text-sm font-bold",
});

export function EmptySectionButton({
  href,
  children,
  ...props
}: EmptySectionButtonProps) {
  return (
    <RACButton
      {...props}
      className={(renderProps) =>
        styles({ ...renderProps, variant: "primary" })
      }
    >
      <CirclePlus size={16} strokeWidth={1.5} absoluteStrokeWidth />
      {children}
    </RACButton>
  );
}
