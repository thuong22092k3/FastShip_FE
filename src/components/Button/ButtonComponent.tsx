import { Button, ButtonProps } from "@mantine/core";
import { ReactNode } from "react";
import { FONT_WEIGHT, FONT_WEIGHT_MAP } from "../../constants/fonts";
import { BORDER_RADIUS, RADIUS_MAP } from "../../constants/styles";
import { COLORS } from "../../constants/colors";

interface CustomButtonProps extends Omit<ButtonProps, "color"> {
  label: string;
  fontWeight?: FONT_WEIGHT;
  fontSize?: number | string;
  paddingHorizontal?: number | string;
  paddingVertical?: number | string;
  borderRadius?: BORDER_RADIUS;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  backgroundColor?: string;
  disabledOverlay?: boolean;
  labelColor?: string;
}

const ButtonComponent = ({
  label,
  fontWeight = "normal",
  fontSize = 16,
  paddingHorizontal = 20,
  paddingVertical = 12,
  borderRadius = "md",
  iconLeft,
  iconRight,
  backgroundColor = COLORS.primary,
  disabledOverlay = true,
  disabled = false,
  labelColor = COLORS.black,
  style,
  ...props
}: CustomButtonProps) => {
  return (
    <Button
      disabled={disabled}
      style={{
        position: "relative",
        padding: `${paddingVertical}px ${paddingHorizontal}px`,
        borderRadius: RADIUS_MAP[borderRadius],
        fontSize,
        fontWeight: FONT_WEIGHT_MAP[fontWeight],
        backgroundColor,
        color: labelColor,
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        ...style,
      }}
      {...props}
    >
      {iconLeft}
      {label}
      {iconRight}
      {disabled && disabledOverlay && (
        <div
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.4)",
            position: "absolute",
            inset: 0,
            borderRadius: RADIUS_MAP[borderRadius],
            zIndex: 1,
          }}
        />
      )}
    </Button>
  );
};

export default ButtonComponent;
