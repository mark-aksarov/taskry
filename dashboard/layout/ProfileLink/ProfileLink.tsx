"use client";

import Image from "next/image";
import { tv } from "tailwind-variants";
import { Link } from "react-aria-components";
import { focusRing } from "@/ui/styles";
import { UnknownUser } from "@/dashboard/common/UnknownUser";
import { ImageContainer } from "@/dashboard/common/ImageContainer";

const styles = tv({
  extend: focusRing,
  base: "flex items-center gap-2.5",
});

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
    <Link href="/profile" className={styles}>
      <div className="h-8 w-8 overflow-hidden rounded-full bg-gray-300">
        {profileImg}
      </div>
      <div className="text-sm font-bold text-black dark:text-white">
        {fullName}
      </div>
    </Link>
  );
};
