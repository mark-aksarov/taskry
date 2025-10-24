import {
  DetailPanelInfo,
  DetailPanelInfoSkeleton,
  DetailPanelText,
  DetailPanelTitle,
} from "@/components/common/Detail";
import { DetailPanelHeader } from "@/components/common/DetailPanel";
import {
  ImageContainer,
  ImageContainerSkeleton,
} from "@/components/common/ImageContainer";
import { Link } from "@/components/ui";
import { UserPreview } from "@/lib/queries/types";
import Image from "next/image";

export function ProfileDetailPanelHeaderInner({
  user,
}: {
  user?: UserPreview;
}) {
  return (
    <DetailPanelHeader>
      {!user ? (
        <ImageContainerSkeleton className="h-21 w-21" />
      ) : user.imageUrl ? (
        <Link href={`/users/${user.id}`}>
          <ImageContainer className="h-21 w-21">
            <Image fill src={user.imageUrl} alt={user.fullName} />
          </ImageContainer>
        </Link>
      ) : (
        <ImageContainer className="h-21 w-21" />
      )}

      {!user ? (
        <DetailPanelInfoSkeleton />
      ) : (
        <>
          <DetailPanelInfo>
            <DetailPanelTitle>{user.fullName}</DetailPanelTitle>
            <DetailPanelText>
              {user.position ? user.position.name : "Unknown position"}
            </DetailPanelText>
          </DetailPanelInfo>
        </>
      )}
    </DetailPanelHeader>
  );
}
