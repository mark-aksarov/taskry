import { Database } from "lucide-react";
import {
  DashboardCard,
  DashboardCardIcon,
  DashboardCardValue,
} from "./DashboardCard";
import { ProgressBar } from "../ui/ProgressBar";
import { CardHeading } from "../common/Card";

export const StorageLimitCard = () => {
  return (
    <DashboardCard
      className="w-full"
      heading={<CardHeading>Storage Limit</CardHeading>}
      icon={
        <DashboardCardIcon color="green">
          <Database size={30} strokeWidth={2} absoluteStrokeWidth />
        </DashboardCardIcon>
      }
      value={<DashboardCardValue>855 MB</DashboardCardValue>}
      progress={
        <ProgressBar
          textClassName="text-sm font-normal"
          label="855 MB / 1 GB"
          value={(855 / 1024) * 100}
        />
      }
    />
  );
};
