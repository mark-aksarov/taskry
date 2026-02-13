"use client";

import {
  Button,
  DialogTrigger,
  DialogTriggerProps,
} from "react-aria-components";
import { tv } from "tailwind-variants";
import { focusRing } from "@/components/ui/styles";

interface ItemBaseDetailModalTriggerProps extends DialogTriggerProps {
  modal: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

const styles = tv({
  extend: focusRing,
  base: "max-w-full cursor-pointer",
});

export function ItemBaseDetailModalTrigger({
  children,
  modal,
  className,
  ...props
}: ItemBaseDetailModalTriggerProps) {
  return (
    <DialogTrigger>
      <Button
        className={(renderProps) =>
          styles({
            ...renderProps,
            className,
          })
        }
        {...props}
      >
        {children}
      </Button>
      {modal}
    </DialogTrigger>
  );
}
