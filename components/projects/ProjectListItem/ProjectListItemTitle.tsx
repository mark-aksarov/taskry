"use client";

import { useOverlayTrigger } from "react-aria";
import { ProjectDetailModal } from "../ProjectDetailModal";
import { useOverlayTriggerState } from "react-stately";
import { ListItemTitle } from "@/components/common/List";
import { ProjectDetailBottomSheet } from "../ProjectDetailBottomSheet";
import { focusRing, RACButton, RACDialogTrigger } from "@/components/ui";

export function ProjectListItemTitle({
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
                className: "max-w-full cursor-pointer truncate",
              })
            }
          >
            {title}
          </RACButton>
          <ProjectDetailModal projectId={id} />
        </RACDialogTrigger>
      </ListItemTitle>

      <ListItemTitle className="md:hidden">
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
        <ProjectDetailBottomSheet projectId={id} state={state} />
      </ListItemTitle>
    </>
  );
}
