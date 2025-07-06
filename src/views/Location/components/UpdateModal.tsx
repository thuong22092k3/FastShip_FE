import {
  Button,
  Grid,
  Group,
  LoadingOverlay,
  NumberInput,
  Title,
} from "@mantine/core";
import "@mantine/core/styles.css";
import { showNotification } from "@mantine/notifications";
import "@mantine/notifications/styles.css";
import { useEffect, useState } from "react";
import { LocationService } from "../../../api/service/LocationService";
import { Location } from "../../../api/type/LocationType";
import TextInputCustom from "../../../components/TextInput/TextInputComponent";
import { COLORS } from "../../../constants/colors";

interface UpdateLocationModalProps {
  open: boolean;
  onClose: () => void;
  onLocationUpdated: () => void;
  locationData: Location | null;
}

export default function UpdateLocationModal({
  open,
  onClose,
  onLocationUpdated,
  locationData,
}: UpdateLocationModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<Partial<Location>>({
    DiaDiemId: "",
    name: "",
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    if (locationData) {
      setFormData({
        DiaDiemId: locationData.DiaDiemId,
        name: locationData.name,
        latitude: locationData.latitude,
        longitude: locationData.longitude,
      });
    }
  }, [locationData]);

  const handleInputChange = (name: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name) newErrors.name = "Vui lòng nhập tên địa điểm";
    if (formData.latitude === undefined)
      newErrors.latitude = "Vui lòng nhập vĩ độ";
    if (formData.longitude === undefined)
      newErrors.longitude = "Vui lòng nhập kinh độ";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm() || !formData.DiaDiemId) return;

    setIsSubmitting(true);
    try {
      await LocationService.update(formData.DiaDiemId, {
        name: formData.name || "",
        latitude: formData.latitude || 0,
        longitude: formData.longitude || 0,
      });

      showNotification({
        title: "Thành công",
        message: "Đã cập nhật địa điểm thành công",
        color: "green",
      });

      onLocationUpdated();
      onClose();
    } catch (error) {
      showNotification({
        title: "Lỗi",
        message: "Không thể cập nhật địa điểm",
        color: "red",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!open || !locationData) return null;

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
            Cập nhật địa điểm
          </Title>

          <Grid gutter="xl">
            <Grid.Col span={12}>
              <TextInputCustom
                label="ID Địa điểm"
                value={formData.DiaDiemId || ""}
                readOnly
                labelColor={COLORS.black}
                labelFontWeight={"medium"}
                labelFontSize={14}
              />
            </Grid.Col>

            <Grid.Col span={12}>
              <TextInputCustom
                label="Tên địa điểm"
                placeholder="Nhập tên địa điểm"
                value={formData.name || ""}
                onChange={(e) =>
                  handleInputChange("name", e.currentTarget.value)
                }
                error={errors.name}
                required
                labelColor={COLORS.black}
                labelFontWeight={"medium"}
                labelFontSize={14}
              />
            </Grid.Col>

            <Grid.Col span={6}>
              <NumberInput
                label="Vĩ độ"
                placeholder="Nhập vĩ độ"
                value={formData.latitude}
                onChange={(value) =>
                  handleInputChange("latitude", Number(value))
                }
                error={errors.latitude}
                required
              />
            </Grid.Col>

            <Grid.Col span={6}>
              <NumberInput
                label="Kinh độ"
                placeholder="Nhập kinh độ"
                value={formData.longitude}
                onChange={(value) =>
                  handleInputChange("longitude", Number(value))
                }
                error={errors.longitude}
                required
              />
            </Grid.Col>
          </Grid>

          <Group justify="flex-end" mt="xl">
            <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
              Hủy
            </Button>
            <Button onClick={handleSubmit} loading={isSubmitting}>
              Cập nhật
            </Button>
          </Group>
        </div>
      </div>
    </div>
  );
}
