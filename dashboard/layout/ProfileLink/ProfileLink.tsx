"use client";

import Image from "next/image";
import { BaseLink } from "@/ui/Link";
import { UnknownUser } from "@/dashboard/common/UnknownUser";
import { ImageContainer } from "@/dashboard/common/ImageContainer";

interface ProfileLinkProps {
  fullName: string;
  imageUrl?: string;
}

export const ProfileLink = ({ fullName, imageUrl }: ProfileLinkProps) => {
  const profileImg = imageUrl ? (
    <ImageContainer className="h-8 w-8">
      <Image src={imageUrl} alt="profile image" width={32} height={32} />
    </ImageContainer>
  ) : (
    <UnknownUser className="h-8 w-8" />
  );

  return (
    <BaseLink href="/profile" className="flex items-center gap-2.5">
      <div className="h-8 w-8 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
        {profileImg}
      </div>
      <div className="text-sm font-bold text-(--text-primary)">{fullName}</div>
    </BaseLink>
  );
};
