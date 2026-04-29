import { twMerge } from "tailwind-merge";

type IconColor =
  | "blue"
  | "indigo"
  | "purple"
  | "pink"
  | "orange"
  | "teal"
  | "cyan"
  | "emerald";

interface IconWrapperProps {
  color: IconColor;
  children: React.ReactNode;
}

export function IconWrapper({ color = "blue", children }: IconWrapperProps) {
  return (
    <div
      className={twMerge(
        "group-pressed:scale-105 rounded-xl bg-gradient-to-br p-3 text-white transition-transform group-hover:scale-105",
        color === "blue" && "from-blue-500 to-blue-600",
        color === "indigo" && "from-indigo-500 to-indigo-600",
        color === "purple" && "from-purple-500 to-purple-600",
        color === "pink" && "from-pink-500 to-pink-600",
        color === "orange" && "from-orange-500 to-orange-600",
        color === "teal" && "from-teal-500 to-teal-600",
        color === "cyan" && "from-cyan-500 to-cyan-600",
        color === "emerald" && "from-emerald-500 to-emerald-600",
      )}
    >
      {children}
    </div>
  );
}
