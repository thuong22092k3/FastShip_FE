import { Button, Grid, Group, LoadingOverlay, Title } from "@mantine/core";
import "@mantine/core/styles.css";
import { showNotification } from "@mantine/notifications";
import "@mantine/notifications/styles.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { LocationService } from "../../../api/service/LocationService";
import { Location } from "../../../api/type/LocationType";
import TextInputCustom from "../../../components/TextInput/TextInputComponent";
import { COLORS } from "../../../constants/colors";
import { ADD_LOCATION } from "../../../state_management/actions/actions";

interface AddLocationModalProps {
  open: boolean;
  onClose: () => void;
  onLocationCreated: () => void;
}

export default function AddLocationModal({
  open,
  onClose,
  onLocationCreated,
}: AddLocationModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<Partial<Location>>({
    latitude: 0,
    longitude: 0,
  });

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
    if (!validateForm()) return;

    setIsSubmitting(true);
    // const geoData = await LocationService.getLocationDetailsFromAddress(
    //   formData.address || ""
    // );
    try {
      console.log("Địa chỉ gửi đi:", formData.address);
      const geoData = await LocationService.getLocationDetailsFromAddress(
        formData.address || ""
      );

      const payload: Location = {
        DiaDiemId: `DD${Math.floor(1000 + Math.random() * 9000)}`,
        name: formData.name || "",
        address: formData.address || "",
        latitude: geoData.latitude,
        longitude: geoData.longitude,
        district: geoData.addressDetails.district,
        province: geoData.addressDetails.province,
      };
      console.log("payload", payload);

      const createdLocation = await LocationService.create(payload);
      dispatch(ADD_LOCATION(createdLocation));
      showNotification({
        title: "Thành công",
        message: "Đã thêm địa điểm mới thành công",
        color: "green",
      });

      onLocationCreated();
      onClose();
    } catch (error: any) {
      showNotification({
        title: "Lỗi",
        message:
          error?.message === "Không tìm thấy địa chỉ。"
            ? "Địa chỉ không hợp lệ. Vui lòng kiểm tra lại."
            : "Không thể thêm địa điểm mới",
        color: "red",
      });
    } finally {
      setIsSubmitting(false);
    }
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
            Thêm địa điểm mới
          </Title>

          <Grid gutter="xl">
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
            <Grid.Col span={12}>
              <TextInputCustom
                label="Địa chỉ"
                placeholder="Nhập địa chỉ"
                value={formData.address || ""}
                onChange={(e) =>
                  handleInputChange("address", e.currentTarget.value)
                }
                error={errors.name}
                required
                labelColor={COLORS.black}
                labelFontWeight={"medium"}
                labelFontSize={14}
              />
            </Grid.Col>

            {/* <Grid.Col span={6}>
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
            </Grid.Col> */}
          </Grid>

          <Group justify="flex-end" mt="xl">
            <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
              Hủy
            </Button>
            <Button onClick={handleSubmit} loading={isSubmitting}>
              Thêm mới
            </Button>
          </Group>
        </div>
      </div>
    </div>
  );
}
