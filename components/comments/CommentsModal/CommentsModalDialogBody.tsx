"use client";

import { DialogBody } from "@/components/ui";

export function CommentsModalDialogBody({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DialogBody className="flex flex-col gap-4">{children}</DialogBody>;
}
