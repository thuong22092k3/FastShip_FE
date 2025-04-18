import {
  Box,
  Button,
  Card,
  Container,
  Flex,
  Group,
  ScrollArea,
  Select,
  Text,
  TextInput,
  Title,
  Pagination,
} from "@mantine/core";
import { IconSearch, IconPlus, IconBox, IconCheck } from "@tabler/icons-react";
import { useState } from "react";
import { OrderTable } from "../../components/Table/OrderTable";
import { mockOrders } from "../../api/type/OrderType";
import CardComponent from "../../components/Card/CardComponent";
import CreateOrderModal from "./CreateOrder";

export default function OrderManagementScreen() {
  const [filter, setFilter] = useState("Tất cả");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filteredOrders = mockOrders.filter((order) => {
    const matchesSearch =
      order.NguoiGui.toLowerCase().includes(search.toLowerCase()) ||
      order.NguoiNhan.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      filter === "Tất cả" ||
      order.TrangThai.toLowerCase() === filter.toLowerCase();

    return matchesSearch && matchesStatus;
  });
  const [openCreateModal, setOpenCreateModal] = useState(false);

  return (
    <Container
      size="xl"
      py="md"
      fluid
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 16,
        padding: "16px",
      }} // Added padding here
    >
      <Title order={2}>Quản lý đơn hàng</Title>
      <Box>
        <CardComponent
          title="Total Orders"
          value="233"
          icon={<IconBox size={32} />}
        />
        <CardComponent
          title="Active Orders"
          value="233"
          icon={<IconBox size={32} />}
        />
        <CardComponent
          title="Completed Orders"
          value="233"
          icon={<IconCheck size={32} />}
        />
      </Box>
      <Flex justify="space-between" align="center" wrap="wrap" gap="sm">
        <Group>
          <TextInput
            placeholder="Tìm theo người gửi / người nhận"
            value={search}
            onChange={(e) => setSearch(e.currentTarget.value)}
            leftSection={<IconSearch size={16} />}
          />
        </Group>
        <Button onClick={() => setOpenCreateModal(true)}>Tạo đơn hàng</Button>
        <CreateOrderModal
          open={openCreateModal}
          onClose={() => setOpenCreateModal(false)}
        />
      </Flex>
      <Box style={{ flex: 1, minHeight: 300, width: 1100 }}>
        <OrderTable data={filteredOrders} />
      </Box>
      <Flex justify="end" mt="md">
        <Pagination total={1} value={page} onChange={setPage} />
      </Flex>
    </Container>
  );
}
