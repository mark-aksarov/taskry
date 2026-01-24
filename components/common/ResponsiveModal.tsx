"use client";

import { Modal, ModalProps } from "../ui/Modal";
import { useMediaQuery } from "react-responsive";

export const ResponsiveModal = (props: ModalProps) => {
  const isMd = useMediaQuery({ query: "(max-width: 48rem)" });

  return <Modal fullscreen={isMd} {...props} />;
};
