import { Button, ButtonLink } from "@/ui/Button";
import { ActionState } from "@/lib/actions/types";
import { GetStartedAction } from "@/site/common/GetStartedAction";

interface AppHeaderCtaButtonProps {
  isGuest: boolean;
  isEmailVerified: boolean;
  signOut: () => Promise<ActionState>;
}

export function AppHeaderCtaButton({
  isGuest,
  isEmailVerified,
  signOut,
}: AppHeaderCtaButtonProps) {
  return (
    <GetStartedAction
      isGuest={isGuest}
      isEmailVerified={isEmailVerified}
      signOut={signOut}
      renderButton={({ isPending, handlePress, label }) => (
        <Button
          size="medium"
          variant="accent"
          isPending={isPending}
          label={label}
          onPress={handlePress}
          className="rounded-lg py-2 max-md:hidden"
        />
      )}
      renderLink={({ href, label }) => (
        <ButtonLink
          href={href}
          variant="accent"
          label={label}
          className="rounded-lg py-2 max-md:hidden"
        />
      )}
    />
  );
}
