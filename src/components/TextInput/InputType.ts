// inputTypes.ts
import { TextInputProps } from "@mantine/core";
import { ReactNode } from "react";
import { FONT_WEIGHT } from "../../constants/fonts";
import { BORDER_RADIUS } from "../../constants/styles";

export interface CustomInputProps extends Omit<TextInputProps, "size"> {
  label?: string;
  labelFontWeight?: keyof typeof FONT_WEIGHT;
  labelFontSize?: number | string;
  labelColor?: string;
  placeHolder?: string;
  id?: string;
  borderRadius?: BORDER_RADIUS;
  width?: number | string;
  textInputColor?: string;
  borderColor?: string;
  textInputSize?: number | string;
  icon?: ReactNode;
  iconLeft?: ReactNode;
  onIconClick?: () => void;
  required?: boolean;
  value?: any;
  setValue?: (val: any) => void;
  style?: React.CSSProperties;
  outStyle?: React.CSSProperties;
  register?: any;
  registerName?: string;
  readOnly?: boolean;
  onClick?: () => void;
  enterAction?: () => void;
  pattern?: string;
  minLength?: number;
  disabled?: boolean;
  min?: number;
  rightContent?: ReactNode;
  labelTextAlign?: "left" | "center" | "right";
  labelMargin?: {
    top?: number | string;
    bottom?: number | string;
    left?: number | string;
    right?: number | string;
  };
}
