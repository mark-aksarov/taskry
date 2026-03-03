"use client";

import { tv } from "tailwind-variants";
import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { focusRing } from "@/components/ui/styles";
import { fieldStyles } from "@/components/ui/Field";
import type { TextFieldProps } from "react-aria-components";
import { useCommentFormContext } from "../CommentFormContext";
import { CommentTextFieldSendButton } from "./CommentTextFieldSendButton";
import { fieldInputStyles as baseInputStyles } from "@/components/ui/TextField";
import { TextArea, composeRenderProps, TextField } from "react-aria-components";

const MAX_TEXTAREA_HEIGHT = 164;

export const fieldInputStyles = tv({
  base: [
    focusRing.base,
    "peer w-full resize-none rounded-xl p-4 pr-14 text-sm",
  ],
  variants: {
    isFocused: focusRing.variants.isFocusVisible,
    isDisabled: baseInputStyles.variants.isDisabled,
  },
});

type CommentTextFieldProps = TextFieldProps &
  React.RefAttributes<HTMLDivElement> & {
    isPending?: boolean;
    textAreaClassName?: string;
  };

export const CommentTextField = ({
  isPending,
  textAreaClassName,
  ...props
}: CommentTextFieldProps) => {
  const { commentContent, setCommentContent } = useCommentFormContext();
  const t = useTranslations("comments.CommentTextField");
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.style.height = "auto";

    const newHeight = Math.min(el.scrollHeight, MAX_TEXTAREA_HEIGHT);
    el.style.height = newHeight + "px";

    el.style.overflowY =
      el.scrollHeight > MAX_TEXTAREA_HEIGHT ? "auto" : "hidden";
  }, [commentContent]);

  return (
    <div className="relative w-full">
      <TextField
        {...props}
        id="content"
        name="content"
        value={commentContent}
        onChange={setCommentContent}
        className={fieldStyles}
        isDisabled={isPending}
      >
        <TextArea
          rows={1}
          ref={ref}
          data-test="comment-text-field-textarea"
          placeholder={t("placeholder")}
          className={composeRenderProps(
            textAreaClassName,
            (className, renderProps) =>
              fieldInputStyles({ ...renderProps, className }),
          )}
        />
      </TextField>

      <CommentTextFieldSendButton
        buttonClasses="absolute top-[1.75rem] -translate-y-1/2"
        isDisabled={!commentContent || isPending}
      />
    </div>
  );
};
