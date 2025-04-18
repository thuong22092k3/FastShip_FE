import {
  Modal,
  TextInput,
  Select,
  Textarea,
  Button,
  Group,
  Badge,
  Stack,
  Text,
  Title,
  Center,
  Loader,
} from "@mantine/core";
import { Order } from "../../api/type/OrderType";
import { orderService } from "../../api/service/OrderService";

interface OrderDetailModalProps {
  opened: boolean;
  onClose: () => void;
  order: Order | null;
  loading?: boolean;
}

const statusOptions = [
  { value: "Chờ xác nhận", label: "Chờ xác nhận" },
  { value: "Đang giao", label: "Đang giao" },
  { value: "Đã giao", label: "Đã giao" },
  { value: "Hủy", label: "Hủy" },
];

export function OrderDetailModal({
  opened,
  onClose,
  order,
  loading = false,
}: OrderDetailModalProps) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "đang giao":
        return "blue";
      case "đã giao":
        return "green";
      case "hủy":
        return "red";
      default:
        return "gray";
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Chi tiết đơn hàng"
      size="lg"
    >
      {loading ? (
        <Center h={200}>
          <Loader />
        </Center>
      ) : (
        order && (
          <Stack gap="md">
            <div>
              <Text size="sm" c="dimmed">
                Mã đơn hàng
              </Text>
              <Title order={4}>{order.DonHangId}</Title>
            </div>

            <div>
              <Text size="sm" c="dimmed">
                Trạng thái
              </Text>
              <Badge color={getStatusColor(order.TrangThai)} size="lg">
                {order.TrangThai}
              </Badge>
            </div>

            <div>
              <Text size="sm" c="dimmed">
                Nhân viên phụ trách
              </Text>
              <Text>{order.NhanVienId}</Text>
            </div>

            <div>
              <Text size="sm" c="dimmed">
                Người gửi
              </Text>
              <Text>{order.NguoiGui}</Text>
            </div>

            <div>
              <Text size="sm" c="dimmed">
                Người nhận
              </Text>
              <Text>{order.NguoiNhan}</Text>
            </div>

            <div>
              <Text size="sm" c="dimmed">
                Số điện thoại
              </Text>
              <Text>{order.SDT}</Text>
            </div>

            <div>
              <Text size="sm" c="dimmed">
                Địa chỉ lấy hàng
              </Text>
              <Text>{order.DiaChiLayHang}</Text>
            </div>

            <div>
              <Text size="sm" c="dimmed">
                Địa chỉ giao hàng
              </Text>
              <Text>{order.DiaChiGiaoHang}</Text>
            </div>

            <div>
              <Text size="sm" c="dimmed">
                Cước phí
              </Text>
              <Text>{order.CuocPhi.toLocaleString()}₫</Text>
            </div>

            <div>
              <Text size="sm" c="dimmed">
                Ngày tạo
              </Text>
              <Text>{new Date(order.CreatedAt).toLocaleString()}</Text>
            </div>

            <div>
              <Text size="sm" c="dimmed">
                Ngày cập nhật
              </Text>
              <Text>{new Date(order.UpdatedAt).toLocaleString()}</Text>
            </div>

            <div>
              <Text size="sm" c="dimmed">
                Ghi chú
              </Text>
              <Text>{order.GhiChu || "Không có ghi chú"}</Text>
            </div>

            <Group justify="flex-end" mt="xl">
              <Button onClick={onClose}>Đóng</Button>
            </Group>
          </Stack>
        )
      )}
    </Modal>
  );
}
