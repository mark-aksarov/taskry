"use client";

import Image from "next/image";
import { UnknownUser } from "@/components/common/UnknownUser";
import { ImageContainer } from "@/components/common/ImageContainer";
import { useTranslations } from "next-intl";

export interface PersonDetailHeaderImageProps {
  imageUrl?: string;
}

export function PersonDetailHeaderImage({
  imageUrl,
}: PersonDetailHeaderImageProps) {
  const t = useTranslations("customers.PersonDetailHeaderImage");

  return (
    <ImageContainer className="h-21 w-21">
      {imageUrl ? (
        <Image src={imageUrl} alt={t("imageAlt")} width={84} height={84} />
      ) : (
        <UnknownUser className="h-21 w-21" iconSize={50} />
      )}
    </ImageContainer>
  );
}
