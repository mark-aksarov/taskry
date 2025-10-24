import {
  DetailPanelInfo,
  DetailPanelInfoSkeleton,
  DetailPanelText,
  DetailPanelTitle,
} from "@/components/common/Detail";
import { DetailPanelHeader } from "@/components/common/DetailPanel";
import {
  ImageContainer,
  ImageContainerSkeleton,
} from "@/components/common/ImageContainer";
import { Link } from "@/components/ui";
import { TaskPreview } from "@/lib/queries/types";
import Image from "next/image";

export function TaskDetailPanelHeaderInner({ task }: { task?: TaskPreview }) {
  return (
    <DetailPanelHeader>
      {!task ? (
        <ImageContainerSkeleton className="h-21 w-21" />
      ) : task.creator?.imageUrl ? (
        <Link href={`/tasks/${task.id}`}>
          <ImageContainer className="h-21 w-21">
            <Image
              fill
              src={task.creator?.imageUrl}
              alt={task.creator.fullName}
            />
          </ImageContainer>
        </Link>
      ) : (
        <ImageContainer className="h-21 w-21" />
      )}

      {!task ? (
        <DetailPanelInfoSkeleton />
      ) : (
        <>
          <DetailPanelInfo>
            <DetailPanelTitle>{task.title}</DetailPanelTitle>
            <DetailPanelText>{task.category.name}</DetailPanelText>
          </DetailPanelInfo>
        </>
      )}
    </DetailPanelHeader>
  );
}
