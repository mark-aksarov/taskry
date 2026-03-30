import { memo } from "react";
import Image from "next/image";
import { Link } from "@/components/ui/Link";
import { CommentItemDate } from "./CommentItemDate";
import { CommentItemText } from "./CommentItemText";
import { CommentItemInfo } from "./CommentItemInfo";
import { CommentItemTitle } from "./CommentItemTitle";
import { CommentItemLayout } from "./CommentItemLayout";
import { UnknownUser } from "@/components/common/UnknownUser";
import { ImageContainer } from "@/components/common/ImageContainer";
import { useFormatter, useLocale, useTranslations } from "next-intl";
import { CommentItemPendingOverlay } from "./CommentItemPendingOverlay";
import { useCurrentUser } from "@/components/common/CurrentUserContext";
import { CommentItemActionMenuTrigger } from "./CommentItemActionMenuTrigger";

interface CommentItemProps {
  id: number;
  content: string;
  createdAt: string;
  canEdit: boolean;
  sender?: {
    id: string;
    fullName: string;
    imageUrl?: string;
  };
  menuTrigger?: React.ReactNode;
}

export function CommentItem(props: CommentItemProps) {
  return (
    <CommentItemPendingOverlay commentId={props.id}>
      <CommentItemInner {...props} />
    </CommentItemPendingOverlay>
  );
}

const CommentItemInner = memo(
  ({ id, content, createdAt, canEdit, sender }: CommentItemProps) => {
    const t = useTranslations("comments.CommentItem");
    const locale = useLocale();

    // use useFormatter to format the date according to the user's locale
    const format = useFormatter();

    const formattedDate = format.dateTime(new Date(createdAt), {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: locale === "en" ? true : false,
    });

    const { isGuest } = useCurrentUser();

    return (
      <CommentItemLayout
        senderImageSlot={
          <>
            {sender?.imageUrl ? (
              <Link href={`/team/${sender.id}`}>
                <ImageContainer className="h-9 w-9">
                  <Image
                    src={sender.imageUrl}
                    alt={sender.fullName}
                    width={36}
                    height={36}
                  />
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
        menuTriggerSlot={
          (canEdit || isGuest) && (
            <CommentItemActionMenuTrigger
              commentId={id}
              commentContent={content}
              className="-mr-2"
            />
          )
        }
      />
    );
  },
);
