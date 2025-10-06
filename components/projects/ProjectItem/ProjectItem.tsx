"use client";

import { useMemo } from "react";
import { ProjectPreview } from "@/lib/queries/types";
import { Check, CircleEllipsis, Clock, Ellipsis, Trash } from "lucide-react";
import {
  ACTIVE_PROJECT_STATUS_ID,
  DONE_TASK_STATUS_ID,
  PENDING_PROJECT_STATUS_ID,
} from "@/lib/queries/constants";
import { Item } from "react-stately";
import { Checkbox } from "@/components/ui/Checkbox";
import { ResponsiveMenuTrigger } from "@/components/common/ResponsiveMenuTrigger";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import {
  ItemCard,
  ItemCardActionMenuDialogHeader,
  itemCardActionMenuItemStyles,
  ItemCardActionMenuSkeleton,
  ItemCardBadge,
  ItemCardBadgeSkeleton,
  ItemCardField,
  ItemCardFieldSkeleton,
  ItemCardFieldText,
  ItemCardFieldTitle,
  ItemCardImageField,
  ItemCardImageFieldSkeleton,
  ItemCardProgress,
  ItemCardProgressSkeleton,
} from "@/components/common/ItemCard";

export const ProjectItem = ({
  project,
  showCheckbox,
}: {
  project?: ProjectPreview;
  showCheckbox?: boolean;
}) => {
  const locale = "en-GB";

  const formattedDeadline = useMemo(() => {
    if (!project?.deadline) return "";
    return new Date(project.deadline).toLocaleDateString(locale, {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }, [project?.deadline, locale]);

  const progressValue = useMemo(() => {
    if (!project || project.tasks.length === 0) return 0;
    const tasksDone = project.tasks.filter(
      (task) => task.statusId === DONE_TASK_STATUS_ID,
    ).length;
    return (tasksDone / project.tasks.length) * 100;
  }, [project]);

  return (
    <ItemCard>
      {project && showCheckbox && <Checkbox aria-label="project checkbox" />}

      {/* --- Project Details --- */}
      {!project ? (
        <ItemCardFieldSkeleton />
      ) : (
        <ItemCardField>
          <ItemCardFieldTitle>{project.title}</ItemCardFieldTitle>
          <ItemCardFieldText>{`Deadline on ${formattedDeadline}`}</ItemCardFieldText>
        </ItemCardField>
      )}

      {/* --- Category --- */}
      {!project ? (
        <ItemCardFieldSkeleton className="@max-3xl:hidden" />
      ) : (
        <ItemCardField className="@max-3xl:hidden">
          <ItemCardFieldTitle>Category</ItemCardFieldTitle>
          <ItemCardFieldText>{project.category.name}</ItemCardFieldText>
        </ItemCardField>
      )}

      {/* --- Customer --- */}
      {!project ? (
        <ItemCardFieldSkeleton className="@max-5xl:hidden" />
      ) : (
        <ItemCardField className="@max-5xl:hidden">
          <ItemCardFieldTitle>Customer</ItemCardFieldTitle>
          <ItemCardFieldText>
            {project.customer ? project.customer.fullName : "Unknown customer"}
          </ItemCardFieldText>
        </ItemCardField>
      )}

      {/* --- Customer company --- */}
      {!project ? (
        <ItemCardFieldSkeleton className="@max-5xl:hidden" />
      ) : (
        <ItemCardField className="@max-5xl:hidden">
          <ItemCardFieldTitle>Customer company</ItemCardFieldTitle>
          <ItemCardFieldText>
            {project.customer
              ? project.customer.company.name
              : "Unknown company"}
          </ItemCardFieldText>
        </ItemCardField>
      )}

      {/* --- Right side (progress, status, creator, menu) --- */}
      <div className="flex flex-none items-center justify-end gap-4">
        {/* --- Progress --- */}
        {!project ? (
          <ItemCardProgressSkeleton />
        ) : (
          <ItemCardProgress
            value={progressValue}
            showValueText={false}
            aria-label="project progress"
          />
        )}

        {/* --- Status Badge --- */}
        {!project ? (
          <ItemCardBadgeSkeleton />
        ) : (
          <ItemCardBadge
            color={
              project.statusId === PENDING_PROJECT_STATUS_ID
                ? "orange"
                : project.statusId === ACTIVE_PROJECT_STATUS_ID
                  ? "green"
                  : "blue"
            }
          >
            {project.status.nameEn}
          </ItemCardBadge>
        )}

        {/* --- Creator Image & Menu --- */}
        <div className="flex items-center gap-2">
          {!project ? (
            <ItemCardImageFieldSkeleton />
          ) : (
            <ItemCardImageField>
              {project.creator?.imageUrl && (
                <Image
                  fill
                  src={project.creator.imageUrl}
                  alt={project.creator.name}
                />
              )}
            </ItemCardImageField>
          )}

          {!project ? (
            <ItemCardActionMenuSkeleton />
          ) : (
            <ResponsiveMenuTrigger
              placement="bottom right"
              renderDialogHeader={() => <ItemCardActionMenuDialogHeader />}
              renderButton={() => (
                <Button
                  aria-label="project menu"
                  variant="ghost"
                  iconLeft={
                    <Ellipsis size={16} strokeWidth={1.5} absoluteStrokeWidth />
                  }
                  className="rounded-full"
                />
              )}
            >
              <Item textValue="Delete" key="delete">
                <div className={itemCardActionMenuItemStyles}>
                  <Trash size={16} /> Delete
                </div>
              </Item>
              <Item textValue="Mark as Pending" key="pending">
                <div className={itemCardActionMenuItemStyles}>
                  <CircleEllipsis size={16} /> Mark as Pending
                </div>
              </Item>
              <Item textValue="Mark as Competed" key="competed">
                <div className={itemCardActionMenuItemStyles}>
                  <Check size={16} />
                  Mark as Competed
                </div>
              </Item>
              <Item textValue="Mark as Active" key="active">
                <div className={itemCardActionMenuItemStyles}>
                  <Clock size={16} />
                  Mark as Active
                </div>
              </Item>
            </ResponsiveMenuTrigger>
          )}
        </div>
      </div>
    </ItemCard>
  );
};
