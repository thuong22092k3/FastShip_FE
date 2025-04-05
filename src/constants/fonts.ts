export type FONT_WEIGHT =
  | "normal"
  | "medium"
  | "semibold"
  | "bold"
  | "extraMedium";

export const FONT_WEIGHT_MAP: Record<FONT_WEIGHT, number> = {
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extraMedium: 550,
};
