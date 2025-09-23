import { EventItem } from "@/components/common/EventItem";
import { getUnreadTaskComments } from "@/lib/queries/task";

export const TaskCommentList = async () => {
  const taskComments = await getUnreadTaskComments(
    "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI",
  );

  return (
    <div>
      {taskComments.map((taskComment) => (
        <EventItem
          key={taskComment.id}
          action={`commented in ${taskComment.task.title}`}
          avatarUrl={taskComment.sender.imageUrl!}
          authorName={taskComment.sender.name}
          date={taskComment.createdAt}
          message={taskComment.content}
        />
      ))}
    </div>
  );
};
