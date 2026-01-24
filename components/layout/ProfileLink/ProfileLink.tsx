"use client";

import Image from "next/image";
import { tv } from "tailwind-variants";
import { Link } from "react-aria-components";
import { focusRing } from "@/components/ui/styles";

const styles = tv({
  extend: focusRing,
  base: "flex items-center gap-2.5",
});

export const ProfileLink = () => {
  return (
    <Link href="/profile" className={styles}>
      <div className="h-8 w-8 overflow-hidden rounded-full bg-gray-300">
        <Image src="/man.jpg" alt="user avatar" width={32} height={32} />
      </div>
      <span className="font-bold text-black max-md:text-sm md:text-base dark:text-white">
        Adam Smith
      </span>
    </Link>
  );
};
