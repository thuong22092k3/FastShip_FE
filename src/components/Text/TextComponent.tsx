import { ReactNode } from "react";
import { FONT_WEIGHT } from "../../constants/fonts";
import { COLORS } from "../../constants/colors";
import "@mantine/core/styles.css";
interface TextComponentProps {
  fontWeight?: keyof typeof FONT_WEIGHT;
  fontSize?: number | string;
  color?: string;
  letterSpacing?: number | string;
  style?: React.CSSProperties;
  children: ReactNode;
}

const TextComponent = ({
  fontWeight = "normal",
  fontSize = 15,
  color = COLORS.black,
  letterSpacing,
  style,
  children,
}: TextComponentProps) => {
  return (
    <span
      style={{
        fontWeight: FONT_WEIGHT.medium,
        fontSize,
        color,
        letterSpacing,
        ...style,
      }}
    >
      {children}
    </span>
  );
};

export default TextComponent;
