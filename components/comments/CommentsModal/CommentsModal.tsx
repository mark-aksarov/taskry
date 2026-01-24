"use client";

import { ModalProps } from "@/components/ui/Modal";
import { ResponsiveModal } from "@/components/common/ResponsiveModal";

export function CommentsModal(props: ModalProps) {
  return <ResponsiveModal isDismissable className="md:w-[600px]" {...props} />;
}
