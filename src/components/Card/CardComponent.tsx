import { Card, Text, Title } from "@mantine/core";
import "@mantine/core/styles.css";
import { IconBox } from "@tabler/icons-react";

interface CardProps {
  title: string;
  value: string | number;
  updatedText?: string;
  icon?: React.ReactNode;
  color?: string;
}

const CardComponent = ({
  title = "Total Orders",
  value = "233",
  updatedText = "Recently updated",
  icon = <IconBox size={24} />,
  color = "blue",
}: CardProps) => {
  return (
    <Card
      shadow="sm"
      radius="lg"
      style={{
        width: "240px",
        border: "1px solid #eaeaea",
        backgroundColor: "#ffffff",
        borderRadius: "16px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          justifyContent: "space-around",
        }}
      >
        {icon}
        <Text size="sm" c="dimmed">
          {title}
        </Text>
      </div>

      <Title order={2} mt="sm" mb="xs" c={color}>
        {value}
      </Title>
    </Card>
  );
};

export default CardComponent;
