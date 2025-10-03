"use client";

import Image from "next/image";
import { Button } from "../ui/Button";
import { Ellipsis } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { Skeleton } from "../ui/Skeleton";
import { MenuTriggerProps } from "../ui/Menu";
import { Badge, BadgeColor } from "../ui/Badge";
import { ResponsiveMenuTrigger } from "./ResponsiveMenuTrigger";
import { DialogCloseButton, DialogHeader, DialogHeading } from "../ui/Dialog";

export const BaseItemDetails = ({
  title,
  description,
  skeleton,
}: {
  title: string;
  description?: string;
  skeleton: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col gap-1">
      {skeleton}
      <h4 className={titleClasses}>{title}</h4>
      <span className={descriptionClasses}>{description}</span>
    </div>
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
  const classes = "w-[5.5rem] px-0 @max-xl:hidden";

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
  className,
  skeleton,
}: {
  src: string | null;
  alt: string;
  className?: string;
  skeleton: boolean;
}) => {
  const classes = twMerge(
    "h-8 w-8 bg-gray-200 rounded-full overflow-hidden relative",
    className,
  );

  if (skeleton) {
    return <Skeleton className={classes} />;
  }

  return (
    <div className={classes}>{src && <Image fill src={src} alt={alt} />}</div>
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
