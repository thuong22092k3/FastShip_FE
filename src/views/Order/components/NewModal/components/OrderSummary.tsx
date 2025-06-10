import { Box, Group, Paper, Text, Title } from "@mantine/core";

const OrderSummary = ({
  fees,
}: {
  fees: { baseFee: number; vat: number; total: number };
}) => (
  <Paper p="md" withBorder radius="md" shadow="sm">
    <Title order={5}>Chi phí đơn hàng</Title>
    <Box mt="sm">
      <Group justify="space-between">
        <Text>Chuyển phát nhanh</Text>
        <Text>{fees.baseFee.toLocaleString()} VND</Text>
      </Group>
      <Group justify="space-between">
        <Text>Phí VAT (10%)</Text>
        <Text>{fees.vat.toLocaleString()} VND</Text>
      </Group>
      <hr />
      <Group justify="space-between" mt="sm">
        <Text fw={600}>Tổng tiền</Text>
        <Text fw={600}>{fees.total.toLocaleString()} VND</Text>
      </Group>
    </Box>
  </Paper>
);

export default OrderSummary;
