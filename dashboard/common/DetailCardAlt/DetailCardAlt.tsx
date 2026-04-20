import { Card } from "@/dashboard/common/Card";

interface DetailCardAltProps {
  detailCardHeaderContainer: React.ReactNode;
  entityDetailContainer: React.ReactNode;
}

export function DetailCardAlt({
  detailCardHeaderContainer,
  entityDetailContainer,
}: DetailCardAltProps) {
  return (
    <Card className="mx-auto w-[700px] max-w-full p-0">
      <div className="max-md:p-4 md:p-6">
        {detailCardHeaderContainer}
        {entityDetailContainer}
      </div>
    </Card>
  );
}
