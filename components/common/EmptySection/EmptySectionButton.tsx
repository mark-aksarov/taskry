"use client";

import { tv } from "tailwind-variants";
import { CirclePlus } from "lucide-react";
import { linkStyles } from "@/components/ui/Link";
import { Button, ButtonProps, DialogTrigger } from "react-aria-components";

interface EmptySectionButtonProps extends ButtonProps {
  createNewModal: React.ReactNode;
  children: React.ReactNode;
  "data-test"?: string;
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
      <Button
        {...props}
        className={(renderProps) =>
          styles({ ...renderProps, variant: "primary" })
        }
      >
        <CirclePlus size={16} strokeWidth={1.5} absoluteStrokeWidth />
        {children}
      </Button>

      {createNewModal}
    </DialogTrigger>
  );
}
