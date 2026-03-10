"use client";

import {
  PageStateContainer,
  PageStateContainerProps,
} from "./PageStateContainer";

import { Button } from "../ui/Button";
import { startTransition } from "react";
import { useRouter } from "@/i18n/navigation";

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
  const router = useRouter();

  return (
    <PageStateContainer
      button={
        <Button
          variant="outlined"
          label={resetButtonLabel}
          size="medium"
          onPress={() => {
            router.refresh();
            startTransition(() => {
              reset();
            });
          }}
        />
      }
      {...props}
    />
  );
}
