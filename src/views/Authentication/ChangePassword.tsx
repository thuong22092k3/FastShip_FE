import { useState } from "react";
import TextInputComponent from "../../components/TextInput/TextInputComponent";
import CheckboxComponent from "../../components/CheckBox/CheckBoxComponent";
import ButtonComponent from "../../components/Button/ButtonComponent";
import TextComponent from "../../components/Text/TextComponent";
import TextButtonComponent from "../../components/TextButton/TextButtonComponent";
import { COLORS } from "../../constants/colors";
import { BORDER_RADIUS, RADIUS_MAP } from "../../constants/styles";
import { FONT_WEIGHT } from "../../constants/fonts";
import { Flex } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { NAV_LINK } from "../../routes/components/NAV_LINK";
import "@mantine/core/styles.css";
const ChangePasswordScreen = () => {
  const [businessName, setBusinessName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();
  return (
    // <div
    //   style={{
    //     minHeight: "100vh",
    //     backgroundColor: "#f0f0f0",
    //     display: "flex",
    //     justifyContent: "center",
    //     alignItems: "center",
    //     padding: 20,
    //   }}
    // >
    <div
      style={{
        backgroundColor: "#fff",
        paddingTop: 40,
        paddingBottom: 40,
        paddingLeft: 100,
        paddingRight: 100,
        borderRadius: 8,
        minWidth: 686,
        maxWidth: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <img
          src={require("../../assets/images/Logorm.png")}
          alt="image"
          style={{ height: 130, objectFit: "contain" }}
        />
      </div>

      <TextComponent
        style={{
          textAlign: "center",
          marginBottom: 8,
          fontSize: 36,
          fontWeight: 500,
        }}
      >
        Create a new password
      </TextComponent>
      <TextComponent
        style={{
          textAlign: "center",
          marginBottom: 24,
          color: "#000",
          fontWeight: 400,
        }}
      >
        Welcome back!
      </TextComponent>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          gap: 10,
        }}
      >
        <TextInputComponent
          label="New password"
          placeholder="Enter new password"
          borderRadius="sm"
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
          labelFontSize={14}
          labelColor={COLORS.gray}
          width="100%"
        />

        <TextInputComponent
          label="Confirm password"
          labelFontSize={14}
          labelColor={COLORS.gray}
          placeholder="Enter confirm password"
          borderRadius="sm"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          width="100%"
        />
      </div>
      <div style={{ marginTop: 50, width: "100%" }}>
        <ButtonComponent
          label="Confirm"
          fullWidth
          backgroundColor={COLORS.mediumBlue}
          labelColor="#fff"
          onClick={() => {
            navigate(NAV_LINK.STATISTICS);
          }}
        />
      </div>
    </div>
    // </div>
  );
};

export default ChangePasswordScreen;
