import { DetailCardAlt } from "@/components/common/DetailCardAlt";

interface ProjectDetailCardProps {
  projectDetailCardHeaderContainer: React.ReactNode;
  projectDetailContainer: React.ReactNode;
}

export function ProjectDetailCard({
  projectDetailCardHeaderContainer,
  projectDetailContainer,
}: ProjectDetailCardProps) {
  return (
    <DetailCardAlt
      detailCardHeaderContainer={projectDetailCardHeaderContainer}
      entityDetailContainer={projectDetailContainer}
    />
  );
}
