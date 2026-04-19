import { GridItem, GridItemRow } from "@/components/common/GridItem";

export interface UserGridItemProps {
  className?: string;
  actionMenuSlot: React.ReactNode;
  imageSlot: React.ReactNode;
  titleSlot: React.ReactNode;
  phoneNumberSlot: React.ReactNode;
}

export function UserGridItemLayout({
  className,
  actionMenuSlot,
  imageSlot,
  titleSlot,
  phoneNumberSlot,
}: UserGridItemProps) {
  return (
    <GridItem className={className}>
      <GridItemRow className="justify-end">{actionMenuSlot}</GridItemRow>

      <GridItemRow>
        {titleSlot}
        {imageSlot}
      </GridItemRow>

      {phoneNumberSlot}
    </GridItem>
  );
}
