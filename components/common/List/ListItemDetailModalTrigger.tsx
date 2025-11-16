"use client";

import { focusRing, RACButton, RACDialogTrigger } from "@/components/ui";

interface ListItemDetailModalTriggerProps {
  title: string;
  modal: React.ReactNode;
}

export function ListItemDetailModalTrigger({
  title,
  modal,
}: ListItemDetailModalTriggerProps) {
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
