interface UserDetailPresentationProps {
  personHeader: React.ReactNode;
  userDetail: React.ReactNode;
}

export function UserDetailPresentation({
  personHeader,
  userDetail,
}: UserDetailPresentationProps) {
  return (
    <div className="flex flex-col gap-6">
      {personHeader}
      {userDetail}
    </div>
  );
}
