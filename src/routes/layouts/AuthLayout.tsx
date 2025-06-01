import { Box } from "@mantine/core";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100%",
        backgroundColor: "#f0f0f0",
      }}
    >
      {/* <Box
        style={{
          borderRadius: "16px",
          padding: "40px",
          width: "100%",
          maxWidth: "400px",
        }}
      > */}
      {children}
      {/* </Box> */}
    </Box>
  );
}
