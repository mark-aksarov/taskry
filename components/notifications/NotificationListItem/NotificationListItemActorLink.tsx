import { Link } from "@/components/ui";
import { useTranslations } from "next-intl";

interface NotificationListItemActorLinkProps {
  actor?: {
    id: string;
    fullName: string;
  };
}

export function NotificationListItemActorLink({
  actor,
}: NotificationListItemActorLinkProps) {
  const t = useTranslations("notifications.NotificationListItemActor");

  return (
    <span className="text-sm font-semibold text-black dark:text-white">
      {actor ? (
        <Link href={`/users/${actor.id}`}>{actor.fullName}</Link>
      ) : (
        t("unknownUser")
      )}
    </span>
  );
}
