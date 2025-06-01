export type BORDER_RADIUS = "xs" | "sm" | "md" | "lg" | "xl" | "full";

export const RADIUS_MAP: Record<BORDER_RADIUS, number> = {
  xs: 3,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
};
