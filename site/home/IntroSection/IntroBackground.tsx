import Image from "next/image";
import IntroBgDark from "@/public/intro-bg-dark.jpg";
import IntroBgLight from "@/public/intro-bg-light.jpg";

export function IntroBackground() {
  return (
    <div className="rounded-2xl rounded-b-none bg-(--surface-quanteriary) p-4 pb-0 max-md:hidden">
      <Image
        src={IntroBgLight}
        alt=""
        className="block rounded-lg rounded-b-none dark:hidden"
        priority
      />

      <Image
        src={IntroBgDark}
        alt=""
        className="hidden rounded-lg rounded-b-none dark:block"
        priority
      />
    </div>
  );
}
