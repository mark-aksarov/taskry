"use client";

import {
  TextArea,
  composeRenderProps,
  TextField as RACTextField,
} from "react-aria-components";

import { tv } from "tailwind-variants";
import { fieldStyles, focusRing } from "@/components/ui";
import { fieldInputStyles as baseInputStyles } from "@/components/ui";
import { CommentTextFieldSendButton } from "./CommentTextFieldSendButton";
import { CommentTextFieldFileTrigger } from "./CommentTextFieldFileTrigger";
import type { TextFieldProps as RACTextFieldProps } from "react-aria-components";
import { useTranslations } from "next-intl";

export const fieldInputStyles = tv({
  base: [
    focusRing.base,
    "peer h-[3.5rem] w-full resize-none rounded-xl px-[2.875rem] py-4 text-sm",
  ],
  variants: {
    isFocused: focusRing.variants.isFocusVisible,
    isDisabled: baseInputStyles.variants.isDisabled,
  },
});

type CommentTextFieldProps = RACTextFieldProps &
  React.RefAttributes<HTMLDivElement> & {
    textAreaClassName?: string;
    acceptedFileTypes?: string[];
    onFilesSelect: (files: FileList) => void;
  };

export const CommentTextField = ({
  acceptedFileTypes,
  onFilesSelect,
  textAreaClassName,
  ...props
}: CommentTextFieldProps) => {
  const t = useTranslations("comments.CommentTextField");

  const buttonClasses = "absolute top-[1.75rem] -translate-y-1/2 rounded-full";

  return (
    <div className="relative w-full">
      <CommentTextFieldFileTrigger
        onFilesSelect={onFilesSelect}
        buttonClasses={buttonClasses}
      />
      <RACTextField {...props} className={fieldStyles}>
        <TextArea
          placeholder={t("placeholder")}
          className={composeRenderProps(
            textAreaClassName,
            (className, renderProps) =>
              fieldInputStyles({ ...renderProps, className }),
          )}
        />
      </RACTextField>
      <CommentTextFieldSendButton buttonClasses={buttonClasses} />
    </div>
  );
};
