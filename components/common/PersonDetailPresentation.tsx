interface PersonDetailPresentationProps {
  personHeader: React.ReactNode;
  userDetail: React.ReactNode;
}

export function PersonDetailPresentation({
  personHeader,
  userDetail,
}: PersonDetailPresentationProps) {
  return (
    <div className="flex flex-col gap-6">
      {personHeader}
      {userDetail}
    </div>
  );
}
