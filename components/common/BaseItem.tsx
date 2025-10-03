"use client";

import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { Skeleton } from "../ui/Skeleton";
import { Badge, BadgeColor } from "../ui/Badge";
import { ResponsiveMenuTrigger } from "./ResponsiveMenuTrigger";
import { DialogCloseButton, DialogHeader, DialogHeading } from "../ui/Dialog";
import { Button } from "../ui/Button";
import { Ellipsis } from "lucide-react";
import { MenuTriggerProps } from "../ui/Menu";
import { ProgressBar, ProgressBarProps } from "../ui/ProgressBar";

export const BaseItemDetails = ({
  title,
  value,
  className,
  skeleton,
}: {
  title: string;
  value?: string;
  className?: string;
  skeleton?: boolean;
}) => {
  const baseOverflow = "overflow-hidden text-nowrap overflow-ellipsis";
  const titleClasses = `${baseOverflow} text-sm font-bold text-black dark:text-white`;
  const descriptionClasses = `${baseOverflow} text-xs font-medium text-gray-500 dark:text-gray-400`;
  const classes = twMerge("flex flex-col gap-1", className);

  if (skeleton) {
    return (
      <div className={classes}>
        <Skeleton className="w-50/100" size="sm" />
        <Skeleton className="w-35/100" size="xs" />
      </div>
    );
  }

  return (
    <div className={classes}>
      <h4 className={titleClasses}>{title}</h4>
      <span className={descriptionClasses}>{value}</span>
    </div>
  );
};

export const BaseItemProgress = ({
  skeleton,
  ...props
}: ProgressBarProps & { skeleton?: boolean }) => {
  const classes = "w-[10rem] shrink-0 @max-md:hidden";

  if (skeleton) {
    return <Skeleton className={classes} size="xs" />;
  }

  return <ProgressBar className={classes} {...props} />;
};

export const BaseItemActionMenu = ({
  items,
  children,
  skeleton,
}: Pick<MenuTriggerProps, "items" | "children"> & { skeleton?: boolean }) => {
  if (skeleton) {
    return (
      <div className="p-2">
        <Skeleton className="h-1 w-4" />
      </div>
    );
  }

  return (
    <ResponsiveMenuTrigger
      placement="bottom right"
      renderDialogHeader={() => (
        <DialogHeader className="px-4 py-3">
          <DialogHeading className="text-base">Actions</DialogHeading>
          <DialogCloseButton />
        </DialogHeader>
      )}
      renderButton={() => (
        <Button
          aria-label="task item menu"
          variant="ghost"
          iconLeft={
            <Ellipsis size={16} strokeWidth={1.5} absoluteStrokeWidth />
          }
          className="rounded-full"
        />
      )}
      items={items}
    >
      {children}
    </ResponsiveMenuTrigger>
  );
};

export const BaseItemStatusBadge = ({
  color,
  text,
  skeleton,
}: {
  color: BadgeColor;
  text?: string;
  skeleton: boolean;
}) => {
  const classes = "w-[5.5rem] shrink-0 grow-0 @max-xl:hidden";

  if (skeleton) {
    return <Skeleton className={twMerge(classes, "h-[1.75rem]")} />;
  }

  return (
    <Badge color={color} className={classes}>
      {text}
    </Badge>
  );
};

export const BaseItemImage = ({
  src,
  alt,
  skeleton,
}: {
  src: string | null;
  alt: string;
  skeleton: boolean;
}) => {
  const classes =
    "h-8 w-8 shrink-0 grow-0 bg-gray-200 rounded-full overflow-hidden";

  if (skeleton) {
    return <Skeleton className={classes} />;
  }

  return (
    <div className={classes}>
      {src && <Image width={32} height={32} src={src} alt={alt} />}
    </div>
  );
};

export const BaseItem = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={twMerge(
        "@container flex w-full items-center border-gray-300 bg-white py-3 not-last:border-b-1 dark:border-gray-600 dark:bg-gray-800",
        className,
      )}
    >
      {children}
    </div>
  );
};
