"use client";

import { TextField, TextFieldProps } from "@/components/ui";
import { useLayoutEffect, useRef, useState } from "react";

type SubtaskTextFieldProps = {
  actionButton: React.ReactNode;
} & TextFieldProps;

export function SubtaskTextField({
  actionButton,
  ...props
}: SubtaskTextFieldProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [inputHeight, setInputHeight] = useState(0);

  useLayoutEffect(() => {
    if (ref.current) {
      const input = ref.current.querySelector("input")!;
      setInputHeight(input.offsetHeight);
    }
  }, []);

  return (
    <div className="relative">
      <TextField
        ref={ref}
        inputClassName="pr-[calc(16px+var(--spacing)*8)]"
        {...props}
      />
      <div
        className="absolute right-0 -translate-x-2 translate-y-1/2"
        style={{ bottom: `${inputHeight / 2}px` }}
      >
        {actionButton}
      </div>
    </div>
  );
}
