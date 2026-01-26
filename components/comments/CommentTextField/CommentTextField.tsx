"use client";

import { tv } from "tailwind-variants";
import { useTranslations } from "next-intl";
import { focusRing } from "@/components/ui/styles";
import { fieldStyles } from "@/components/ui/Field";
import type { TextFieldProps } from "react-aria-components";
import { useCommentFormContext } from "../CommentFormContext";
import { CommentTextFieldSendButton } from "./CommentTextFieldSendButton";
import { CommentTextFieldFileTrigger } from "./CommentTextFieldFileTrigger";
import { fieldInputStyles as baseInputStyles } from "@/components/ui/TextField";
import { TextArea, composeRenderProps, TextField } from "react-aria-components";

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

type CommentTextFieldProps = TextFieldProps &
  React.RefAttributes<HTMLDivElement> & {
    isLoading?: boolean;
    textAreaClassName?: string;
    acceptedFileTypes?: string[];
    onFilesSelect: (files: FileList) => void;
  };

export const CommentTextField = ({
  isLoading,
  acceptedFileTypes,
  onFilesSelect,
  textAreaClassName,
  ...props
}: CommentTextFieldProps) => {
  const { commentContent, setCommentContent } = useCommentFormContext();

  const t = useTranslations("comments.CommentTextField");

  const buttonClasses = "absolute top-[1.75rem] -translate-y-1/2 rounded-full";

  return (
    <div className="relative w-full">
      <CommentTextFieldFileTrigger
        onFilesSelect={onFilesSelect}
        buttonClasses={buttonClasses}
      />

      <TextField
        {...props}
        id="content"
        name="content"
        value={commentContent}
        onChange={setCommentContent}
        className={fieldStyles}
        isDisabled={isLoading}
      >
        <TextArea
          placeholder={t("placeholder")}
          className={composeRenderProps(
            textAreaClassName,
            (className, renderProps) =>
              fieldInputStyles({ ...renderProps, className }),
          )}
        />
      </TextField>

      <CommentTextFieldSendButton
        buttonClasses={buttonClasses}
        isDisabled={!commentContent || isLoading}
      />
    </div>
  );
};
