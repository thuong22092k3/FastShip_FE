import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  Center,
  Divider,
  Grid,
  Group,
  Loader,
  Modal,
  Paper,
  Stack,
  Text,
  Title,
  Tooltip,
} from "@mantine/core";
import "@mantine/core/styles.css";
import {
  IconCash,
  IconMapPin,
  IconNote,
  IconPackage,
  IconRoute,
  IconTruckDelivery,
  IconUser,
} from "@tabler/icons-react";
import { useMemo, useState } from "react";
import QRCode from "react-qr-code";
import { Order } from "../../../api/type/OrderType";
import { RouteModal } from "./RouteOptimizationModal";

interface OrderDetailModalProps {
  opened: boolean;
  onClose: () => void;
  order: Order | null;
  loading?: boolean;
}

export function OrderDetailModal({
  opened,
  onClose,
  order,
  loading = false,
}: OrderDetailModalProps) {
  const [routeModalOpen, setRouteModalOpen] = useState(false);

  const getStatusColor = (status: string) => {
    if (!status) return "gray";
    switch (status?.toLowerCase()) {
      case "đã giao":
        return "teal";
      case "đang giao":
        return "blue";
      case "chờ xử lý":
      case "chờ xác nhận":
        return "orange";
      case "đã hủy":
        return "red";
      default:
        return "gray";
    }
  };

  const qrValue = useMemo(() => {
    if (!order) return "";
    return JSON.stringify({
      orderId: order.DonHangId,
      sender: order.NguoiGui,
      receiver: order.NguoiNhan,
      phone: order.SDT,
      pickupAddress: order.DiaChiLayHang,
      deliveryAddress: order.DiaChiGiaoHang,
      status: order.TrangThai,
      fee: order.CuocPhi,
      createdAt: order.CreatedAt,
    });
  }, [order]);

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={
        <Group gap="sm">
          <IconPackage size={20} />
          <Title order={4}>Chi tiết đơn hàng</Title>
        </Group>
      }
      size="lg"
      padding="xl"
      radius="md"
    >
      {loading ? (
        <Center h={200}>
          <Loader />
        </Center>
      ) : (
        order && (
          <Stack gap="md">
            <Paper withBorder p="md" radius="md" shadow="sm">
              <Group justify="space-between" align="center">
                <Box>
                  <Text size="sm" c="dimmed">
                    Mã đơn hàng
                  </Text>
                  <Title order={3} fw={700}>
                    {order.DonHangId}
                  </Title>
                </Box>
                <Badge
                  color={getStatusColor(order.TrangThai)}
                  size="xl"
                  variant="light"
                  radius="sm"
                  px="sm"
                  leftSection={
                    <Avatar
                      color={getStatusColor(order.TrangThai)}
                      size={16}
                      mr={4}
                    ></Avatar>
                  }
                >
                  {order.TrangThai}
                </Badge>
              </Group>
            </Paper>

            <Card withBorder radius="md" shadow="sm" padding="lg">
              <Center>
                <Box p="sm" bg="white" style={{ borderRadius: 8 }}>
                  <QRCode
                    value={qrValue}
                    size={150}
                    bgColor="#ffffff"
                    fgColor="#000000"
                    level="L"
                  />
                </Box>
              </Center>
              <Text mt="sm" size="sm" c="dimmed" ta="center">
                Quét mã QR để xem thông tin đơn hàng
              </Text>
            </Card>

            <Divider
              my="xs"
              label="Thông tin đơn hàng"
              labelPosition="center"
            />

            <Grid gutter="xl">
              <Grid.Col span={{ base: 12, md: 6 }}>
                <Stack gap="sm">
                  <Paper withBorder p="md" radius="md">
                    <Group gap="xs" mb="sm">
                      <IconUser size={18} color="var(--mantine-color-blue-6)" />
                      <Text size="sm" fw={600}>
                        Thông tin người gửi/nhận
                      </Text>
                    </Group>

                    <Stack gap="xs">
                      <div>
                        <Text size="xs" c="dimmed">
                          Người gửi
                        </Text>
                        <Text fw={500}>{order.NguoiGui}</Text>
                      </div>

                      <div>
                        <Text size="xs" c="dimmed">
                          Người nhận
                        </Text>
                        <Text fw={500}>{order.NguoiNhan}</Text>
                      </div>

                      <div>
                        <Text size="xs" c="dimmed">
                          Số điện thoại
                        </Text>
                        <Text fw={500}>{order.SDT}</Text>
                      </div>
                    </Stack>
                  </Paper>

                  <Paper withBorder p="md" radius="md">
                    <Group gap="xs" mb="sm">
                      <IconTruckDelivery
                        size={18}
                        color="var(--mantine-color-blue-6)"
                      />
                      <Text size="sm" fw={600}>
                        Nhân viên phụ trách
                      </Text>
                    </Group>
                    <Text fw={500}>{order.NhanVienID || "Chưa phân công"}</Text>
                  </Paper>
                </Stack>
              </Grid.Col>

              <Grid.Col span={{ base: 12, md: 6 }}>
                <Stack gap="sm">
                  <Paper withBorder p="md" radius="md">
                    <Group gap="xs" mb="sm">
                      <IconMapPin
                        size={18}
                        color="var(--mantine-color-blue-6)"
                      />
                      <Text size="sm" fw={600}>
                        Địa chỉ giao hàng
                      </Text>
                    </Group>

                    <Stack gap="xs">
                      <div>
                        <Text size="xs" c="dimmed">
                          Địa chỉ lấy hàng
                        </Text>
                        <Text fw={500}>{order.DiaChiLayHang}</Text>
                      </div>

                      <div>
                        <Text size="xs" c="dimmed">
                          Địa chỉ giao hàng
                        </Text>
                        <Text fw={500}>{order.DiaChiGiaoHang}</Text>
                      </div>
                    </Stack>
                  </Paper>

                  <Paper withBorder p="md" radius="md">
                    <Group gap="xs" mb="sm">
                      <IconCash size={18} color="var(--mantine-color-blue-6)" />
                      <Text size="sm" fw={600}>
                        Thông tin thanh toán
                      </Text>
                    </Group>

                    <Grid gutter="xs">
                      <Grid.Col span={6}>
                        <Text size="xs" c="dimmed">
                          Cước phí
                        </Text>
                        <Text fw={500}>
                          {order?.CuocPhi?.toLocaleString()}₫
                        </Text>
                      </Grid.Col>
                      <Grid.Col span={6}>
                        <Text size="xs" c="dimmed">
                          Ngày tạo
                        </Text>
                        <Text fw={500}>
                          {new Date(order.CreatedAt)?.toLocaleDateString()}
                        </Text>
                      </Grid.Col>
                      <Grid.Col span={6}>
                        <Text size="xs" c="dimmed">
                          Ngày cập nhật
                        </Text>
                        <Text fw={500}>
                          {new Date(order.UpdatedAt)?.toLocaleDateString()}
                        </Text>
                      </Grid.Col>
                    </Grid>
                  </Paper>
                </Stack>
              </Grid.Col>
            </Grid>

            <Paper withBorder p="md" radius="md">
              <Group gap="xs" mb="sm">
                <IconNote size={18} color="var(--mantine-color-blue-6)" />
                <Text size="sm" fw={600}>
                  Ghi chú
                </Text>
              </Group>
              <Text c={order.GhiChu ? undefined : "dimmed"}>
                {order.GhiChu || "Không có ghi chú"}
              </Text>
            </Paper>

            <Group justify="flex-end" mt="sm">
              <Tooltip label="Xem tuyến đường tối ưu" withArrow>
                <Button
                  onClick={() => setRouteModalOpen(true)}
                  leftSection={<IconRoute size={18} />}
                  variant="outline"
                  radius="md"
                >
                  Tuyến đường
                </Button>
              </Tooltip>
              <Button onClick={onClose} radius="md">
                Đóng
              </Button>
            </Group>
          </Stack>
        )
      )}

      <RouteModal
        opened={routeModalOpen}
        onClose={() => setRouteModalOpen(false)}
        order={order}
      />
    </Modal>
  );
}
