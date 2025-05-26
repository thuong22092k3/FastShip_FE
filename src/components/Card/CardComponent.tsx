import { Card, Text, Title } from "@mantine/core";
import { IconBox } from "@tabler/icons-react";
import "@mantine/core/styles.css";
interface CardProps {
  title: string;
  value: string | number;
  updatedText?: string;
  icon?: React.ReactNode;
}

const CardComponent = ({
  title = "Total Orders",
  value = "233",
  updatedText = "Recently updated",
  icon = <IconBox size={24} />,
}: CardProps) => {
  return (
    <Card
      shadow="sm"
      radius="lg"
      p="xl"
      style={{
        width: "240px",
        border: "1px solid #eaeaea",
        backgroundColor: "#ffffff",
        borderRadius: "16px",
        padding: "15px",
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

export default CardComponent;
