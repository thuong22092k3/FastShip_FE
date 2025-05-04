// import { useState } from "react";
// import TextInputComponent from "../../components/TextInput/TextInputComponent";
// import CheckboxComponent from "../../components/CheckBox/CheckBoxComponent";
// import ButtonComponent from "../../components/Button/ButtonComponent";
// import TextComponent from "../../components/Text/TextComponent";
// import TextButtonComponent from "../../components/TextButton/TextButtonComponent";
// import { COLORS } from "../../constants/colors";
// import { BORDER_RADIUS, RADIUS_MAP } from "../../constants/styles";
// import { FONT_WEIGHT } from "../../constants/fonts";
// import { Flex } from "@mantine/core";
// import { useNavigate } from "react-router-dom";
// import { NAV_LINK } from "../../routes/components/NAV_LINK";

// const LoginScreen = () => {
//   const [businessName, setBusinessName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [isChecked, setIsChecked] = useState(false);
//   const navigate = useNavigate();
//   return (
//     <div
//       style={{
//         minHeight: "100vh",
//         backgroundColor: "#f0f0f0",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         padding: 20,
//       }}
//     >
//       <div
//         style={{
//           backgroundColor: "#fff",
//           paddingTop: 40,
//           paddingBottom: 40,
//           paddingLeft: 100,
//           paddingRight: 100,
//           borderRadius: 8,
//           width: 400,
//           maxWidth: "100%",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           flexDirection: "column",
//         }}
//       >
//         <div style={{ textAlign: "center" }}>
//           <img
//             src={require("../../assets/images/Logorm.png")}
//             alt="image"
//             style={{ height: 130, objectFit: "contain" }}
//           />
//         </div>

//         <TextComponent
//           style={{
//             textAlign: "center",
//             marginBottom: 8,
//             fontSize: 36,
//             fontWeight: 500,
//           }}
//         >
//           Login
//         </TextComponent>
//         <TextComponent
//           style={{
//             textAlign: "center",
//             marginBottom: 24,
//             color: "#000",
//             fontWeight: 400,
//           }}
//         >
//           Welcome back!
//         </TextComponent>

//         {/* <div style={{ display: "flex", flexDirection: "column" }}> */}
//         <TextInputComponent
//           label="Username or Email"
//           placeholder="Username or Email"
//           borderRadius="sm"
//           value={businessName}
//           onChange={(e) => setBusinessName(e.target.value)}
//           labelFontSize={14}
//           labelColor={COLORS.gray}
//           width="100%"
//         />

//         <TextInputComponent
//           label="Password"
//           labelFontSize={14}
//           labelColor={COLORS.gray}
//           placeholder="Password"
//           borderRadius="sm"
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           width="100%"
//         />

//         <div
//           style={{
//             display: "flex",
//             justifyContent: "end",
//             alignItems: "end",
//             width: "100%",
//             color: COLORS.black,
//           }}
//         >
//           <TextButtonComponent
//             style={{ marginTop: 8 }}
//             onClick={() => {
//               navigate(NAV_LINK.FORGOTPASSWORD);
//             }}
//           >
//             Forgot password
//           </TextButtonComponent>
//         </div>
//         <div style={{ marginTop: 50, width: "100%" }}>
//           <ButtonComponent
//             label="Login"
//             fullWidth
//             backgroundColor={COLORS.mediumBlue}
//             labelColor="#fff"
//             onClick={() => {
//               navigate(NAV_LINK.STATISTICS);
//             }}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginScreen;
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Flex } from "@mantine/core";
import TextInputComponent from "../../components/TextInput/TextInputComponent";
import ButtonComponent from "../../components/Button/ButtonComponent";
import TextComponent from "../../components/Text/TextComponent";
import TextButtonComponent from "../../components/TextButton/TextButtonComponent";
import { COLORS } from "../../constants/colors";
import { NAV_LINK } from "../../routes/components/NAV_LINK";
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "../../state_management/slices/authSlice";
import { AuthService } from "../../api/service/AuthService";

const LoginScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!username || !password) {
      setError("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    setLoading(true);
    setError("");
    dispatch(loginStart());

    try {
      const response = await AuthService.login(username, password);

      const authUser = {
        id: response.AdminId,
        username: response.UserName,
        fullName: response.HoTen,
      };
      navigate(NAV_LINK.STATISTICS);
    } catch (err: unknown) {
      let errorMessage = "Đăng nhập thất bại";
      if (err instanceof Error) {
        errorMessage = err.message || errorMessage;
      }
      setError(errorMessage);
      dispatch(loginFailure(errorMessage));
    } finally {
      setLoading(false);
    }
  };

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
          padding: "40px 100px",
          borderRadius: 8,
          width: 400,
          maxWidth: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <img
            src={require("../../assets/images/Logorm.png")}
            alt="logo"
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
          Admin Login
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

        <TextInputComponent
          label="Username"
          placeholder="Enter admin username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          width="100%"
          mb="md"
        />

        <TextInputComponent
          label="Password"
          placeholder="Enter password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          width="100%"
          mb="md"
        />

        {error && (
          <TextComponent style={{ color: "red", marginBottom: 16 }}>
            {error}
          </TextComponent>
        )}

        <Flex justify="flex-end" w="100%" mb="xl">
          <TextButtonComponent
            onClick={() => navigate(NAV_LINK.FORGOTPASSWORD)}
          >
            Forgot password?
          </TextButtonComponent>
        </Flex>

        <ButtonComponent
          label={loading ? "Logging in..." : "Login"}
          fullWidth
          backgroundColor={COLORS.mediumBlue}
          labelColor="#fff"
          onClick={handleLogin}
          disabled={loading}
        />
      </div>
    </div>
  );
};

export default LoginScreen;
