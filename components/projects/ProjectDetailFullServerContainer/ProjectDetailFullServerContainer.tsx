import { notFound } from "next/navigation";
import { ProjectDetailFull } from "../ProjectDetailFull";
import { CommentItem } from "@/components/comments/CommentItem";
import { getCommentList } from "@/lib/data/comment/comment.service";
import { getProjectDetail } from "@/lib/data/project/project.service";
import { DetailCommentInput } from "@/components/common/DetailCommentInput";

export async function ProjectDetailFullServerContainer({ id }: { id: number }) {
  const project = await getProjectDetail(id);
  const comments = await getCommentList({
    projectId: id,
  });

  if (!project) {
    notFound();
  }

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
                sender={comment.sender}
              />
            );
          })}
        </div>
      }
    />
  );
}
