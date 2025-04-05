export type BORDER_RADIUS = "sm" | "md" | "lg" | "xl" | "full";

export const RADIUS_MAP: Record<BORDER_RADIUS, number> = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
};
