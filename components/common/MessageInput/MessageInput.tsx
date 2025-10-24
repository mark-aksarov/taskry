"use client";

import { tv } from "tailwind-variants";
import type { TextFieldProps as RACTextFieldProps } from "react-aria-components";
import {
  composeRenderProps,
  FileTrigger,
  TextField as RACTextField,
  TextArea,
} from "react-aria-components";
import {
  Button,
  fieldStyles,
  focusRing,
  fieldInputStyles as baseInputStyles,
} from "@/components/ui";
import { Paperclip, SendHorizonal } from "lucide-react";
import { twMerge } from "tailwind-merge";

type MessageInputProps = RACTextFieldProps &
  React.RefAttributes<HTMLDivElement> & {
    placeholder?: string;
    acceptedFileTypes?: string[];
    onFilesSelect: (files: FileList) => void;
    inputClassName?: string;
  };

export const fieldInputStyles = tv({
  base: [
    focusRing.base,
    "peer h-[3.5rem] w-full resize-none rounded-xl bg-gray-100 px-[2.875rem] py-4 text-sm text-black dark:bg-gray-700 dark:text-white",
  ],
  variants: {
    isFocused: focusRing.variants.isFocusVisible,
    isDisabled: baseInputStyles.variants.isDisabled,
  },
});

export const MessageInput = ({
  placeholder,
  acceptedFileTypes,
  onFilesSelect,
  inputClassName,
  ...props
}: MessageInputProps) => {
  const buttonClasses = "absolute top-[1.75rem] -translate-y-1/2 rounded-full";

  return (
    <div className="relative w-full">
      <FileTrigger
        allowsMultiple
        acceptedFileTypes={["image/*"]}
        onSelect={(e) => {
          if (e) {
            onFilesSelect(e);
          }
        }}
      >
        <Button
          variant="ghost"
          iconLeft={<Paperclip size={16} strokeWidth={1} absoluteStrokeWidth />}
          className={twMerge(buttonClasses, "translate-x-2")}
          isDisabled={props.isDisabled}
          aria-label="Add attachments"
        />
      </FileTrigger>

      <RACTextField {...props} className={fieldStyles}>
        <TextArea
          placeholder={placeholder}
          className={composeRenderProps(
            inputClassName,
            (className, renderProps) =>
              fieldInputStyles({ ...renderProps, className }),
          )}
        />
      </RACTextField>

      <Button
        variant="ghost"
        iconLeft={
          <SendHorizonal size={16} strokeWidth={1} absoluteStrokeWidth />
        }
        className={twMerge(buttonClasses, "right-0 -translate-x-2")}
        isDisabled={props.isDisabled}
        aria-label="Send Message"
      />
    </div>
  );
};
