// src/pages/HomePage.tsx
import { Container, Title, Text } from "@mantine/core";

export default function HomePageScreen() {
  return (
    <Container size="lg" py="md">
      <Title order={2} mb="md">
        Trang chủ
      </Title>
      <Text>Chào mừng bạn đến với hệ thống quản lý vận tải</Text>
    </Container>
  );
}
