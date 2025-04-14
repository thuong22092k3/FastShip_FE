import { ReactNode } from "react";
import { FONT_WEIGHT } from "../../constants/fonts";
import { COLORS } from "../../constants/colors";

interface TextButtonComponentProps {
  children: ReactNode;
  fontWeight?: keyof typeof FONT_WEIGHT;
  fontSize?: number | string;
  color?: string;
  onClick?: () => void;
  disabled?: boolean;
  style?: React.CSSProperties;
  underlineOnHover?: boolean;
}

const TextButtonComponent = ({
  children,
  fontWeight = "normal",
  fontSize = 14,
  color = COLORS.black,
  onClick,
  disabled = false,
  style,
  underlineOnHover = true,
}: TextButtonComponentProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        background: "none",
        border: "none",
        padding: 0,
        margin: 4,
        cursor: disabled ? "not-allowed" : "pointer",
        fontWeight: FONT_WEIGHT.medium,
        fontSize,
        color: disabled ? "#ccc" : color,
        textDecoration: underlineOnHover ? "underline" : "none",

        ...style,
      }}
    >
      {children}
    </button>
  );
};

export default TextButtonComponent;
