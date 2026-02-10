import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "default" | "success" | "warning" | "info" | "danger";
  className?: string;
}

export function Badge({
  children,
  variant = "default",
  className,
}: BadgeProps) {
  const variants: Record<string, string> = {
    default:
      "bg-gray-100 text-gray-800 border-gray-200",
    success:
      "bg-green-100 text-green-700 border-green-200",
    warning:
      "bg-yellow-100 text-yellow-800 border-yellow-200",
    info:
      "bg-blue-100 text-blue-700 border-blue-200",
    danger:
      "bg-red-100 text-red-700 border-red-200",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize whitespace-nowrap",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
