import {
  Box,
  Button,
  Grid,
  Group,
  LoadingOverlay,
  Select,
  Text,
  Title,
  Radio,
} from "@mantine/core";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { showNotification } from "@mantine/notifications";
import { employeeService } from "../../api/service/EmployeeService";
import { ADD_EMPLOYEE } from "../../state_management/actions/actions";
import TextInputCustom from "../../components/TextInput/TextInputComponent";
import { TaiXe } from "../../api/type/EmployeeType";

interface CreateEmployeeModalProps {
  open: boolean;
  onClose: () => void;
  onEmployeeCreated: () => void;
}

export default function CreateEmployeeModal({
  open,
  onClose,
  onEmployeeCreated,
}: CreateEmployeeModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [employeeType, setEmployeeType] = useState<string>("NhanVien");
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    UserName: "",
    Password: "",
    HoTen: "",
    Email: "",
    HieuSuat: 100,
    CongViec: 0,
  });

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
    if (!formData.UserName) newErrors.UserName = "Vui lòng nhập tên đăng nhập";
    if (!formData.Password) newErrors.Password = "Vui lòng nhập mật khẩu";
    if (!formData.HoTen) newErrors.HoTen = "Vui lòng nhập họ tên";
    if (!formData.Email) newErrors.Email = "Vui lòng nhập email";
    if (!formData.Email.includes("@")) newErrors.Email = "Email không hợp lệ";
    if (formData.HieuSuat < 0 || formData.HieuSuat > 100)
      newErrors.HieuSuat = "Hiệu suất phải từ 0-100";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const employeeId =
        employeeType === "NhanVien"
          ? `NV${Math.floor(100 + Math.random() * 900)}`
          : `TX${Math.floor(100 + Math.random() * 900)}`;

      const basePayload = {
        UserName: formData.UserName,
        Password: formData.Password,
        HoTen: formData.HoTen,
        Email: formData.Email,
        HieuSuat: formData.HieuSuat,
        role: employeeType,
      };

      const extendedPayload =
        employeeType === "NhanVien"
          ? { ...basePayload, NhanVienID: employeeId }
          : {
              ...basePayload,
              TaiXeID: employeeId,
              CongViec: formData.CongViec,
            };

      // Type assertion here
      const createdEmployee = await employeeService.createUser(
        extendedPayload as TaiXe
      );

      dispatch(ADD_EMPLOYEE(createdEmployee));

      showNotification({
        title: "Thành công",
        message: `Đã thêm ${
          employeeType === "NhanVien" ? "nhân viên" : "tài xế"
        } mới thành công`,
        color: "green",
      });

      onEmployeeCreated();
      onClose();
      resetForm();
    } catch (error) {
      console.error("Error creating employee:", error);
      showNotification({
        title: "Lỗi",
        message: `Không thể thêm ${
          employeeType === "NhanVien" ? "nhân viên" : "tài xế"
        } mới`,
        color: "red",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      UserName: "",
      Password: "",
      HoTen: "",
      Email: "",
      HieuSuat: 100,
      CongViec: 0,
    });
    setEmployeeType("NhanVien");
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
            Thêm nhân viên/tài xế mới
          </Title>

          <Radio.Group
            value={employeeType}
            onChange={setEmployeeType}
            label="Loại nhân viên"
            mb="md"
          >
            <Group mt="xs">
              <Radio value="NhanVien" label="Nhân viên" />
              <Radio value="TaiXe" label="Tài xế" />
            </Group>
          </Radio.Group>

          <Grid gutter="xl">
            <Grid.Col span={6}>
              <TextInputCustom
                label="Tên đăng nhập"
                labelFontWeight="bold"
                placeHolder="Nhập tên đăng nhập"
                name="UserName"
                value={formData.UserName}
                setValue={(value) => handleInputChange("UserName", value)}
                error={errors.UserName}
                required
              />
            </Grid.Col>

            <Grid.Col span={6}>
              <TextInputCustom
                label="Mật khẩu"
                labelFontWeight="bold"
                placeHolder="Nhập mật khẩu"
                name="Password"
                value={formData.Password}
                setValue={(value) => handleInputChange("Password", value)}
                error={errors.Password}
                required
                type="password"
              />
            </Grid.Col>

            <Grid.Col span={12}>
              <TextInputCustom
                label="Họ và tên"
                labelFontWeight="bold"
                placeHolder="Nhập họ và tên"
                name="HoTen"
                value={formData.HoTen}
                setValue={(value) => handleInputChange("HoTen", value)}
                error={errors.HoTen}
                required
              />
            </Grid.Col>

            <Grid.Col span={12}>
              <TextInputCustom
                label="Email"
                labelFontWeight="bold"
                placeHolder="Nhập email"
                name="Email"
                value={formData.Email}
                setValue={(value) => handleInputChange("Email", value)}
                error={errors.Email}
                required
              />
            </Grid.Col>

            <Grid.Col span={6}>
              <TextInputCustom
                label="Hiệu suất (%)"
                labelFontWeight="bold"
                placeHolder="Nhập hiệu suất"
                name="HieuSuat"
                value={formData.HieuSuat.toString()}
                setValue={(value) => handleInputChange("HieuSuat", value)}
                error={errors.HieuSuat}
                required
                pattern="[0-9]*"
              />
            </Grid.Col>

            {employeeType === "TaiXe" && (
              <Grid.Col span={6}>
                <Text fw={500} mb="sm">
                  Tình trạng công việc
                </Text>
                <Select
                  data={[
                    { value: "0", label: "Rảnh" },
                    { value: "1", label: "Đang giao hàng" },
                    { value: "2", label: "Nghỉ phép" },
                  ]}
                  value={formData.CongViec.toString()}
                  onChange={(value) =>
                    handleInputChange("CongViec", value || "0")
                  }
                />
              </Grid.Col>
            )}
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
