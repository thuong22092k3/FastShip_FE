import { Card, Text, Title } from "@mantine/core";
import { IconBox } from "@tabler/icons-react";

interface OrderStatsCardProps {
  title: string;
  value: string | number;
  updatedText?: string;
  icon?: React.ReactNode;
}

const OrderStatsCard = ({
  title = "Total Orders",
  value = "233",
  updatedText = "Recently updated",
  icon = <IconBox size={24} />,
}: OrderStatsCardProps) => {
  return (
    <Card
      shadow="sm"
      radius="lg"
      p="xl"
      style={{
        width: "240px",
        border: "1px solid #eaeaea",
        backgroundColor: "#ffffff",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        {icon}
        <Text size="sm" color="dimmed">
          {title}
        </Text>
      </div>

      <Title order={2} mt="sm" mb="xs">
        {value}
      </Title>
    </Card>
  );
};

export default OrderStatsCard;
