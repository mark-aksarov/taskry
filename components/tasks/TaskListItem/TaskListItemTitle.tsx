"use client";

import { useOverlayTrigger } from "react-aria";
import { TaskDetailModal } from "../TaskDetailModal";
import { useOverlayTriggerState } from "react-stately";
import { ListItemTitle } from "@/components/common/List";
import { TaskDetailBottomSheet } from "../TaskDetailBottomSheet";
import { focusRing, RACButton, RACDialogTrigger } from "@/components/ui";

export function TaskListItemTitle({
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
      <ListItemTitle className="max-md:hidden">
        <RACDialogTrigger>
          <RACButton
            className={(renderProps) =>
              focusRing({
                ...renderProps,
                className: "cursor-pointer",
              })
            }
          >
            {title}
          </RACButton>
          <TaskDetailModal taskId={id} />
        </RACDialogTrigger>
      </ListItemTitle>

      <ListItemTitle className="md:hidden">
        <RACButton
          {...triggerProps}
          className={(renderProps) =>
            focusRing({ ...renderProps, className: "cursor-pointer" })
          }
        >
          {title}
        </RACButton>
        <TaskDetailBottomSheet taskId={id} state={state} />
      </ListItemTitle>
    </>
  );
}
