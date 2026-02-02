import Image from "next/image";
import { SearchListItem } from "../SearchListItem";
import { UnknownUser } from "@/components/common/UnknownUser";
import { ImageContainer } from "@/components/common/ImageContainer";
import { ListItemText, ListItemTitle } from "@/components/common/List";

interface CustomerSearchListItemProps {
  id: number;
  fullName: string;
  email: string;
  imageUrl?: string;
}

export function CustomerSearchListItem({
  id,
  fullName,
  email,
  imageUrl,
}: CustomerSearchListItemProps) {
  const userImg = imageUrl ? (
    <ImageContainer className="h-9 w-9">
      <Image fill src={imageUrl} alt={fullName} />
    </ImageContainer>
  ) : (
    <UnknownUser className="h-9 w-9" />
  );

  return (
    <SearchListItem
      href={`/customers/${id}`}
      imageSlot={userImg}
      titleSlot={<ListItemTitle>{fullName}</ListItemTitle>}
      textSlot={<ListItemText>{email}</ListItemText>}
    />
  );
}
