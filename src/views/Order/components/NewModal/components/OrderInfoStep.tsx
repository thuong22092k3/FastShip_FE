import { Box, TextInput, Title } from "@mantine/core";
import { Order } from "../../../../../api/type/OrderType";

interface Props {
  formData: Partial<Order>;
  errors: Record<string, string>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const OrderInfoStep = ({ formData, errors, handleInputChange }: Props) => (
  <>
    <Title order={5} c="blue">
      Thông tin người gửi
    </Title>
    <TextInput
      label="Địa chỉ KH"
      name="NguoiGui"
      value={formData.NguoiGui}
      onChange={handleInputChange}
      readOnly
      mt="sm"
    />

    <Box mt="md">
      <Title order={5} c="blue">
        Thông tin người nhận
      </Title>
      <TextInput
        label="Số điện thoại *"
        name="SDT"
        value={formData.SDT || ""}
        onChange={handleInputChange}
        error={errors.SDT}
        required
        mt="sm"
      />
      <TextInput
        label="Họ và tên *"
        name="NguoiNhan"
        value={formData.NguoiNhan || ""}
        onChange={handleInputChange}
        error={errors.NguoiNhan}
        required
        mt="sm"
      />
      <TextInput
        label="Địa chỉ giao hàng *"
        name="DiaChiGiaoHang"
        value={formData.DiaChiGiaoHang || ""}
        onChange={handleInputChange}
        error={errors.DiaChiGiaoHang}
        required
        mt="sm"
      />
      <TextInput
        label="Ghi chú"
        name="GhiChu"
        value={formData.GhiChu || ""}
        onChange={handleInputChange}
        mt="sm"
      />
    </Box>
  </>
);

export default OrderInfoStep;
