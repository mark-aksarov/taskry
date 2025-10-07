"use client";

import { useMemo } from "react";
import { Link } from "@/components/ui";
import { ProjectPreview } from "@/lib/queries/types";
import { Check, CircleEllipsis, Clock, Ellipsis, Trash } from "lucide-react";
import {
  ACTIVE_PROJECT_STATUS_ID,
  DONE_TASK_STATUS_ID,
  PENDING_PROJECT_STATUS_ID,
} from "@/lib/queries/constants";
import { Item } from "react-stately";
import { Checkbox, Button } from "@/components/ui";
import Image from "next/image";
import {
  ItemCard,
  ItemCardActionMenuDialogHeader,
  itemCardActionMenuItemStyles,
  ItemCardActionMenuSkeleton,
  ItemCardBadge,
  ItemCardBadgeSkeleton,
  ItemCardField,
  ItemCardFieldBox,
  ItemCardFieldLink,
  ItemCardFieldSkeleton,
  ItemCardFieldText,
  ItemCardFieldTitle,
  ItemCardImageField,
  ItemCardImageFieldSkeleton,
  ItemCardProgress,
  ItemCardProgressSkeleton,
} from "@/components/common/ItemCard";
import { ResponsiveMenuTrigger } from "@/components/common/ResponsiveMenuTrigger";

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
          <ItemCardFieldBox>
            <ItemCardFieldTitle>
              <ItemCardFieldLink href={`/projects/${project.id}`}>
                {project.title}
              </ItemCardFieldLink>
            </ItemCardFieldTitle>
          </ItemCardFieldBox>

          <ItemCardFieldBox>
            <ItemCardFieldText>{`Deadline on ${formattedDeadline}`}</ItemCardFieldText>
          </ItemCardFieldBox>
        </ItemCardField>
      )}

      {/* --- Category --- */}
      {!project ? (
        <ItemCardFieldSkeleton className="@max-3xl:hidden" />
      ) : (
        <ItemCardField className="@max-3xl:hidden">
          <ItemCardFieldBox>
            <ItemCardFieldTitle>Category</ItemCardFieldTitle>
          </ItemCardFieldBox>

          <ItemCardFieldBox>
            <ItemCardFieldText>
              <ItemCardFieldLink href={`/categories=${project.category.id}`}>
                {project.category.name}
              </ItemCardFieldLink>
            </ItemCardFieldText>
          </ItemCardFieldBox>
        </ItemCardField>
      )}

      {/* --- Customer --- */}
      {!project ? (
        <ItemCardFieldSkeleton className="@max-5xl:hidden" />
      ) : (
        <ItemCardField className="@max-5xl:hidden">
          <ItemCardFieldBox>
            <ItemCardFieldTitle>Customer</ItemCardFieldTitle>
          </ItemCardFieldBox>

          {project.customer ? (
            <ItemCardFieldBox>
              <ItemCardFieldText>
                <ItemCardFieldLink href={`/customers=${project.customer.id}`}>
                  {project.customer.fullName}
                </ItemCardFieldLink>
              </ItemCardFieldText>
            </ItemCardFieldBox>
          ) : (
            <ItemCardFieldBox>
              <ItemCardFieldText>Unknown customer</ItemCardFieldText>
            </ItemCardFieldBox>
          )}
        </ItemCardField>
      )}

      {/* --- Customer company --- */}
      {!project ? (
        <ItemCardFieldSkeleton className="@max-5xl:hidden" />
      ) : (
        <ItemCardField className="@max-5xl:hidden">
          <ItemCardFieldBox>
            <ItemCardFieldTitle>Customer company</ItemCardFieldTitle>
          </ItemCardFieldBox>

          <ItemCardFieldBox>
            <ItemCardFieldText>
              {project.customer
                ? project.customer.company.name
                : "Unknown company"}
            </ItemCardFieldText>
          </ItemCardFieldBox>
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
          ) : project.creator?.imageUrl ? (
            <Link href={`/users/${project.creator.id}`}>
              <ItemCardImageField>
                <Image
                  fill
                  src={project.creator.imageUrl}
                  alt={project.creator.name}
                />
              </ItemCardImageField>
            </Link>
          ) : (
            <ItemCardImageField />
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
