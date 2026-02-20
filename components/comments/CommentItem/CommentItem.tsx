import Image from "next/image";
import { Link } from "@/components/ui/Link";
import { CommentItemDate } from "./CommentItemDate";
import { CommentItemText } from "./CommentItemText";
import { CommentItemInfo } from "./CommentItemInfo";
import { CommentItemTitle } from "./CommentItemTitle";
import { CommentItemLayout } from "./CommentItemLayout";
import { useFormatter, useTranslations } from "next-intl";
import { UnknownUser } from "@/components/common/UnknownUser";
import { ImageContainer } from "@/components/common/ImageContainer";

interface CommentItemProps {
  content: string;
  createdAt: Date;
  sender?: {
    id: string;
    fullName: string;
    imageUrl?: string;
  };
  menuTrigger?: React.ReactNode;
}

export function CommentItem({
  content,
  createdAt,
  sender,
  menuTrigger,
}: CommentItemProps) {
  const t = useTranslations("comments.CommentItem");

  const format = useFormatter();

  const formattedDate = format.dateTime(new Date(createdAt), {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <CommentItemLayout
      senderImageSlot={
        <>
          {sender?.imageUrl ? (
            <Link href={`/team/${sender.id}`}>
              <ImageContainer className="h-9 w-9">
                <Image src={sender.imageUrl} alt={sender.fullName} fill />
              </ImageContainer>
            </Link>
          ) : (
            <UnknownUser className="h-9 w-9" />
          )}
        </>
      }
      senderNameAndDateSlot={
        <CommentItemInfo>
          <CommentItemTitle>
            {!sender ? (
              t("unknownUser")
            ) : (
              <Link href={`/team/${sender.id}`}>{sender.fullName}</Link>
            )}
          </CommentItemTitle>
          <CommentItemDate>{formattedDate}</CommentItemDate>
        </CommentItemInfo>
      }
      contentSlot={
        <>
          <CommentItemText>{content}</CommentItemText>
        </>
      }
      menuTriggerSlot={menuTrigger}
    />
  );
}
