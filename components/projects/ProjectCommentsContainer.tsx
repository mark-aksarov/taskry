"use client";

import {
  CommentItem,
  CommentItemSkeleton,
} from "@/components/comments/CommentItem";

import useSWR from "swr";
import { Repeat } from "../common/Repeat";
import { notFound } from "next/navigation";
import { usePathname } from "@/i18n/navigation";
import { CommentListItemDTO } from "@/lib/data/comment/comment.dto";
import { deleteComment } from "@/lib/actions/comment/deleteComment";
import { CommentsEmptySection } from "@/components/comments/CommentsEmptySection";

interface ProjectCommentsContainerProps {
  projectId: number;
}

export function ProjectCommentsContainer({
  projectId,
}: ProjectCommentsContainerProps) {
  const pathname = usePathname();

  const { data: comments, error: commentsError } = useSWR<CommentListItemDTO[]>(
    `/api/projects/${projectId}/comments`,
    {
      refreshInterval: 5000,
      dedupingInterval: 2000,
    },
  );

  if (commentsError) {
    if (pathname === "/projects") {
      if (commentsError.status === 404) {
        throw new Error(undefined, { cause: "notFound" });
      }

      throw new Error();
    }

    notFound();
  }

  // Show skeleton while loading or revalidating
  if (!comments) {
    return <Repeat items={10} renderItem={() => <CommentItemSkeleton />} />;
  }

  // Show empty section if no comments
  if (comments.length === 0) {
    return <CommentsEmptySection />;
  }

  return (
    <>
      {comments.map((comment) => {
        return (
          <CommentItem
            key={comment.id}
            id={comment.id}
            content={comment.content}
            createdAt={comment.createdAt}
            sender={comment.sender}
            canEdit={comment.canEdit}
            deleteComment={deleteComment}
          />
        );
      })}
    </>
  );
}
