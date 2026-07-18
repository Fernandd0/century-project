import { FLAG_AVATAR_BG } from "../constants";

export function ProtoAvatar({
  name,
  flag,
  size = "md",
  colorOverride,
}: {
  name: string;
  flag: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  colorOverride?: string;
}) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const bg = colorOverride ?? FLAG_AVATAR_BG[flag] ?? "bg-slate-400";
  const sz = {
    xs: "w-6 h-6 text-xs",
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-14 h-14 text-lg",
    xl: "w-20 h-20 text-2xl",
  }[size];
  return (
    <div
      className={`rounded-full ${bg} flex items-center justify-center flex-shrink-0 ${sz} font-mono font-bold text-white select-none`}
    >
      {initials}
    </div>
  );
}
