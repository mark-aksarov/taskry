import { GridItem, GridItemRow } from "@/components/common/Grid";

export interface UserGridItemProps {
  checkboxSlot?: React.ReactNode;
  actionMenuSlot: React.ReactNode;
  imageSlot: React.ReactNode;
  titleSlot: React.ReactNode;
  phoneNumberSlot: React.ReactNode;
}

export function UserGridItemLayout({
  checkboxSlot,
  actionMenuSlot,
  imageSlot,
  titleSlot,
  phoneNumberSlot,
}: UserGridItemProps) {
  return (
    <GridItem>
      <GridItemRow>
        {checkboxSlot}
        {actionMenuSlot}
      </GridItemRow>

      <div className="flex flex-col items-center justify-between gap-4">
        {imageSlot}
        {titleSlot}
      </div>

      {phoneNumberSlot}
    </GridItem>
  );
}
