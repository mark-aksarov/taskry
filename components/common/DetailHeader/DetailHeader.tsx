import { DetailHeaderInfo } from "./DetailHeaderInfo";
import { DetailHeaderText } from "./DetailHeaderText";
import { DetailHeaderTitle } from "./DetailHeaderTitle";
import { DetailHeaderLayout } from "./DetailHeaderLayout";

export interface DetailHeaderProps {
  title: string;
  imageSlot: React.ReactNode;
  subtitle: string;
}

export function DetailHeader({
  title,
  imageSlot,
  subtitle,
}: DetailHeaderProps) {
  return (
    <DetailHeaderLayout
      imageSlot={imageSlot}
      mainSlot={
        <DetailHeaderInfo>
          <DetailHeaderTitle>{title}</DetailHeaderTitle>
          <DetailHeaderText>{subtitle}</DetailHeaderText>
        </DetailHeaderInfo>
      }
    />
  );
}
