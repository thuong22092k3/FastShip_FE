import { Checkbox } from "@mantine/core";
import { COLORS } from "../../constants/colors";
import { BORDER_RADIUS, RADIUS_MAP } from "../../constants/styles";
import { FONT_WEIGHT_MAP } from "../../constants/fonts";

interface CheckboxComponentProps {
  size?: number | string;
  color?: string;
  isChecked: boolean;
  setIsChecked: (val: boolean) => void;
  label?: string;
  borderRadius?: BORDER_RADIUS;
  labelFontSize?: number | string;
  labelFontWeight?: keyof typeof FONT_WEIGHT_MAP;
}

const CheckboxComponent = ({
  size = "16px",
  color = COLORS.mediumBlue,
  isChecked,
  setIsChecked,
  label,
  borderRadius = "md",
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
        },
        label: {
          fontSize: labelFontSize,
          fontWeight: FONT_WEIGHT_MAP[labelFontWeight],
          color,
          marginLeft: 8,
        },
      }}
    />
  );
};

export default CheckboxComponent;
