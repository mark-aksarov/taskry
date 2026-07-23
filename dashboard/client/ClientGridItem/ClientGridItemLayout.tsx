import { GridItem, GridItemRow } from "@/dashboard/common/GridItem";

interface ClientGridItemProps {
  className?: string;
  topRowSlot: React.ReactNode;
  imageSlot: React.ReactNode;
  titleSlot: React.ReactNode;
  contactSlot: React.ReactNode;
}

export function ClientGridItemLayout({
  className,
  topRowSlot,
  imageSlot,
  titleSlot,
  contactSlot,
}: ClientGridItemProps) {
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
