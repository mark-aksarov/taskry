import { GridItem, GridItemRow } from "@/dashboard/common/GridItem";

interface CustomerGridItemProps {
  className?: string;
  topRowSlot: React.ReactNode;
  imageSlot: React.ReactNode;
  titleSlot: React.ReactNode;
  contactSlot: React.ReactNode;
}

export function CustomerGridItemLayout({
  className,
  topRowSlot,
  imageSlot,
  titleSlot,
  contactSlot,
}: CustomerGridItemProps) {
  return (
    <GridItem className={className}>
      {topRowSlot}

      <GridItemRow>
        {titleSlot}
        {imageSlot}
      </GridItemRow>

      {contactSlot}
    </GridItem>
  );
}
