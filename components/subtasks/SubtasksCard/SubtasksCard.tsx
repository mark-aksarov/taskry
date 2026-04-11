import { useTranslations } from "next-intl";
import { Card } from "@/components/common/Card";
import { DetailTitle } from "@/components/common/Detail";
import { CreateSubtasksButton } from "../CreateSubtaskButton";

interface SubtasksCardProps {
  subtasksContainer: React.ReactNode;
}

export function SubtasksCard({ subtasksContainer }: SubtasksCardProps) {
  const t = useTranslations("subtasks.SubtasksCard");

  return (
    <Card className="flex flex-col gap-3">
      <DetailTitle>{t("title")}</DetailTitle>
      {subtasksContainer}
      <CreateSubtasksButton />
    </Card>
  );
}
