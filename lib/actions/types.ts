export type SignInState = {
  error: {
    status: string | number;
    message?: string;
  } | null;
  payload: FormData | null;
};

export type SignInAction = (
  initialState: SignInState,
  formData: FormData,
) => Promise<SignInState>;

export type SignUpState = {
  error: {
    status: string | number;
    message?: string;
  } | null;
  payload: FormData | null;
};

export type SignUpAction = (
  initialState: SignUpState,
  formData: FormData,
) => Promise<SignUpState>;

export type ForgetPasswordState = {
  error: {
    status: string | number;
    message?: string;
  } | null;
  payload: FormData | null;
};

export type ForgetPasswordAction = (
  initialState: ForgetPasswordState,
  formData: FormData,
) => Promise<ForgetPasswordState>;

export type ResetPasswordState = {
  error: {
    status: string | number;
    message?: string;
  } | null;
};

export type ResetPasswordAction = (
  initialState: ResetPasswordState,
  formData: FormData,
) => Promise<ResetPasswordState>;

export type DeleteProjectActionState = {
  status: "error" | "success" | null;
  message: string | null;
};

export interface DeleteProjectPayload {
  id: number;
  currentPage: number;
  isLastItemOnPage: boolean;
}
