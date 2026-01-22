"use client";

import { useMediaQuery } from "react-responsive";
import { Modal, ModalProps } from "../ui";

export const ResponsiveModal = (props: ModalProps) => {
  const isMd = useMediaQuery({ query: "(max-width: 48rem)" });

  return <Modal fullscreen={isMd} {...props} />;
};
