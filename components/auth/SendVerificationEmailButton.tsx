import { Button } from "../ui";
import { Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import { authClient } from "@/lib/auth-client";

export function SendVerificationEmailButton({
  email,
  setHasError,
}: {
  email: string;
  setHasError: (hasError: boolean) => void;
}) {
  const t = useTranslations("auth.SendVerificationEmailButton");

  const handlePress = () => {
    setHasError(false);

    authClient.sendVerificationEmail(
      {
        email,
      },
      {
        onError: () => {
          setHasError(true);
        },
      },
    );
  };

  return (
    <Button
      variant="outlined"
      className="justify-center py-4"
      onPress={handlePress}
      iconLeft={<Mail size={18} strokeWidth={1.5} absoluteStrokeWidth />}
      label={t("label")}
      size="medium"
    />
  );
}
