import Image from "next/image";
import { Link } from "@/components/ui/Link";
import { UnknownUser } from "@/components/common/UnknownUser";
import { ImageContainer } from "@/components/common/ImageContainer";

interface NotificationListItemActorImageLinkProps {
  actor?: {
    id: string;
    fullName: string;
    imageUrl?: string;
  };
}

export function NotificationListItemActorImageLink({
  actor,
}: NotificationListItemActorImageLinkProps) {
  return (
    <>
      {!actor || !actor.imageUrl ? (
        <UnknownUser className="h-10 w-10" iconSize={22} />
      ) : (
        <Link href={`/users/${actor.id}`}>
          <ImageContainer className="h-10 w-10">
            <Image fill src={actor.imageUrl} alt={actor.fullName} />
          </ImageContainer>
        </Link>
      )}
    </>
  );
}
