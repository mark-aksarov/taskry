import Image from "next/image";
import { ProfileHeaderInfo } from "./ProfileHeaderInfo";
import { ProfileHeaderText } from "./ProfileHeaderText";
import { ProfileHeaderTitle } from "./ProfileHeaderTitle";
import { ProfileHeaderLayout } from "./ProfileHeaderLayout";
import { ImageContainer } from "@/components/common/ImageContainer";

export interface ProfileHeaderProps {
  fullName: string;
  imageUrl?: string;
  position?: {
    name: string;
  };
}

export function ProfileHeader({
  fullName,
  imageUrl,
  position,
}: ProfileHeaderProps) {
  return (
    <ProfileHeaderLayout
      imageSlot={
        imageUrl ? (
          <ImageContainer className="h-21 w-21">
            <Image fill src={imageUrl} alt={fullName} />
          </ImageContainer>
        ) : (
          <ImageContainer className="h-21 w-21" />
        )
      }
      infoSlot={
        <ProfileHeaderInfo>
          <ProfileHeaderTitle>{fullName}</ProfileHeaderTitle>
          <ProfileHeaderText>
            {position ? position.name : "Unknown position"}
          </ProfileHeaderText>
        </ProfileHeaderInfo>
      }
    />
  );
}
