import { Group, Title, Text, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

interface CustomHeaderProps {
  title?: string;
}

const CustomHeader = ({ title }: CustomHeaderProps) => {
  return (
    <Group
      justify="space-between"
      style={{ height: "100%", padding: "0 16px" }}
    >
      <Group>
        <Title order={4}>{title}</Title>
        <Text size="sm" color="dimmed">
          16 of 100 entries
        </Text>
      </Group>

      <TextInput
        placeholder="Search"
        leftSection={<IconSearch size={16} />}
        style={{ width: 300 }}
      />
    </Group>
  );
};

export default CustomHeader;
