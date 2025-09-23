import Image from "next/image";
import { BaseItem } from "../BaseItem";
import { useMemo } from "react";
import { twMerge } from "tailwind-merge";

interface EventItemProps {
  avatarUrl: string;
  authorName: string;
  action?: string;
  date: Date;
  message: string;
  className?: string;
}

export const EventItem = ({
  avatarUrl,
  authorName,
  action,
  date,
  message,
  className,
}: EventItemProps) => {
  const locale = "en-GB";

  const formattedDate = useMemo(() => {
    if (!date) return "";

    const formattedDate = new Date(date);

    return formattedDate.toLocaleDateString(locale, {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  }, [date, locale]);

  const formattedUpper = formattedDate.replace(/([ap]m)$/i, (match) =>
    match.toUpperCase(),
  );

  const baseEllipsis = "overflow-hidden text-nowrap overflow-ellipsis";
  const secondaryText = `${baseEllipsis} text-gray-500 dark:text-gray-400`;
  const primaryText = `${baseEllipsis} text-black dark:text-white`;

  return (
    <BaseItem className={twMerge("w-full items-start gap-3", className)}>
      <Image
        src={avatarUrl}
        alt={authorName}
        width={40}
        height={40}
        className="rounded-full"
      />
      <div className="flex w-[calc(100%-40px-var(--spacing)*3)] flex-col gap-3">
        <div className="flex flex-col gap-1 overflow-hidden">
          <div className="flex items-center justify-between gap-2">
            <span className={`${primaryText} text-sm font-semibold`}>
              {authorName}
            </span>
            <span className={`${secondaryText} text-xs font-normal`}>
              {formattedUpper}
            </span>
          </div>
          <span className={`${secondaryText} text-xs font-medium`}>
            {action}
          </span>
        </div>
        <span className={`${secondaryText} text-sm font-normal`}>
          {message}
        </span>
      </div>
    </BaseItem>
  );
};
