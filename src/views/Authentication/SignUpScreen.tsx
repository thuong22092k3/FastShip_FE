import { useState } from "react";
import TextInputComponent from "../../components/TextInput/TextInputComponent";
import CheckboxComponent from "../../components/CheckBox/CheckBoxComponent";
import TextButtonComponent from "../../components/TextButton/TextButtonComponent";
import TextComponent from "../../components/Text/TextComponent";
import { COLORS } from "../../constants/colors";

const SignUpScreen = () => {
  const [businessName, setBusinessName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f4f4f4",
      }}
    >
      <div
        style={{
          width: 400,
          backgroundColor: "#fff",
          padding: "30px",
          borderRadius: "8px",
          boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
        }}
      >
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <img src="assets\images\Logorm.png" alt="FastShip Logo" width={100} />
        </div>

        {/* Title */}
        <TextComponent
          fontSize={24}
          fontWeight="bold"
          style={{ textAlign: "center" }}
        >
          Create an account
        </TextComponent>

        {/* Subtitle */}
        <TextComponent
          fontSize={14}
          color={COLORS.gray}
          style={{ textAlign: "center", marginBottom: 20 }}
        >
          Lorem ipsum dolor sit amet consectetur. Sapien odio rhoncus amet
          dignissim.
        </TextComponent>

        {/* Form Fields */}
        <TextInputComponent
          label="Business name"
          placeHolder="Enter your business name"
          value={businessName}
          setValue={setBusinessName}
        />
        <TextInputComponent
          label="Email"
          placeHolder="Email"
          value={email}
          setValue={setEmail}
        />
        <TextInputComponent
          label="Phone"
          placeHolder="Phone number"
          value={phone}
          setValue={setPhone}
        />
        <TextInputComponent
          label="Password"
          placeHolder="Password"
          inputType="password"
          value={password}
          setValue={setPassword}
        />
        <TextInputComponent
          label="Confirm Password"
          placeHolder="Confirm Password"
          inputType="password"
          value={confirmPassword}
          setValue={setConfirmPassword}
        />

        {/* Terms & Conditions */}
        <div
          style={{ display: "flex", alignItems: "center", margin: "10px 0" }}
        >
          <CheckboxComponent
            size="16px"
            color={COLORS.mediumBlue}
            isChecked={isChecked}
            setIsChecked={setIsChecked}
          />
          <TextComponent
            fontSize={12}
            color={COLORS.black}
            style={{ marginLeft: 8 }}
          >
            I agree to the{" "}
            <TextButtonComponent color={COLORS.mediumBlue} underlineOnHover>
              terms and conditions
            </TextButtonComponent>{" "}
            and{" "}
            <TextButtonComponent color={COLORS.mediumBlue} underlineOnHover>
              privacy policy
            </TextButtonComponent>
          </TextComponent>
        </div>

        {/* Sign Up Button */}
        <button
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: COLORS.mediumBlue,
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            fontSize: 16,
            cursor: "pointer",
            marginBottom: 10,
          }}
        >
          Sign up
        </button>

        {/* Divider */}
        <TextComponent
          fontSize={14}
          color={COLORS.gray}
          style={{ textAlign: "center", marginBottom: 10 }}
        >
          Or
        </TextComponent>

        {/* Social Sign Up Buttons */}
        <button style={socialButtonStyle}>Sign up with Google</button>
        <button style={socialButtonStyle}>Sign up with Apple</button>

        {/* Login Link */}
        <TextComponent
          fontSize={14}
          color={COLORS.black}
          style={{ textAlign: "center", marginTop: 10 }}
        >
          Already have an account?{" "}
          <TextButtonComponent color={COLORS.mediumBlue} underlineOnHover>
            Login
          </TextButtonComponent>
        </TextComponent>
      </div>
    </div>
  );
};

// Style for social sign-up buttons
const socialButtonStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px",
  border: "1px solid #ccc",
  borderRadius: "4px",
  fontSize: 14,
  cursor: "pointer",
  backgroundColor: "white",
  marginBottom: 8,
};

export default SignUpScreen;
