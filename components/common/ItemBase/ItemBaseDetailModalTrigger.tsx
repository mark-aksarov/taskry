"use client";

import { focusRing, RACButton, RACDialogTrigger } from "@/components/ui";

interface ItemBaseDetailModalTriggerProps {
  title: string;
  modal: React.ReactNode;
}

export function ItemBaseDetailModalTrigger({
  title,
  modal,
}: ItemBaseDetailModalTriggerProps) {
  return (
    <RACDialogTrigger>
      <RACButton
        className={(renderProps) =>
          focusRing({
            ...renderProps,
            className: "max-w-full cursor-pointer truncate max-md:hidden",
          })
        }
      >
        {title}
      </RACButton>
      {modal}
    </RACDialogTrigger>
  );
}
