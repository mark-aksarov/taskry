import Image from "next/image";
import { useTranslations } from "next-intl";
import { DetailText } from "@/components/common/Detail";
import { UnknownUser } from "@/components/common/UnknownUser";
import { ImageContainer } from "@/components/common/ImageContainer";

interface TaskDetailAssigneeProps {
  assignee?: {
    id: string;
    fullName: string;
    imageUrl?: string;
  };
}

export function TaskDetailAssignee({ assignee }: TaskDetailAssigneeProps) {
  const t = useTranslations("tasks.TaskDetail");

  const assigneeImg = assignee?.imageUrl ? (
    <ImageContainer className="h-9 w-9">
      <Image src={assignee.imageUrl} alt="" width={36} height={36} />
    </ImageContainer>
  ) : (
    <UnknownUser className="h-9 w-9" />
  );

  return (
    <div className="flex items-center gap-2">
      {assignee ? (
        <>
          {assigneeImg}
          <DetailText>{assignee.fullName}</DetailText>
        </>
      ) : (
        <>
          <UnknownUser className="h-9 w-9" />
          <DetailText>{t("noAssignee")}</DetailText>
        </>
      )}
    </div>
  );
}
