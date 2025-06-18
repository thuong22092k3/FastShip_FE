import { Box, NativeSelect, TextInput, Title } from "@mantine/core";
import { Order } from "../../../../../api/type/OrderType";

interface Props {
  formData: Partial<Order>;
  errors: Record<string, string>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange?: (name: string, value: string | null) => void;
}

const ORDER_METHODS = [
  { value: "document", label: "Tài liệu" },
  { value: "parcel", label: "Hàng hóa thông thường" },
  { value: "heavy_parcel", label: "Hàng hóa nặng" },
  { value: "fragile", label: "Hàng dễ vỡ" },
];

const OrderInfoStep = ({
  formData,
  errors,
  handleInputChange,
  handleSelectChange,
}: Props) => {
  const handleOrderMethodChange = (value: string | null) => {
    if (handleSelectChange) {
      handleSelectChange("deliveryMethod", value);
    } else {
      handleInputChange({
        target: {
          name: "deliveryMethod",
          value: value || "",
        },
      } as React.ChangeEvent<HTMLInputElement>);
    }
  };

  return (
    <>
      <Title order={5} c="blue">
        Thông tin người gửi
      </Title>
      <TextInput
        label="Địa chỉ KH"
        name="NguoiGui"
        value={formData.NguoiGui || ""}
        onChange={handleInputChange}
        mt="sm"
        required
      />

      <Box mt="md">
        <Title order={5} c="blue">
          Thông tin người nhận
        </Title>
        <TextInput
          label="Số điện thoại"
          name="SDT"
          value={formData.SDT || ""}
          onChange={handleInputChange}
          error={errors.SDT}
          required
          mt="sm"
        />
        <TextInput
          label="Họ và tên"
          name="NguoiNhan"
          value={formData.NguoiNhan || ""}
          onChange={handleInputChange}
          error={errors.NguoiNhan}
          required
          mt="sm"
        />
        <TextInput
          label="Địa chỉ giao hàng"
          name="DiaChiGiaoHang"
          value={formData.DiaChiGiaoHang || ""}
          onChange={handleInputChange}
          error={errors.DiaChiGiaoHang}
          required
          mt="sm"
        />

        <NativeSelect
          label="Loại đơn hàng"
          data={[{ value: "", label: "Chọn loại đơn hàng" }, ...ORDER_METHODS]}
          value={formData.deliveryMethod || ""}
          onChange={(e) => handleOrderMethodChange(e.target.value || null)}
          required
          mb="md"
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
};

export default OrderInfoStep;
