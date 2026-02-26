import { DetailHeaderInfo } from "./DetailHeaderInfo";
import { DetailHeaderText } from "./DetailHeaderText";
import { DetailHeaderTitle } from "./DetailHeaderTitle";
import { DetailHeaderLayout } from "./DetailHeaderLayout";

export interface DetailHeaderProps {
  title: string;
  image: React.ReactNode;
  subtitle: string;
}

export function DetailHeader({ title, image, subtitle }: DetailHeaderProps) {
  return (
    <DetailHeaderLayout
      imageSlot={image}
      mainSlot={
        <DetailHeaderInfo>
          <DetailHeaderTitle>{title}</DetailHeaderTitle>
          <DetailHeaderText>{subtitle}</DetailHeaderText>
        </DetailHeaderInfo>
      }
    />
  );
}
