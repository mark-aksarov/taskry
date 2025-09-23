import { focusRing } from "@/components/ui/styles";
import Image from "next/image";
import { Link } from "react-aria-components";
import { tv } from "tailwind-variants";

const styles = tv({
  extend: focusRing,
  base: "flex shrink-0 items-center gap-2.5",
});

export const ProfileLink = () => {
  return (
    <Link href="/profile" className={styles}>
      <Image
        src="/man.jpg"
        alt="user avatar"
        width={32}
        height={32}
        className="rounded-full"
      />
      <span className="font-semibold text-black max-md:text-xs md:text-lg dark:text-white">
        Adam Smith
      </span>
    </Link>
  );
};
