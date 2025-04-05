import { TextInput, TextInputProps, Input, InputWrapper } from "@mantine/core";
import { ReactNode, KeyboardEvent } from "react";
import { FONT_WEIGHT, FONT_WEIGHT_MAP } from "../../constants/fonts";
import { BORDER_RADIUS, RADIUS_MAP } from "../../constants/styles";
import { COLORS } from "../../constants/colors";

interface CustomTextInputProps extends Omit<TextInputProps, "size"> {
  label?: string;
  labelFontWeight?: FONT_WEIGHT;
  labelFontSize?: number | string;
  labelColor?: string;
  placeHolder?: string;
  id?: string;
  inputType?: string;
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
}

const TextInputComponent = ({
  label,
  labelFontWeight = "normal",
  labelFontSize = 12,
  labelColor = COLORS.white,
  placeHolder = "",
  id,
  inputType = "text",
  borderRadius = "md",
  width = 200,
  textInputColor = COLORS.black,
  borderColor = "gray",
  textInputSize = 16,
  icon,
  onIconClick = () => {},
  required = false,
  value,
  setValue,
  iconLeft,
  style,
  outStyle,
  register,
  registerName,
  readOnly = false,
  onClick = () => {},
  enterAction = () => {},
  pattern,
  minLength,
  disabled = false,
  min,
  rightContent,
  ...props
}: CustomTextInputProps) => {
  return (
    <div style={{ width, ...outStyle }}>
      {label && (
        <label
          htmlFor={id}
          style={{
            display: "block",
            marginBottom: 6,
            fontWeight: FONT_WEIGHT_MAP[labelFontWeight],
            fontSize: labelFontSize,
            color: labelColor,
          }}
        >
          {label}
          {required && <span style={{ color: "red" }}> *</span>}
        </label>
      )}
      <Input
        component="input"
        type={inputType}
        id={id}
        placeholder={placeHolder}
        value={value}
        readOnly={readOnly}
        onClick={onClick}
        onChange={(e) => setValue?.(e.target.value)}
        onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
          if (e.key === "Enter") {
            enterAction();
          }
        }}
        icon={iconLeft}
        disabled={disabled}
        radius={RADIUS_MAP[borderRadius]}
        style={{
          fontSize: textInputSize,
          color: textInputColor,
          borderColor,
          borderWidth: 1,
          borderStyle: "solid",
          padding: "8px 12px",
          ...style,
        }}
        rightSection={
          rightContent ||
          (icon && (
            <div onClick={onIconClick} style={{ cursor: "pointer" }}>
              {icon}
            </div>
          ))
        }
        {...(register && registerName
          ? register(registerName, {
              required,
              pattern,
              minLength,
              min,
            })
          : {})}
        {...props}
      />
    </div>
  );
};

export default TextInputComponent;
