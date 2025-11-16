"use client";

import { focusRing, RACButton, RACDialogTrigger } from "@/components/ui";

interface GridItemDetailModalTriggerProps {
  title: string;
  modal: React.ReactNode;
}

export function GridItemDetailModalTrigger({
  title,
  modal,
}: GridItemDetailModalTriggerProps) {
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
