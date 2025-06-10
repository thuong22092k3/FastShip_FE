import { Box, Text, Title } from "@mantine/core";
import { Order } from "../../../../../api/type/OrderType";

interface PackageInfo {
  length: number;
  width: number;
  height: number;
  weight: number;
}

interface Props {
  formData: Partial<Order>;
  packageInfo: PackageInfo;
  fees: { baseFee: number; vat: number; total: number };
}

const ConfirmationStep = ({ formData, packageInfo, fees }: Props) => (
  <Box>
    <Title order={5} c="blue" mb="md">
      Xác nhận thông tin
    </Title>
    <Text>Người nhận: {formData.NguoiNhan}</Text>
    <Text>SĐT: {formData.SDT}</Text>
    <Text>Địa chỉ: {formData.DiaChiGiaoHang}</Text>
    <Text>Ghi chú: {formData.GhiChu || "Không có"}</Text>

    <Title order={5} c="blue" mt="md">
      Thông tin kiện hàng
    </Title>
    <Text>
      Kích thước: {packageInfo.length}cm × {packageInfo.width}cm ×{" "}
      {packageInfo.height}cm
    </Text>
    <Text>Cân nặng: {packageInfo.weight} kg</Text>
    <Title order={5} c="blue" mt="md">
      Dịch vụ giao hàng
    </Title>
    <Text>
      Đối tác:{" "}
      {
        // formData.DoiTacGiaoHang ||
        "Chưa chọn"
      }
    </Text>
    <Title order={5} c="blue" mt="md">
      Chi phí
    </Title>
    <Text>Chuyển phát nhanh: {fees.baseFee.toLocaleString()} VND</Text>
    <Text>Phí VAT (10%): {fees.vat.toLocaleString()} VND</Text>
    <Text fw={600}>Tổng tiền: {fees.total.toLocaleString()} VND</Text>
  </Box>
);

export default ConfirmationStep;
