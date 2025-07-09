import { Flex } from "@mantine/core";
import "@mantine/core/styles.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../../api/service/AuthService";
import { isNhanVien, isTaiXe } from "../../api/type/EmployeeType";
import ButtonComponent from "../../components/Button/ButtonComponent";
import TextComponent from "../../components/Text/TextComponent";
import TextButtonComponent from "../../components/TextButton/TextButtonComponent";
import TextInputComponent from "../../components/TextInput/TextInputComponent";
import { COLORS } from "../../constants/colors";
import { NAV_LINK } from "../../routes/components/NAV_LINK";
import { RootState } from "../../state_management/reducers/rootReducer";
import {
  loginFailure,
  loginStart,
  loginSuccess,
} from "../../state_management/slices/authSlice";
const LoginScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(
    (state: RootState) => state.authSlice.isAuthenticated
  );

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
      console.log("response user:", response);

      let DiaDiemId: string | undefined = undefined;

      if (isNhanVien(response) || isTaiXe(response)) {
        DiaDiemId = response.DiaDiemId;
      }

      const authUser = {
        id: response.id,
        username: response.UserName,
        fullName: response.HoTen,
        email: response.Email,
        role: response.role,
        DiaDiemId,
      };

      dispatch(loginSuccess(authUser));
      if (authUser.role === "Admin") {
        navigate(NAV_LINK.STATISTICS);
      } else {
        navigate(NAV_LINK.ORDER_MANAGEMENT);
      }
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

  // const handleLogin = async () => {
  //   navigate(NAV_LINK.STATISTICS);
  // };
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
        padding: "40px 100px",
        borderRadius: 8,
        minWidth: 686,
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
          color: "#000",
          fontWeight: 400,
          fontSize: 20,
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
        labelColor={COLORS.black}
        labelFontSize={16}
      />

      <TextInputComponent
        label="Password"
        placeholder="Enter password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        width="100%"
        mb="md"
        labelColor={COLORS.black}
        labelFontSize={16}
      />

      {error && (
        <TextComponent style={{ color: "red", marginBottom: 16 }}>
          {error}
        </TextComponent>
      )}

      <Flex justify="flex-end" w="100%" mb="xl">
        <TextButtonComponent onClick={() => navigate(NAV_LINK.FORGOTPASSWORD)}>
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
    // </div>
  );
};

export default LoginScreen;
