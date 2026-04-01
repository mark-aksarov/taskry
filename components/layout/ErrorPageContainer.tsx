"use client";

import {
  PageStateContainer,
  PageStateContainerProps,
} from "./PageStateContainer";

import { Button } from "../ui/Button";

interface ErrorPageContainerProps
  extends Omit<PageStateContainerProps, "button"> {
  resetButtonLabel: string;
  reset: () => void;
}

export default function ErrorPageContainer({
  resetButtonLabel,
  reset,
  ...props
}: ErrorPageContainerProps) {
  return (
    <PageStateContainer
      button={
        <Button
          variant="outlined"
          label={resetButtonLabel}
          size="medium"
          onPress={reset}
        />
      }
      {...props}
    />
  );
}
