import Image from "next/image";
import { useLocale } from "next-intl";
import IntroBgDarkRu from "@/public/intro-bg-dark-ru.jpg";
import IntroBgDarkEn from "@/public/intro-bg-dark-en.jpg";
import IntroBgLightRu from "@/public/intro-bg-light-ru.jpg";
import IntroBgLightEn from "@/public/intro-bg-light-en.jpg";

export function IntroBackground() {
  const locale = useLocale();

  const IntroBgDark = locale === "ru" ? IntroBgDarkRu : IntroBgDarkEn;
  const IntroBgLight = locale === "ru" ? IntroBgLightRu : IntroBgLightEn;

  return (
    <div className="rounded-2xl rounded-b-none bg-(--surface-quanteriary) p-4 pb-0 max-sm:hidden">
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
