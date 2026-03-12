"use client";

import Image from "next/image";
import { useState } from "react";
import { Camera } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useGuestModeModal } from "../GuestModeModal";
import { useCurrentUser } from "../CurrentUserContext";
import { UnknownUser } from "@/components/common/UnknownUser";
import { ImageContainer } from "@/components/common/ImageContainer";
import { PersonImageModal } from "@/components/common/PersonImageModal";

export interface PersonDetailHeaderImageProps {
  alt?: string;
  imageUrl?: string;
  canEditImage?: boolean;
}

export function PersonDetailHeaderImage({
  alt,
  imageUrl,
  canEditImage,
}: PersonDetailHeaderImageProps) {
  const { isGuest } = useCurrentUser();
  const { onOpenChange: onGuestModeModalOpenChange } = useGuestModeModal();
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  function handlePress() {
    if (isGuest) {
      onGuestModeModalOpenChange(true);
      return;
    }

    setIsImageModalOpen(true);
  }

  return (
    <div className="relative">
      <ImageContainer className="h-21 w-21">
        {imageUrl ? (
          <Image src={imageUrl} alt={alt ?? ""} width={84} height={84} />
        ) : (
          <UnknownUser className="h-21 w-21" iconSize={50} />
        )}
      </ImageContainer>

      {canEditImage && (
        <>
          <Button
            onPress={handlePress}
            className="absolute -right-1 -bottom-1 bg-white dark:bg-gray-800"
            variant="outlined"
            iconLeft={
              <Camera size={16} strokeWidth={1.5} absoluteStrokeWidth />
            }
          />

          <PersonImageModal
            isOpen={isImageModalOpen}
            onOpenChange={setIsImageModalOpen}
          />
        </>
      )}
    </div>
  );
}
