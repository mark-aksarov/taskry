"use client";

import { CirclePlus } from "lucide-react";
import { TextButton } from "@/common/TextButton";
import { ButtonProps } from "react-aria-components";

interface FallbackSectionButtonProps extends ButtonProps {
  children: React.ReactNode;
  "data-test"?: string;
}

export function FallbackSectionButton({
  children,
  ...props
}: FallbackSectionButtonProps) {
  return (
    <TextButton {...props} className="font-bold">
      <CirclePlus />
      {children}
    </TextButton>
  );
}
