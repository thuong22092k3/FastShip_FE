import { useState } from "react";
import TextInputComponent from "../../components/TextInput/TextInputComponent";
import CheckboxComponent from "../../components/CheckBox/CheckBoxComponent";
import ButtonComponent from "../../components/Button/ButtonComponent";
import TextComponent from "../../components/Text/TextComponent";
import TextButtonComponent from "../../components/TextButton/TextButtonComponent";
import { COLORS } from "../../constants/colors";
import { BORDER_RADIUS, RADIUS_MAP } from "../../constants/styles";
import { FONT_WEIGHT } from "../../constants/fonts";

const SignUpScreen = () => {
  const [username, setusername] = useState("");
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
        width: "100%",
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
          width: "100%",
          maxWidth: 400,
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
          Create an account
        </TextComponent>
        <TextComponent
          style={{ textAlign: "center", marginBottom: 24, color: "#000" }}
        >
          Lorem ipsum dolor sit amet consectetur. Sapien odio rhoncus amet
          dignissim.
        </TextComponent>

        {/* <div style={{ display: "flex", flexDirection: "column" }}> */}
        <TextInputComponent
          label="Username"
          placeholder="Enter your name"
          borderRadius="sm"
          value={username}
          onChange={(e) => setusername(e.target.value)}
          labelFontSize={14}
          labelColor={COLORS.gray}
          outStyle={{ width: "100%" }}
        />

        <TextInputComponent
          label="Email"
          labelFontSize={14}
          labelColor={COLORS.gray}
          placeholder="Email"
          borderRadius="sm"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          outStyle={{ width: "100%" }}
        />

        <TextInputComponent
          label="Phone"
          labelFontSize={14}
          labelColor={COLORS.gray}
          placeholder="Phone number"
          borderRadius="sm"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          outStyle={{ width: "100%" }}
        />

        <TextInputComponent
          label="Password"
          labelFontSize={14}
          labelColor={COLORS.gray}
          placeholder="Password"
          borderRadius="sm"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          outStyle={{ width: "100%" }}
        />

        <TextInputComponent
          label="Confirm password"
          placeholder="Confirm Password"
          borderRadius="sm"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          outStyle={{ width: "100%" }}
          labelFontSize={14}
          labelColor={COLORS.gray}
        />
        {/* </div> */}

        <div style={{ display: "flex", flexDirection: "row", marginTop: 16 }}>
          <CheckboxComponent
            isChecked={isChecked}
            setIsChecked={setIsChecked}
            label={
              <span>
                I Agree to the{" "}
                <TextButtonComponent
                  onClick={() => console.log("Terms clicked")}
                >
                  terms and conditions
                </TextButtonComponent>{" "}
                and{" "}
                <TextButtonComponent
                  onClick={() => console.log("Privacy clicked")}
                >
                  privacy policy
                </TextButtonComponent>
              </span>
            }
          />
        </div>

        <div style={{ marginTop: 50, width: "100%" }}>
          <ButtonComponent
            label="Create account"
            width="100%"
            backgroundColor={COLORS.mediumBlue}
            labelColor="#fff"
            // width={"100%"}
          />
        </div>
      </div>
    </div>
  );
};

export default SignUpScreen;
