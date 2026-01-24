import { Link } from "@/components/ui";
import { useTranslations } from "next-intl";

const styles = "text-sm font-semibold text-black dark:text-white";

interface NotificationListItemActorProps {
  actor?: {
    id: string;
    fullName: string;
  };
}

export function NotificationListItemActor({
  actor,
}: NotificationListItemActorProps) {
  const t = useTranslations("notifications.NotificationListItemActor");

  return (
    <span className={styles}>
      {actor ? (
        <Link href={`/users/${actor.id}`}>{actor.fullName}</Link>
      ) : (
        t("unknownUser")
      )}
    </span>
  );
}
