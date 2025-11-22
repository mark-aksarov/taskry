import Image from "next/image";
import { PersonHeaderInfo } from "./PersonHeaderInfo";
import { PersonHeaderText } from "./PersonHeaderText";
import { PersonHeaderTitle } from "./PersonHeaderTitle";
import { PersonHeaderLayout } from "./PersonHeaderLayout";
import { UnknownUser } from "@/components/common/UnknownUser";
import { ImageContainer } from "@/components/common/ImageContainer";

export interface PersonHeaderProps {
  title: string;
  imageUrl?: string;
  subtitle: string;
}

export function PersonHeader({ title, imageUrl, subtitle }: PersonHeaderProps) {
  return (
    <PersonHeaderLayout
      imageSlot={
        imageUrl ? (
          <ImageContainer className="h-21 w-21">
            <Image fill src={imageUrl} alt={title} />
          </ImageContainer>
        ) : (
          <UnknownUser className="h-21 w-21" iconSize={50} />
        )
      }
      infoSlot={
        <PersonHeaderInfo>
          <PersonHeaderTitle>{title}</PersonHeaderTitle>
          <PersonHeaderText>{subtitle}</PersonHeaderText>
        </PersonHeaderInfo>
      }
    />
  );
}
