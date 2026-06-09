import Image from "next/image";
import { useLocale } from "next-intl";
import IntroDarkRu from "@/public/intro-dark-ru.jpg";
import IntroDarkEn from "@/public/intro-dark-en.jpg";
import IntroLightRu from "@/public/intro-light-ru.jpg";
import IntroLightEn from "@/public/intro-light-en.jpg";

export function IntroBackground() {
  const locale = useLocale();

  return (
    <div className="max-w-[960px] overflow-hidden rounded-2xl rounded-b-none border border-b-0 border-(--border-primary) max-sm:hidden">
      <Image
        src={locale === "en" ? IntroDarkEn : IntroDarkRu}
        alt=""
        quality={100}
        priority
        className="not-dark:hidden"
      />
      <Image
        src={locale === "en" ? IntroLightEn : IntroLightRu}
        alt=""
        quality={100}
        priority
        className="dark:hidden"
      />
    </div>
  );
}
