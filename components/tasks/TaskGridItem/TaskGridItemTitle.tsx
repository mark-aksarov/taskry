"use client";

import { useOverlayTrigger } from "react-aria";
import { TaskDetailModal } from "../TaskDetailModal";
import { useOverlayTriggerState } from "react-stately";
import { TaskDetailBottomSheet } from "../TaskDetailBottomSheet";
import { focusRing, RACButton, RACDialogTrigger } from "@/components/ui";
import { GridItemTitle } from "@/components/common/Grid";

export function TaskGridItemTitle({
  id,
  title,
}: {
  id: number;
  title: string;
}) {
  const state = useOverlayTriggerState({});
  const { triggerProps } = useOverlayTrigger({ type: "dialog" }, state);

  return (
    <>
      <GridItemTitle className="max-md:hidden">
        <RACDialogTrigger>
          <RACButton
            className={(renderProps) =>
              focusRing({
                ...renderProps,
                className: "max-w-full cursor-pointer truncate",
              })
            }
          >
            {title}
          </RACButton>
          <TaskDetailModal taskId={id} />
        </RACDialogTrigger>
      </GridItemTitle>

      <GridItemTitle className="md:hidden">
        <RACButton
          {...triggerProps}
          className={(renderProps) =>
            focusRing({
              ...renderProps,
              className: "max-w-full cursor-pointer truncate",
            })
          }
        >
          {title}
        </RACButton>
        <TaskDetailBottomSheet taskId={id} state={state} />
      </GridItemTitle>
    </>
  );
}
