import { GridItem } from "@/components/common/Grid";

interface CustomerGridItemProps {
  topRowSlot: React.ReactNode;
  imageSlot: React.ReactNode;
  titleSlot: React.ReactNode;
  contactSlot: React.ReactNode;
}

export function CustomerGridItemLayout({
  topRowSlot,
  imageSlot,
  titleSlot,
  contactSlot,
}: CustomerGridItemProps) {
  return (
    <GridItem>
      {topRowSlot}

      <div className="flex flex-col items-center justify-between gap-4">
        {imageSlot}
        {titleSlot}
      </div>

      {contactSlot}
    </GridItem>
  );
}
