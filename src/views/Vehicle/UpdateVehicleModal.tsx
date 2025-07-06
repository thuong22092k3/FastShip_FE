import {
  Button,
  Grid,
  Group,
  LoadingOverlay,
  NativeSelect,
  Text,
  Title,
} from "@mantine/core";
import "@mantine/core/styles.css";
import { DateTimePicker } from "@mantine/dates";
import "@mantine/dates/styles.css";
import { showNotification } from "@mantine/notifications";
import "@mantine/notifications/styles.css";
import { useEffect, useState } from "react";
import { vehicleService } from "../../api/service/VehicleService";
import { Vehicle } from "../../api/type/VehicleType";
import TextInputCustom from "../../components/TextInput/TextInputComponent";
import { COLORS } from "../../constants/colors";
interface UpdateVehicleModalProps {
  open: boolean;
  onClose: () => void;
  onVehicleUpdated: () => void;
  vehicleData: Vehicle | null;
}

export default function UpdateVehicleModal({
  open,
  onClose,
  onVehicleUpdated,
  vehicleData,
}: UpdateVehicleModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState<Partial<Vehicle>>({
    PhuongTienId: "",
    HangXe: "",
    TaiXeID: "",
    BienSo: "",
    LoaiXe: "",
    SucChua: 0,
    TrangThai: "",
    BaoDuong: "",
    ThoiGianBaoDuong: "",
  });

  useEffect(() => {
    if (vehicleData) {
      setFormData({
        PhuongTienId: vehicleData.PhuongTienId,
        HangXe: vehicleData.HangXe,
        TaiXeID: vehicleData.TaiXeID,
        BienSo: vehicleData.BienSo,
        LoaiXe: vehicleData.LoaiXe,
        SucChua: vehicleData.SucChua,
        TrangThai: vehicleData.TrangThai,
        BaoDuong: vehicleData.BaoDuong,
        ThoiGianBaoDuong: vehicleData.ThoiGianBaoDuong,
      });
    }
  }, [vehicleData]);

  const handleInputChange = (name: string, value: string) => {
    if (name === "SucChua") {
      if (value === "" || /^[0-9]*$/.test(value)) {
        setFormData((prev) => ({
          ...prev,
          [name]: value === "" ? 0 : Number(value),
        }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.HangXe) newErrors.HangXe = "Vui lòng nhập hãng xe";
    if (!formData.BienSo) newErrors.BienSo = "Vui lòng nhập biển số";
    if (!formData.LoaiXe) newErrors.LoaiXe = "Vui lòng nhập loại xe";
    if (!formData.SucChua || formData.SucChua <= 0)
      newErrors.SucChua = "Vui lòng nhập sức chứa hợp lệ";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm() || !formData.PhuongTienId) return;

    setIsSubmitting(true);
    try {
      await vehicleService.updateVehicle(formData.PhuongTienId, {
        HangXe: formData.HangXe,
        TaiXeID: formData.TaiXeID,
        BienSo: formData.BienSo,
        LoaiXe: formData.LoaiXe,
        SucChua: Number(formData.SucChua),
        TrangThai: formData.TrangThai,
        BaoDuong: formData.BaoDuong,
        ThoiGianBaoDuong: formData.ThoiGianBaoDuong,
      });

      showNotification({
        title: "Thành công",
        message: "Đã cập nhật phương tiện thành công",
        color: "green",
      });

      onVehicleUpdated();
      onClose();
    } catch (error) {
      console.error("Error updating vehicle:", error);
      showNotification({
        title: "Lỗi",
        message: "Không thể cập nhật phương tiện",
        color: "red",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!open || !vehicleData) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0,0,0,0.5)",
        zIndex: 1000,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "white",
          width: "600px",
          maxHeight: "90vh",
          borderRadius: "8px",
          overflow: "auto",
          position: "relative",
        }}
      >
        <LoadingOverlay visible={isSubmitting} />
        <div style={{ padding: "30px", position: "relative" }}>
          <button
            onClick={onClose}
            style={{
              position: "absolute",
              top: "15px",
              right: "15px",
              background: "none",
              border: "none",
              fontSize: "1.5rem",
              cursor: "pointer",
            }}
            disabled={isSubmitting}
          >
            ×
          </button>

          <Title order={3} mb="xl">
            Cập nhật phương tiện
          </Title>

          <Grid gutter="xl">
            <Grid.Col span={6}>
              <TextInputCustom
                label="ID Phương tiện"
                labelFontWeight="bold"
                placeHolder=""
                name="PhuongTienId"
                value={formData.PhuongTienId || ""}
                setValue={() => {}}
                readOnly
                labelColor={COLORS.black}
              />
            </Grid.Col>

            <Grid.Col span={6}>
              <TextInputCustom
                label="Hãng xe"
                labelFontWeight="bold"
                placeHolder="Nhập hãng xe"
                name="HangXe"
                value={formData.HangXe || ""}
                setValue={(value) => handleInputChange("HangXe", value)}
                error={errors.HangXe}
                required
                labelColor={COLORS.black}
              />
            </Grid.Col>

            <Grid.Col span={6}>
              <TextInputCustom
                label="Biển số"
                labelFontWeight="bold"
                placeHolder="Nhập biển số"
                name="BienSo"
                value={formData.BienSo || ""}
                setValue={(value) => handleInputChange("BienSo", value)}
                error={errors.BienSo}
                required
                labelColor={COLORS.black}
              />
            </Grid.Col>

            <Grid.Col span={6}>
              <TextInputCustom
                label="Loại xe"
                labelFontWeight="bold"
                placeHolder="Nhập loại xe"
                name="LoaiXe"
                value={formData.LoaiXe || ""}
                setValue={(value) => handleInputChange("LoaiXe", value)}
                error={errors.LoaiXe}
                required
                labelColor={COLORS.black}
              />
            </Grid.Col>

            <Grid.Col span={6}>
              <TextInputCustom
                label="Sức chứa (kg)"
                labelFontWeight="bold"
                placeHolder="Nhập sức chứa"
                name="SucChua"
                value={formData.SucChua?.toString() || "0"}
                setValue={(value) => handleInputChange("SucChua", value)}
                error={errors.SucChua}
                required
                pattern="[0-9]*"
                labelColor={COLORS.black}
              />
            </Grid.Col>

            <Grid.Col span={6}>
              <TextInputCustom
                label="Mã tài xế"
                labelFontWeight="bold"
                placeHolder="Nhập mã tài xế"
                name="TaiXeID"
                value={formData.TaiXeID || ""}
                setValue={(value) => handleInputChange("TaiXeID", value)}
                labelColor={COLORS.black}
              />
            </Grid.Col>

            <Grid.Col span={6}>
              <Text
                fw={600}
                mt="xs"
                mb="sm"
                style={{ color: "black", fontSize: 12 }}
              >
                Trạng thái
              </Text>
              <NativeSelect
                data={[
                  { value: "Đang hoạt động", label: "Đang hoạt động" },
                  { value: "Đang bảo dưỡng", label: "Đang bảo dưỡng" },
                  { value: "Ngừng hoạt động", label: "Ngừng hoạt động" },
                ]}
                value={formData.TrangThai}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    TrangThai: e.target.value || "Đang Hoạt động",
                  }))
                }
              />
            </Grid.Col>

            <Grid.Col span={6}>
              <Text
                fw={600}
                mt="xs"
                mb="sm"
                style={{ color: "black", fontSize: 12 }}
              >
                Tình trạng bảo dưỡng
              </Text>
              <NativeSelect
                data={[
                  { value: "Đã bảo dưỡng", label: "Đã bảo dưỡng" },
                  { value: "Đang bảo dưỡng", label: "Đang bảo dưỡng" },
                  { value: "Chờ bảo dưỡng", label: "Chờ bảo dưỡng" },
                ]}
                value={formData.BaoDuong}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    BaoDuong: e.target.value || "Đã bảo dưỡng",
                  }))
                }
              />
            </Grid.Col>

            <Grid.Col span={6}>
              <Text
                fw={600}
                mt="xs"
                mb="sm"
                style={{ color: "black", fontSize: 12 }}
              >
                Thời gian bảo dưỡng
              </Text>
              <DateTimePicker
                label="Thời gian bảo dưỡng"
                value={
                  formData.ThoiGianBaoDuong
                    ? new Date(formData.ThoiGianBaoDuong)
                    : null
                }
                onChange={(date: Date | null) =>
                  handleInputChange(
                    "ThoiGianBaoDuong",
                    date?.toISOString() || ""
                  )
                }
                popoverProps={{ withinPortal: true, zIndex: 10001 }}
                placeholder="Chọn ngày và giờ"
                valueFormat="DD/MM/YYYY HH:mm"
                style={{ width: "100%" }}
              />
            </Grid.Col>
          </Grid>

          <Group justify="flex-end" mt="xl">
            <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
              Hủy
            </Button>
            <Button onClick={handleSubmit} color="green" loading={isSubmitting}>
              Cập nhật
            </Button>
          </Group>
        </div>
      </div>
    </div>
  );
}
