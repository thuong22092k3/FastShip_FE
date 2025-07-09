import { Button, Grid, Group, LoadingOverlay, Title } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import "@mantine/notifications/styles.css";
import { useEffect, useState } from "react";
import { employeeService } from "../../api/service/EmployeeService";
import { TaiXe } from "../../api/type/EmployeeType";
import TextInputCustom from "../../components/TextInput/TextInputComponent";
import { COLORS } from "../../constants/colors";

interface UpdateDriverModalProps {
  open: boolean;
  onClose: () => void;
  onDriverUpdated: () => void;
  driverData: TaiXe | null;
}

export default function UpdateDriverModal({
  open,
  onClose,
  onDriverUpdated,
  driverData,
}: UpdateDriverModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState<Partial<TaiXe>>({
    TaiXeID: "",
    HoTen: "",
    Email: "",
    Password: "",
    UserName: "",
    HieuSuat: 0,
    CongViec: 0,
  });

  useEffect(() => {
    if (driverData) {
      setFormData({
        TaiXeID: driverData.TaiXeID,
        HoTen: driverData.HoTen,
        Email: driverData.Email,
        UserName: driverData.UserName,
        Password: driverData.Password,
        HieuSuat: driverData.HieuSuat,
        CongViec: driverData.CongViec,
      });
    }
  }, [driverData]);

  const handleInputChange = (name: string, value: string) => {
    if (name === "HieuSuat" || name === "CongViec") {
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
    if (!formData.HoTen) newErrors.HoTen = "Vui lòng nhập họ và tên";
    if (!formData.Email) newErrors.Email = "Vui lòng nhập email";
    if (!formData.UserName) newErrors.UserName = "Vui lòng nhập Username";
    if (!formData.Password) newErrors.Password = "Vui lòng nhập password";
    if (!formData.HieuSuat || formData.HieuSuat <= 0)
      newErrors.HieuSuat = "Vui lòng nhập hiệu suất";
    if (!formData.CongViec || formData.CongViec <= 0)
      newErrors.CongViec = "Vui lòng nhập công việc";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    console.log("Bắt đầu quá trình cập nhật");
    if (!formData.TaiXeID) {
      console.log("Lỗi: Thiếu TaiXeID", formData);
      return;
    }

    const isValid = validateForm();
    if (!isValid) {
      console.log("Validation failed", errors);
      return;
    }

    setIsSubmitting(true);
    console.log("Chuẩn bị gửi dữ liệu cập nhật:", formData);
    try {
      const updateData = {
        TaiXeID: formData.TaiXeID || "",
        HoTen: formData.HoTen || "",
        UserName: formData.UserName || "",
        Email: formData.Email || "",
        HieuSuat: Number(formData.HieuSuat),
        CongViec: Number(formData.CongViec),
        Password: formData.Password || "",
      };
      console.log("Dữ liệu sẽ gửi đến API:", updateData);

      const response = await employeeService.updateUser(updateData);
      console.log("Phản hồi từ API:", response);

      showNotification({
        title: "Thành công",
        message: "Đã cập nhật tài xế thành công",
        color: "green",
      });

      console.log("Gọi callback onDriverUpdated");
      onDriverUpdated();
      onClose();
    } catch (error) {
      console.error("Lỗi khi cập nhật:", error);
      showNotification({
        title: "Lỗi",
        message: "Không thể cập nhật tài xế",
        color: "red",
      });
    } finally {
      console.log("Kết thúc quá trình cập nhật");
      setIsSubmitting(false);
    }
  };
  if (!open || !driverData) return null;

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
            Cập nhật thông tin tài xế
          </Title>

          <Grid gutter="xl">
            <Grid.Col span={6}>
              <TextInputCustom
                label="ID Tài xế"
                labelFontWeight="bold"
                placeHolder=""
                name="TaiXeID"
                value={formData.TaiXeID || ""}
                setValue={() => {}}
                readOnly
                labelColor={COLORS.black}
              />
            </Grid.Col>

            <Grid.Col span={6}>
              <TextInputCustom
                label="Họ và tên"
                labelFontWeight="bold"
                placeHolder="Nhập họ và tên"
                name="HoTen"
                value={formData.HoTen || ""}
                setValue={(value) => handleInputChange("HoTen", value)}
                error={errors.HoTen}
                required
                labelColor={COLORS.black}
              />
            </Grid.Col>

            <Grid.Col span={6}>
              <TextInputCustom
                label="UserName"
                labelFontWeight="bold"
                placeHolder="Nhập username"
                name="UserName"
                value={formData.UserName || ""}
                setValue={(value) => handleInputChange("UserName", value)}
                error={errors.UserName}
                required
                labelColor={COLORS.black}
              />
            </Grid.Col>

            <Grid.Col span={6}>
              <TextInputCustom
                label="Email"
                labelFontWeight="bold"
                placeHolder="Nhập email"
                name="Email"
                value={formData.Email || ""}
                setValue={(value) => handleInputChange("Email", value)}
                error={errors.Email}
                required
                labelColor={COLORS.black}
              />
            </Grid.Col>

            <Grid.Col span={6}>
              <TextInputCustom
                label="Password"
                labelFontWeight="bold"
                placeHolder="Nhập password"
                name="Password"
                value={formData.Password || ""}
                setValue={(value) => handleInputChange("Password", value)}
                error={errors.Password}
                required
                labelColor={COLORS.black}
              />
            </Grid.Col>

            {/* <Grid.Col span={6}>
              <TextInputCustom
                label="Hiệu suất"
                labelFontWeight="bold"
                placeHolder="Nhập hiệu suất"
                name="HieuSuat"
                value={formData.HieuSuat?.toString() || "0"}
                setValue={(value) => handleInputChange("HieuSuat", value)}
                error={errors.HieuSuat}
                required
                pattern="[0-9]*"
                labelColor={COLORS.black}
              />
            </Grid.Col> */}

            <Grid.Col span={6}>
              <TextInputCustom
                label="Công việc"
                labelFontWeight="bold"
                placeHolder="Nhập số công việc"
                name="CongViec"
                value={formData.CongViec?.toString() || "0"}
                setValue={(value) => handleInputChange("CongViec", value)}
                error={errors.CongViec}
                required
                pattern="[0-9]*"
                labelColor={COLORS.black}
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
