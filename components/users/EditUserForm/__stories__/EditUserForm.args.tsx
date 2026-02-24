import { mockedUserDetail } from "@/mocks/users";
import { parseDate } from "@internationalized/date";
import { mockedPositionSummaries } from "@/mocks/positions";

const user = mockedUserDetail;

export const editUserFormArgs = {
  userId: user.id,
  userFullNameDefaultValue: user.fullName,
  userBioDefaultValue: user.bio,
  userBirthdateDefaultValue: parseDate(user.birthdate),
  userPhoneNumberDefaultValue: user.phoneNumber,
  userPublicLinkDefaultValue: user.publicLink,
  userAddressDefaultValue: user.address,
  userPositionSelectDefaultValue: user.position.id.toString(),
  userPositionSelectItems: mockedPositionSummaries,
  updateUser: () => ({ status: "success" as const }),
};
