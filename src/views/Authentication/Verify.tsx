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

const Verifyscreen = () => {
  const [businessName, setBusinessName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();
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
          paddingTop: 40,
          paddingBottom: 40,
          paddingLeft: 100,
          paddingRight: 100,
          borderRadius: 8,
          width: 400,
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
            lineHeight: 1.6,
          }}
        >
          Verification
        </TextComponent>

        <TextInputComponent
          label="Enter OTP"
          placeholder="OTP"
          borderRadius="sm"
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
          width="50%"
          labelFontSize={14}
          labelColor={COLORS.gray}
          labelTextAlign="center"
        />

        <div
          style={{
            display: "flex",
            justifyContent: "end",
            alignItems: "end",
            width: "100%",
            color: COLORS.black,
          }}
        ></div>
        <div style={{ marginTop: 50, width: "100%" }}>
          <ButtonComponent
            label="Continue"
            fullWidth
            backgroundColor={COLORS.mediumBlue}
            labelColor="#fff"
            onClick={() => {
              navigate(NAV_LINK.CHANGEPASSWORD);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Verifyscreen;
