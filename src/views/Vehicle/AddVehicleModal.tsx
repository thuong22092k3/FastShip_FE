import {
  Box,
  Button,
  Grid,
  Group,
  LoadingOverlay,
  Select,
  Text,
  Title,
} from "@mantine/core";
import "@mantine/core/styles.css";
import { useState } from "react";
import { Vehicle } from "../../api/type/VehicleType";
import { vehicleService } from "../../api/service/VehicleService";
import { useDispatch } from "react-redux";
import { ADD_VEHICLE } from "../../state_management/actions/actions";
import { showNotification } from "@mantine/notifications";
import TextInputCustom from "../../components/TextInput/TextInputComponent";

interface AddVehicleModalProps {
  open: boolean;
  onClose: () => void;
  onVehicleCreated: () => void;
}

export default function AddVehicleModal({
  open,
  onClose,
  onVehicleCreated,
}: AddVehicleModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<Partial<Vehicle>>({
    TrangThai: "Hoạt động",
    BaoDuong: "Đã bảo dưỡng tháng 3/2024",
    SucChua: 1000,
  });

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
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const payload: Vehicle = {
        PhuongTienId: `PT${Math.floor(100 + Math.random() * 900)}`,
        HangXe: formData.HangXe || "",
        TaiXeID: formData.TaiXeID || "TX134",
        BienSo: formData.BienSo || "",
        LoaiXe: formData.LoaiXe || "",
        SucChua: Number(formData.SucChua) || 0,
        TrangThai: formData.TrangThai || "Hoạt động",
        BaoDuong: formData.BaoDuong || "Đã bảo dưỡng tháng 3/2024",
      };

      const createdVehicle = await vehicleService.createVehicle(payload);
      dispatch(ADD_VEHICLE(createdVehicle));

      showNotification({
        title: "Thành công",
        message: "Đã thêm phương tiện mới thành công",
        color: "green",
      });

      onVehicleCreated();
      onClose();
      resetForm();
    } catch (error) {
      console.error("Error creating vehicle:", error);
      showNotification({
        title: "Lỗi",
        message: "Không thể thêm phương tiện mới",
        color: "red",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      TrangThai: "Hoạt động",
      BaoDuong: "Đã bảo dưỡng tháng 3/2024",
      SucChua: 1000,
    });
    setErrors({});
  };

  if (!open) return null;

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
            Thêm phương tiện mới
          </Title>

          <Grid gutter="xl">
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
              />
            </Grid.Col>

            <Grid.Col span={6}>
              <TextInputCustom
                label="Sức chứa (kg)"
                labelFontWeight="bold"
                placeHolder="Nhập sức chứa"
                name="SucChua"
                value={formData.SucChua?.toString() || "1000"}
                setValue={(value) => handleInputChange("SucChua", value)}
                error={errors.SucChua}
                required
                pattern="[0-9]*"
              />
            </Grid.Col>

            <Grid.Col span={6}>
              <TextInputCustom
                label="Mã tài xế"
                labelFontWeight="bold"
                placeHolder="Nhập mã tài xế"
                name="TaiXeId"
                value={formData.TaiXeID || "TX134"}
                setValue={(value) => handleInputChange("TaiXeId", value)}
              />
            </Grid.Col>

            <Grid.Col span={6}>
              <Text fw={500} mb="sm">
                Trạng thái
              </Text>
              <Select
                data={[
                  { value: "Hoạt động", label: "Hoạt động" },
                  { value: "Không hoạt động", label: "Không hoạt động" },
                  { value: "Bảo trì", label: "Bảo trì" },
                ]}
                value={formData.TrangThai}
                onChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    TrangThai: value || "Hoạt động",
                  }))
                }
              />
            </Grid.Col>

            <Grid.Col span={12}>
              <TextInputCustom
                label="Tình trạng bảo dưỡng"
                labelFontWeight="bold"
                placeHolder="Nhập tình trạng bảo dưỡng"
                name="BaoDuong"
                value={formData.BaoDuong || "Đã bảo dưỡng tháng 3/2024"}
                setValue={(value) => handleInputChange("BaoDuong", value)}
              />
            </Grid.Col>
          </Grid>

          <Group justify="flex-end" mt="xl">
            <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
              Hủy
            </Button>
            <Button onClick={handleSubmit} color="green" loading={isSubmitting}>
              Thêm mới
            </Button>
          </Group>
        </div>
      </div>
    </div>
  );
}
