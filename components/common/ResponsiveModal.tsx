"use client";

import { useIsMd } from "@/lib/hooks/useIsMd";
import { Modal, ModalProps } from "../ui/Modal";

export const ResponsiveModal = (props: ModalProps) => {
  const isMd = useIsMd();

  return <Modal fullscreen={isMd} {...props} />;
};
