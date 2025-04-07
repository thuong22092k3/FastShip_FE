import { Input } from "@mantine/core";
import { KeyboardEvent } from "react";
import { FONT_WEIGHT } from "../../constants/fonts";
import { RADIUS_MAP } from "../../constants/styles";
import { COLORS } from "../../constants/colors";
import { CustomInputProps } from "./InputType";

const TextInputCustom = ({
  label,
  labelFontWeight = "normal",
  labelFontSize = 12,
  labelColor = COLORS.white,
  placeHolder = "",
  id,
  borderRadius = "sm",
  width = "100%",
  textInputColor = COLORS.black,
  borderColor = COLORS.gray,
  textInputSize = 14,
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
}: CustomInputProps) => {
  const commonProps = {
    id,
    placeholder: placeHolder,
    value,
    readOnly,
    onClick,
    onChange: (e: any) => setValue?.(e.target.value),
    onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") enterAction();
    },
    icon: iconLeft,
    disabled,
    radius: RADIUS_MAP[borderRadius],
    styles: {
      input: {
        fontSize: textInputSize,
        color: textInputColor,
        padding: "8px 12px",
        border: `1px solid ${borderColor}`,
        borderRadius: RADIUS_MAP[borderRadius],
        "&:focus-within": {
          borderColor: COLORS.mediumBlue,
          boxShadow: `0 0 0 1px ${COLORS.mediumBlue}`,
        },
      },
      // wrapper: {
      //   border: `1px solid ${borderColor}`,
      //   borderRadius: RADIUS_MAP[borderRadius],
      //   "&:focus-within": {
      //     borderColor: COLORS.mediumBlue,
      //     boxShadow: `0 0 0 1px ${COLORS.mediumBlue}`,
      //   },
      // },
    },
    ...(register && registerName
      ? register(registerName, {
          required,
          pattern,
          minLength,
          min,
        })
      : {}),
    ...props,
  };

  return (
    <div style={{ width, ...outStyle }}>
      {label && (
        <label
          htmlFor={id}
          style={{
            display: "block",
            marginBottom: 5,
            marginTop: 15,
            fontWeight: FONT_WEIGHT.normal,
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
        type="text"
        rightSection={
          <div
            style={{
              display: "flex",
              alignItems: "center",
              cursor: icon ? "pointer" : "default",
            }}
            onClick={onIconClick}
          >
            {rightContent || icon}
          </div>
        }
        {...commonProps}
      />
    </div>
  );
};

export default TextInputCustom;
