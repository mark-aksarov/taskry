"use client";

import {
  Button,
  DialogTrigger,
  DialogTriggerProps,
} from "react-aria-components";
import { tv } from "tailwind-variants";
import { focusRing } from "@/components/ui/styles";

export interface ItemBaseDetailModalTriggerProps extends DialogTriggerProps {
  modal: React.ReactNode;
  children: React.ReactNode;
  "data-test"?: string;
  className?: string;
}

const styles = tv({
  extend: focusRing,
  base: "cursor-pointer",
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
