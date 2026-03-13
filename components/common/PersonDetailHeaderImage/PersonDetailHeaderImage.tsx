"use client";

import Image from "next/image";
import { UnknownUser } from "@/components/common/UnknownUser";
import { ImageContainer } from "@/components/common/ImageContainer";

export interface PersonDetailHeaderImageProps {
  alt?: string;
  imageUrl?: string;
}

export function PersonDetailHeaderImage({
  alt,
  imageUrl,
}: PersonDetailHeaderImageProps) {
  return (
    <ImageContainer className="h-21 w-21">
      {imageUrl ? (
        <Image src={imageUrl} alt={alt ?? ""} width={84} height={84} />
      ) : (
        <UnknownUser className="h-21 w-21" iconSize={50} />
      )}
    </ImageContainer>
  );
}
