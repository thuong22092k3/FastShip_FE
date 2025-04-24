// EmployeeManagementScreen.tsx
import { Title, Tabs, Stack } from "@mantine/core";
import DriverScreen from "./DriverScreen";
import EmployeeScreen from "./EmployeeScreen";

export default function EmployeeManagementScreen() {
  return (
    <Stack gap="md">
      <Title order={2}>Quản lý nhân viên</Title>
      <Tabs defaultValue="employee">
        <Tabs.List>
          <Tabs.Tab value="employee">Nhân viên</Tabs.Tab>
          <Tabs.Tab value="driver">Tài xế</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="employee" pt="xs">
          <EmployeeScreen />
        </Tabs.Panel>

        <Tabs.Panel value="driver" pt="xs">
          <DriverScreen />
        </Tabs.Panel>
      </Tabs>
    </Stack>
  );
}
