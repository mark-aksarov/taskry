"use client";

import { tv } from "tailwind-variants";
import { CirclePlus } from "lucide-react";
import { DialogTrigger } from "react-aria-components";
import { RACButtonProps, linkStyles, RACButton } from "@/components/ui";

interface EmptySectionButtonProps extends RACButtonProps {
  createNewModal: React.ReactNode;
  children: React.ReactNode;
}

const styles = tv({
  extend: linkStyles,
  base: "gap-2 text-sm font-bold",
});

export function EmptySectionButton({
  createNewModal,
  children,
  ...props
}: EmptySectionButtonProps) {
  return (
    <DialogTrigger>
      <RACButton
        {...props}
        className={(renderProps) =>
          styles({ ...renderProps, variant: "primary" })
        }
        data-test="empty-section-button"
      >
        <CirclePlus size={16} strokeWidth={1.5} absoluteStrokeWidth />
        {children}
      </RACButton>

      {createNewModal}
    </DialogTrigger>
  );
}
