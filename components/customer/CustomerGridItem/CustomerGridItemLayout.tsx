import { GridItem, GridItemRow } from "@/components/common/Grid";

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

      <GridItemRow>
        {titleSlot}
        {imageSlot}
      </GridItemRow>

      {contactSlot}
    </GridItem>
  );
}
