import Image from "next/image";
import { UnknownUser } from "@/components/common/UnknownUser";
import { ImageContainer } from "@/components/common/ImageContainer";

interface ItemBaseUserImageContainerProps {
  user?: {
    fullName: string;
    imageUrl?: string;
  };
  className: string;
  width: number;
  height: number;
}

export function ItemBaseUserImageContainer({
  user,
  className,
  width,
  height,
}: ItemBaseUserImageContainerProps) {
  if (!user?.imageUrl) return <UnknownUser className={className} />;

  return (
    <ImageContainer className={className}>
      <Image
        src={user.imageUrl}
        alt={user.fullName}
        width={width}
        height={height}
        className="rounded-full"
      />
    </ImageContainer>
  );
}
