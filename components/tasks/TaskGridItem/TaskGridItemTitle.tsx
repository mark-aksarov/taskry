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
      <div className="max-md:hidden">
        <GridItemTitle>
          <RACDialogTrigger>
            <RACButton
              className={(renderProps) =>
                focusRing({ ...renderProps, className: "cursor-pointer" })
              }
            >
              {title}
            </RACButton>
            <TaskDetailModal taskId={id} />
          </RACDialogTrigger>
        </GridItemTitle>
      </div>

      <div className="md:hidden">
        <GridItemTitle>
          <RACButton
            {...triggerProps}
            className={(renderProps) =>
              focusRing({ ...renderProps, className: "cursor-pointer" })
            }
          >
            {title}
          </RACButton>
          <TaskDetailBottomSheet taskId={id} state={state} />
        </GridItemTitle>
      </div>
    </>
  );
}
