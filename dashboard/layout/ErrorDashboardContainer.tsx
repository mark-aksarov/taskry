import { DashboardContainer } from "../common/DashboardContainer";

interface ErrorDashboardContainerProps {
  headerOffset?: boolean;
  children?: React.ReactNode;
}

export default function ErrorDashboardContainer({
  headerOffset,
  children,
}: ErrorDashboardContainerProps) {
  return (
    <DashboardContainer fullscreen centered headerOffset={headerOffset}>
      {children}
    </DashboardContainer>
  );
}
