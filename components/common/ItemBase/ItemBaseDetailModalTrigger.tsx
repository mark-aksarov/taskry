"use client";

import { tv } from "tailwind-variants";
import { focusRing, RACButton } from "@/components/ui";
import { DialogTrigger, DialogTriggerProps } from "react-aria-components";

interface ItemBaseDetailModalTriggerProps extends DialogTriggerProps {
  modal: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

const styles = tv({
  extend: focusRing,
  base: "max-w-full cursor-pointer max-md:hidden",
});

export function ItemBaseDetailModalTrigger({
  children,
  modal,
  className,
  ...props
}: ItemBaseDetailModalTriggerProps) {
  return (
    <DialogTrigger>
      <RACButton
        className={(renderProps) =>
          styles({
            ...renderProps,
            className,
          })
        }
        {...props}
      >
        {children}
      </RACButton>
      {modal}
    </DialogTrigger>
  );
}
