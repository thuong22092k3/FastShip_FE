import { Checkbox } from "@mantine/core";
import { COLORS } from "../../constants/colors";
import { BORDER_RADIUS, RADIUS_MAP } from "../../constants/styles";
import { FONT_WEIGHT } from "../../constants/fonts";
import "@mantine/core/styles.css";

interface CheckboxComponentProps {
  size?: number | string;
  color?: string;
  isChecked: boolean;
  setIsChecked: (val: boolean) => void;
  label?: React.ReactNode;
  borderRadius?: BORDER_RADIUS;
  labelFontSize?: number | string;
  labelFontWeight?: keyof typeof FONT_WEIGHT;
}

const CheckboxComponent = ({
  size = "18px",
  color = COLORS.mediumBlue,
  isChecked,
  setIsChecked,
  label,
  borderRadius = "xs",
  labelFontSize = 14,
  labelFontWeight = "normal",
}: CheckboxComponentProps) => {
  return (
    <Checkbox
      checked={isChecked}
      onChange={(event) => setIsChecked(event.currentTarget.checked)}
      label={label}
      styles={{
        input: {
          width: size,
          height: size,
          borderRadius: RADIUS_MAP[borderRadius],
          borderColor: color,
          backgroundColor: isChecked ? color : "transparent",
          "&:checked": {
            backgroundImage: "none",
            backgroundColor: color,
          },
        },
        label: {
          fontSize: labelFontSize,
          fontWeight: FONT_WEIGHT.medium,
          color: COLORS.black,
          marginLeft: 8,
        },
      }}
    />
  );
};

export default CheckboxComponent;
