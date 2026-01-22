"use client";

import { DialogFooter } from "@/components/ui";

export function CommentsModalDialogFooter({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DialogFooter className="p-0!">{children}</DialogFooter>;
}
