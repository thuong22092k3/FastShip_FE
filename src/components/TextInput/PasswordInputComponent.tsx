import { PasswordInput } from "@mantine/core";
import { useState, KeyboardEvent } from "react";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { FONT_WEIGHT } from "../../constants/fonts";
import { RADIUS_MAP } from "../../constants/styles";
import { COLORS } from "../../constants/colors";
import { CustomInputProps } from "./InputType";

const PasswordInputCustom = ({
  label,
  labelFontWeight = "normal",
  labelFontSize = 12,
  labelColor = COLORS.white,
  placeHolder = "",
  id,
  borderRadius = "sm",
  width = "100%",
  textInputColor = COLORS.black,
  borderColor = "gray",
  textInputSize = 14,
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
  ...props
}: CustomInputProps) => {
  const [visible, setVisible] = useState(false);

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
    visible,
    onVisibilityChange: () => setVisible((v) => !v),
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
      <PasswordInput
        component="input"
        rightSection={
          <div
            style={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              paddingRight: 8,
            }}
            onClick={() => setVisible(!visible)}
          >
            {visible ? <IconEyeOff size={18} /> : <IconEye size={18} />}
          </div>
        }
        {...commonProps}
      />
    </div>
  );
};

export default PasswordInputCustom;
