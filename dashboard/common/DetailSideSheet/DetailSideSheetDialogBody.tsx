"use client";

import { DialogBody } from "@/ui/Dialog";
import { focusRing } from "@/ui/styles";
import { mergeProps, useFocusRing } from "react-aria";
import { tv } from "tailwind-variants";

const styles = tv({
  extend: focusRing,
  base: "outline-offset-[-2px]!",
});

export function DetailSideSheetDialogBody({
  className,
  ...props
}: React.ComponentProps<"div">) {
  let { isFocusVisible, focusProps } = useFocusRing();

  return (
    <DialogBody
      tabIndex={0}
      {...mergeProps(focusProps, props)}
      className={styles({ isFocusVisible, className })}
    />
  );
}
