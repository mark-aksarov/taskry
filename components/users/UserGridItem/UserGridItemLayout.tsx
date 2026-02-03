import { GridItem, GridItemRow } from "@/components/common/Grid";

export interface UserGridItemProps {
  actionMenuSlot: React.ReactNode;
  imageSlot: React.ReactNode;
  titleSlot: React.ReactNode;
  phoneNumberSlot: React.ReactNode;
}

export function UserGridItemLayout({
  actionMenuSlot,
  imageSlot,
  titleSlot,
  phoneNumberSlot,
}: UserGridItemProps) {
  return (
    <GridItem>
      <GridItemRow className="justify-end">{actionMenuSlot}</GridItemRow>

      <div className="flex flex-col items-center justify-between gap-4">
        {imageSlot}
        {titleSlot}
      </div>

      {phoneNumberSlot}
    </GridItem>
  );
}
