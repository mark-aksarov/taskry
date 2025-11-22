"use client";

import { tv } from "tailwind-variants";
import { focusRing, RACButton, RACDialogTrigger } from "@/components/ui";

interface ItemBaseDetailModalTriggerProps {
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
}: ItemBaseDetailModalTriggerProps) {
  return (
    <RACDialogTrigger>
      <RACButton
        className={(renderProps) =>
          styles({
            ...renderProps,
            className,
          })
        }
      >
        {children}
      </RACButton>
      {modal}
    </RACDialogTrigger>
  );
}
