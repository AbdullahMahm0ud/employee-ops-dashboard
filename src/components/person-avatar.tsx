import { avatarTone, cn, initials } from "@/lib/utils";

export function PersonAvatar({
  firstName,
  lastName,
  size = "md",
  className,
}: {
  firstName: string;
  lastName: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const sizeClass = size === "lg" ? "size-16 text-xl" : size === "sm" ? "size-9 text-xs" : "size-11 text-sm";
  return (
    <span
      className={cn(
        "grid shrink-0 place-items-center rounded-full font-display font-semibold",
        sizeClass,
        avatarTone(`${firstName}${lastName}`),
        className,
      )}
      aria-hidden="true"
    >
      {initials(firstName, lastName)}
    </span>
  );
}
