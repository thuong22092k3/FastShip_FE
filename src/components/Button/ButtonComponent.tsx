import { Button, ButtonProps } from "@mantine/core";
import { ReactNode } from "react";
import { FONT_WEIGHT } from "../../constants/fonts";
import { BORDER_RADIUS, RADIUS_MAP } from "../../constants/styles";
import { COLORS } from "../../constants/colors";

interface CustomButtonProps extends Omit<ButtonProps, "color"> {
  label: string;
  fontWeight?: keyof typeof FONT_WEIGHT;
  fontSize?: number | string;
  paddingHorizontal?: number | string;
  paddingVertical?: number | string;
  borderRadius?: BORDER_RADIUS;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  backgroundColor?: string;
  disabledOverlay?: boolean;
  labelColor?: string;
  borderWidth?: number;
  borderColor?: string;
  width?: number | string;
  fullWidth?: boolean;
  textAlign?: "left" | "center" | "right";
  onClick?: () => void;
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
  width,
  fullWidth = false,
  textAlign = "center", // Giá trị mặc định cho textAlign
  style,
  ...props
}: CustomButtonProps) => {
  return (
    <Button
      disabled={disabled}
      fullWidth={fullWidth}
      style={{
        position: "relative",
        padding: `${paddingVertical}px ${paddingHorizontal}px`,
        borderRadius: RADIUS_MAP[borderRadius],
        borderWidth: 0,
        fontSize,
        fontWeight: FONT_WEIGHT[fontWeight],
        backgroundColor,
        color: labelColor,
        display: "flex",
        alignItems: "center",
        justifyContent:
          textAlign === "left"
            ? "flex-start"
            : textAlign === "right"
            ? "flex-end"
            : "center",
        gap: "0.5rem",
        width: fullWidth ? "100%" : width,
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
