import { memo } from "react";
import Image from "next/image";
import { BaseLink } from "@/ui/Link";
import { CommentItemDate } from "./CommentItemDate";
import { CommentItemText } from "./CommentItemText";
import { CommentItemInfo } from "./CommentItemInfo";
import { CommentItemTitle } from "./CommentItemTitle";
import { CommentItemLayout } from "./CommentItemLayout";
import { UnknownUser } from "@/dashboard/common/UnknownUser";
import { useCommentItemPending } from "./useCommentItemPending";
import { ImageContainer } from "@/dashboard/common/ImageContainer";
import { useFormatter, useLocale, useTranslations } from "next-intl";
import { useCurrentUser } from "@/dashboard/common/CurrentUserContext";
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
  const isPending = useCommentItemPending(props.id);

  return <CommentItemInner {...props} isPending={isPending} />;
}

type InnerProps = CommentItemProps & {
  isPending: boolean;
};

const CommentItemInner = memo(function CommentItemInner({
  id,
  isPending,
  content,
  createdAt,
  canEdit,
  sender,
}: InnerProps) {
  const t = useTranslations("dashboard.comments.CommentItem");
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
      className={isPending ? "*:opacity-50" : undefined}
      senderImageSlot={
        <>
          {sender?.imageUrl ? (
            <BaseLink href={`/team/${sender.id}`}>
              <ImageContainer className="h-9 w-9">
                <Image
                  src={sender.imageUrl}
                  alt={sender.fullName}
                  width={36}
                  height={36}
                />
              </ImageContainer>
            </BaseLink>
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
              <BaseLink href={`/team/${sender.id}`}>{sender.fullName}</BaseLink>
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
});
