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

const LoginScreen = () => {
  const [businessName, setBusinessName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f0f0f0",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: 40,
          borderRadius: 8,
          width: 500,
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
          Login
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

        {/* <div style={{ display: "flex", flexDirection: "column" }}> */}
        <TextInputComponent
          label="Business name"
          placeholder="Enter your name"
          borderRadius="md"
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
          labelColor={COLORS.black}
          outStyle={{ width: "100%" }} // Thêm dòng này
        />

        <TextInputComponent
          label="Password"
          labelColor={COLORS.black}
          placeholder="Password"
          borderRadius="md"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          outStyle={{ width: "100%" }} // Thêm dòng này
        />

        <div
          style={{
            display: "flex",
            justifyContent: "end",
            alignItems: "end",
            width: "100%",
            color: COLORS.black,
          }}
        >
          <TextButtonComponent> Forgot password</TextButtonComponent>
        </div>
        <div style={{ marginTop: 24 }}>
          <ButtonComponent
            label="Login"
            fullWidth
            backgroundColor={COLORS.mediumBlue}
            labelColor="#fff"
            width={"100%"}
            // textDecoration="underline"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
