import { Title, Card, Text, Button, Group, Stack, Tabs } from "@mantine/core";
import { IconUserPlus } from "@tabler/icons-react";
import { DriverTab } from "./DriverScreen";
import EmployeeTab from "./EmployeeScreen";

export default function EmployeeManagementScreen() {
  return (
    <Stack gap="md">
      <Title order={2}>Quản lý nhân viên</Title>
      <Tabs defaultValue="first">
        <Tabs.List>
          <Tabs.Tab value="employee">Nhân viên</Tabs.Tab>
          <Tabs.Tab value="driver">Tài xế</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="employee" pt="xs">
          <EmployeeTab />
        </Tabs.Panel>

        <Tabs.Panel value="driver" pt="xs">
          <DriverTab />
        </Tabs.Panel>
      </Tabs>
    </Stack>
  );
}
