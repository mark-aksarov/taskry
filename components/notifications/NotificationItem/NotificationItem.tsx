import { BaseItem } from "@/components/common/BaseItem";
import { Button } from "@/components/ui/Button";
import { DialogHeader } from "@/components/ui/Dialog";
import { MenuTrigger } from "@/components/ui/Menu";
import { NotificationRecipientWithRelations } from "@/lib/queries/types";
import { Ellipsis, ListCheck, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { Item } from "react-stately";
import { twMerge } from "tailwind-merge";

interface NotificationItemProps {
  notificationRecipient: NotificationRecipientWithRelations;
  className?: string;
}

export const NotificationItem = ({
  notificationRecipient,
  className,
}: NotificationItemProps) => {
  const {
    isRead,
    notification: { actor, type, createdAt: date, target, targetName },
  } = notificationRecipient;

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

  const itemClasses = "flex items-center gap-4 font-semibold";
  const secondaryText = "text-gray-500 dark:text-gray-400";
  const primaryText = "text-black dark:text-white";

  const renderButton = (className?: string) => (
    <Button
      aria-label="task item menu"
      variant="ghost"
      iconLeft={<Ellipsis size={16} strokeWidth={1.5} absoluteStrokeWidth />}
      className={twMerge("shrink-0 grow-0 rounded-full", className)}
    />
  );

  const actionsMenu = (
    <>
      <MenuTrigger
        overlayType="bottomsheet"
        renderDialogHeader={() => (
          <DialogHeader className="px-4 py-3" titleClassName="text-base">
            Actions
          </DialogHeader>
        )}
        renderButton={() => renderButton("md:hidden")}
      >
        <>
          {!isRead && (
            <Item textValue="Mark as Read" key="read">
              <div className={itemClasses}>
                <ListCheck size={16} strokeWidth={1.5} absoluteStrokeWidth />{" "}
                Mark as Read
              </div>
            </Item>
          )}
        </>
        <Item textValue="Delete" key="delete">
          <div className={itemClasses}>
            <Trash size={16} strokeWidth={1.5} absoluteStrokeWidth /> Delete
          </div>
        </Item>
      </MenuTrigger>
      <MenuTrigger
        renderButton={() => renderButton("max-md:hidden")}
        placement="bottom right"
      >
        <>
          {!isRead && (
            <Item textValue="Mark as Read" key="read">
              <div className={itemClasses}>
                <ListCheck size={16} strokeWidth={1.5} absoluteStrokeWidth />{" "}
                Mark as Read
              </div>
            </Item>
          )}
        </>
        <Item textValue="Delete" key="delete">
          <div className={itemClasses}>
            <Trash size={16} strokeWidth={1.5} absoluteStrokeWidth /> Delete
          </div>
        </Item>
      </MenuTrigger>
    </>
  );

  function getActionText() {
    switch (type) {
      case "TASK_ADDED":
        return "added a new task";
      case "TASK_DELETED":
        return "deleted a task";
      case "TASK_UPDATED":
        return "updated a task";
      case "TASK_COMMENTED":
        return "commented on a task";

      case "PROJECT_ADDED":
        return "added a new project";
      case "PROJECT_DELETED":
        return "deleted a project";
      case "PROJECT_UPDATED":
        return "updated a project";
      case "PROJECT_COMMENTED":
        return "commented on a project";

      case "USER_ADDED":
        return "added a new user";
      case "USER_DELETED":
        return "deleted a user";
      case "USER_UPDATED":
        return "updated a user";

      case "CUSTOMER_ADDED":
        return "added a new customer";
      case "CUSTOMER_DELETED":
        return "deleted a customer";
      case "CUSTOMER_UPDATED":
        return "updated a customer";

      case "MESSAGE_SENDED":
        return "sent a";

      default:
        throw new Error("Invalid notification type");
    }
  }

  function getTarget() {
    switch (type) {
      case "TASK_ADDED":
      case "TASK_UPDATED":
      case "TASK_COMMENTED":
        return (
          <Link href={`/tasks/${target?.task?.id}`}>{target?.task?.title}</Link>
        );
      case "TASK_DELETED":
        return targetName;

      case "PROJECT_ADDED":
      case "PROJECT_UPDATED":
      case "PROJECT_COMMENTED":
        return (
          <Link href={`/projects/${target?.project?.id}`}>
            {target?.project?.title}
          </Link>
        );

      case "PROJECT_DELETED":
        return targetName;

      case "USER_ADDED":
      case "USER_UPDATED":
        return (
          <Link href={`/users/${target?.user?.id}`}>{target?.user?.name}</Link>
        );

      case "USER_DELETED":
        return targetName;

      case "CUSTOMER_ADDED":
      case "CUSTOMER_UPDATED":
        return (
          <Link href={`/customers/${target?.customer?.id}`}>
            {target?.customer?.fullName}
          </Link>
        );

      case "CUSTOMER_DELETED":
        return targetName;

      case "MESSAGE_SENDED":
        return <Link href={`/messages/${target?.message?.id}`}>message</Link>;

      default:
        throw new Error("Invalid notification type");
    }
  }

  return (
    <BaseItem className={twMerge("w-full items-start gap-3", className)}>
      <div className="relative shrink-0">
        <Image
          src={actor?.imageUrl!}
          alt={actor?.name!}
          width={40}
          height={40}
          className="rounded-full"
        />
        {!isRead && (
          <div className="absolute top-0 right-0 h-[10px] w-[10px] rounded-full border-1 border-white bg-green-700 dark:bg-green-800" />
        )}
      </div>
      <div className="flex flex-col gap-1 overflow-hidden">
        <span className="text-sm">
          <span className={`${primaryText} font-semibold`}>{actor?.name!}</span>
          <span className={`${secondaryText} font-normal`}>
            &nbsp;{getActionText()}&nbsp;
          </span>
          <span className={`${primaryText} font-semibold`}>{getTarget()}</span>
        </span>
        <span className={`${secondaryText} text-xs font-medium`}>
          {formattedUpper}
        </span>
      </div>
      <div className="ml-auto">{actionsMenu}</div>
    </BaseItem>
  );
};
