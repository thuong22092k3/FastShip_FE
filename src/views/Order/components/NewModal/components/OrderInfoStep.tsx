import { Box, NativeSelect, TextInput, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { LocationService } from "../../../../../api/service/LocationService";
import { Order } from "../../../../../api/type/OrderType";
import { RootState } from "../../../../../state_management/reducers/rootReducer";

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
  const { currentUser } = useSelector((state: RootState) => state.authSlice);
  const [locationAddress, setLocationAddress] = useState("");

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

  useEffect(() => {
    const fetchDiaDiem = async () => {
      if (!currentUser?.DiaDiemId) return;

      try {
        const res = await LocationService.getById(currentUser.DiaDiemId);
        if (res.address) {
          setLocationAddress(res.address);
          if (!formData.NguoiGui) {
            handleInputChange({
              target: {
                name: "DiaChiLayHang",
                value: res.address,
              },
            } as React.ChangeEvent<HTMLInputElement>);
          }
        }
      } catch (error) {
        console.error("Không thể lấy địa chỉ bưu cục:", error);
      }
    };

    fetchDiaDiem();
  }, [currentUser?.DiaDiemId]);

  return (
    <>
      <Title order={5} c="blue">
        Thông tin người gửi
      </Title>

      <TextInput
        label="Tên người gửi"
        name="NguoiGui"
        value={formData.NguoiGui || ""}
        onChange={handleInputChange}
        error={errors.NguoiGui}
        required
        mt="sm"
      />
      <TextInput
        label="Địa chỉ KH"
        name="DiaChiLayHang"
        value={formData.DiaChiLayHang || locationAddress || ""}
        onChange={handleInputChange}
        mt="sm"
        required
        readOnly={!!locationAddress && !formData.DiaChiLayHang}
        placeholder={
          locationAddress ? "Địa chỉ bưu cục: " + locationAddress : ""
        }
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
