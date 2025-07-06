// src/components/Card/CardComponent.tsx
import { Group, Paper, Text, ThemeIcon } from "@mantine/core";
import { IconArrowDownRight, IconArrowUpRight } from "@tabler/icons-react";

interface CardProps {
  title: string;
  value: string;
  updatedText: string;
  icon: React.ReactNode;
  trend?: "up" | "down";
  trendValue?: string;
}

export default function CardComponent2({
  title,
  value,
  updatedText,
  icon,
  trend,
  trendValue,
}: CardProps) {
  return (
    <Paper withBorder p="md" radius="md">
      <Group justify="space-between">
        <Text size="xs" c="dimmed" fw={700}>
          {title}
        </Text>
        <ThemeIcon variant="light" color="gray" size="sm">
          {icon}
        </ThemeIcon>
      </Group>

      <Group align="flex-end" gap="xs" mt={25}>
        <Text fw={700} size="xl">
          {value}
        </Text>
        {trend && trendValue && (
          <Text
            c={trend === "up" ? "teal" : "red"}
            fw={700}
            size="sm"
            style={{ display: "flex", alignItems: "center" }}
          >
            {trend === "up" ? (
              <IconArrowUpRight size="1rem" />
            ) : (
              <IconArrowDownRight size="1rem" />
            )}
            {trendValue}%
          </Text>
        )}
      </Group>

      <Text fz="xs" c="dimmed" mt={7}>
        {updatedText}
      </Text>
    </Paper>
  );
}
