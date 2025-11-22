import Image from "next/image";
import { UserHeaderInfo } from "./UserHeaderInfo";
import { UserHeaderText } from "./UserHeaderText";
import { UserHeaderTitle } from "./UserHeaderTitle";
import { UserHeaderLayout } from "./UserHeaderLayout";
import { ImageContainer } from "@/components/common/ImageContainer";
import { UnknownUser } from "@/components/common/UnknownUser";

export interface UserHeaderProps {
  fullName: string;
  imageUrl?: string;
  position?: {
    name: string;
  };
}

export function UserHeader({ fullName, imageUrl, position }: UserHeaderProps) {
  return (
    <UserHeaderLayout
      imageSlot={
        imageUrl ? (
          <ImageContainer className="h-21 w-21">
            <Image fill src={imageUrl} alt={fullName} />
          </ImageContainer>
        ) : (
          <UnknownUser className="h-21 w-21" iconSize={50} />
        )
      }
      infoSlot={
        <UserHeaderInfo>
          <UserHeaderTitle>{fullName}</UserHeaderTitle>
          <UserHeaderText>
            {position ? position.name : "Unknown position"}
          </UserHeaderText>
        </UserHeaderInfo>
      }
    />
  );
}
