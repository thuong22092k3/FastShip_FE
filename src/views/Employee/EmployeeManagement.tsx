import { Title, Card, Text, Button, Group, Stack } from "@mantine/core";
import { IconUserPlus } from "@tabler/icons-react";

export default function EmployeeManagementScreen() {
  return (
    <Stack gap="md">
      <Group justify="space-between">
        <Title order={2}>Quản lý nhân viên</Title>
        <Button leftSection={<IconUserPlus />} variant="filled" color="blue">
          Thêm nhân viên
        </Button>
      </Group>

      <Card withBorder shadow="sm" radius="md" p="md">
        <Text>Danh sách nhân viên sẽ được hiển thị tại đây.</Text>
        <Text c="dimmed" size="sm">
          (Chức năng xem, sửa, xóa sẽ được cập nhật sau)
        </Text>
      </Card>
    </Stack>
  );
}
