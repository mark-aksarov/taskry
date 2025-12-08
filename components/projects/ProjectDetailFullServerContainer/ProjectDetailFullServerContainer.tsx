import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getComments } from "@/lib/queries/comments";
import { getProjectDetail } from "@/lib/queries/project";
import { ProjectDetailFull } from "../ProjectDetailFull";
import { CommentItem } from "@/components/comments/CommentItem";
import { DetailCommentInput } from "@/components/common/DetailCommentInput";

export async function ProjectDetailFullServerContainer({ id }: { id: number }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const { id: userId } = session!.user;

  const project = await getProjectDetail(id);
  const comments = await getComments({
    projectId: id,
    userId,
  });

  return (
    <ProjectDetailFull
      description={project.description ?? undefined}
      attachments={project.attachments}
      comments={
        <div className="flex flex-col gap-4">
          <DetailCommentInput />
          {comments.map((comment) => {
            return (
              <CommentItem
                key={comment.id}
                content={comment.content}
                createdAt={comment.createdAt}
                attachments={comment.attachments}
                sender={
                  comment.sender
                    ? {
                        id: comment.sender.id,
                        fullName: comment.sender.fullName,
                        imageUrl: comment.sender.imageUrl ?? undefined,
                      }
                    : undefined
                }
              />
            );
          })}
        </div>
      }
    />
  );
}
