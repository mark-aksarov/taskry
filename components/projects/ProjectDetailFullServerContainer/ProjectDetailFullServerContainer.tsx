import { ProjectDetailFull } from "../ProjectDetailFull";
import { getComments } from "@/lib/data/comment/comment.dal";
import { CommentItem } from "@/components/comments/CommentItem";
import { getProjectDetail } from "@/lib/data/project/project.dal";
import { DetailCommentInput } from "@/components/common/DetailCommentInput";

export async function ProjectDetailFullServerContainer({ id }: { id: number }) {
  const project = await getProjectDetail(id);
  const comments = await getComments({
    projectId: id,
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
                sender={comment.sender}
              />
            );
          })}
        </div>
      }
    />
  );
}
