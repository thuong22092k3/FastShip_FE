import { Button, Group, NumberInput, Select, TextInput } from "@mantine/core";
import "@mantine/core/styles.css";
import { showNotification } from "@mantine/notifications";
import "@mantine/notifications/styles.css";
import React, { useState } from "react";
import { DoiTac } from "../../../api/type/PartnerType";

interface AddPartnerModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<DoiTac, "DoiTacId">, resetForm: () => void) => void;
}

const AddPartnerModal: React.FC<AddPartnerModalProps> = ({
  open,
  onClose,
  onSubmit,
}) => {
  const initialFormData = {
    TenDoiTac: "",
    KieuDoiTac: "NhaCungCap",
    NguoiLienLac: "",
    SDT: "",
    Email: "",
    DiaChi: "",
    SoGiayPhep: "",
    SucChua: 0,
    KhuVucHoatDong: "",
  };

  const [formData, setFormData] =
    useState<Omit<DoiTac, "DoiTacId">>(initialFormData);
  const [loading, setLoading] = useState(false);

  // Hàm reset form về trạng thái ban đầu
  const resetForm = () => {
    setFormData(initialFormData);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Truyền cả formData và hàm resetForm vào onSubmit
      await onSubmit(formData, resetForm);
    } catch (error) {
      showNotification({
        title: "Lỗi",
        message: "Có lỗi xảy ra khi thêm đối tác",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: keyof Omit<DoiTac, "DoiTacId">, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
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
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "24px",
          borderRadius: "8px",
          width: "80%",
          maxWidth: "800px",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2>Thêm đối tác mới</h2>

        <TextInput
          label="Tên đối tác"
          placeholder="Nhập tên đối tác"
          value={formData.TenDoiTac}
          onChange={(e) => handleChange("TenDoiTac", e.target.value)}
          required
          mb="md"
        />

        <Select
          label="Loại đối tác"
          placeholder="Chọn loại đối tác"
          data={[
            { value: "NhaCungCap", label: "Nhà cung cấp" },
            { value: "NhaPhanPhoi", label: "Nhà phân phối" },
            { value: "CongTyVanChuyen", label: "Công ty vận chuyển" },
            { value: "TrungTamBaoHanh", label: "Trung tâm bảo hành" },
            { value: "Khac", label: "Khác" },
          ]}
          value={formData.KieuDoiTac}
          onChange={(value) =>
            handleChange("KieuDoiTac", value || "NhaCungCap")
          }
          required
          mb="md"
          styles={{
            dropdown: {
              position: "fixed",
              zIndex: 1001,
            },
          }}
        />

        <TextInput
          label="Người liên lạc"
          placeholder="Nhập tên người liên lạc"
          value={formData.NguoiLienLac}
          onChange={(e) => handleChange("NguoiLienLac", e.target.value)}
          required
          mb="md"
        />

        <Group grow mb="md">
          <TextInput
            label="Số điện thoại"
            placeholder="Nhập số điện thoại"
            value={formData.SDT}
            onChange={(e) => handleChange("SDT", e.target.value)}
            required
          />
          <TextInput
            label="Email"
            placeholder="Nhập email"
            value={formData.Email}
            onChange={(e) => handleChange("Email", e.target.value)}
            required
          />
        </Group>

        <TextInput
          label="Địa chỉ"
          placeholder="Nhập địa chỉ"
          value={formData.DiaChi}
          onChange={(e) => handleChange("DiaChi", e.target.value)}
          required
          mb="md"
        />

        <Group grow mb="md">
          <TextInput
            label="Số giấy phép"
            placeholder="Nhập số giấy phép"
            value={formData.SoGiayPhep}
            onChange={(e) => handleChange("SoGiayPhep", e.target.value)}
            required
          />
          <NumberInput
            label="Sức chứa"
            placeholder="Nhập sức chứa"
            value={formData.SucChua}
            onChange={(value) => handleChange("SucChua", Number(value))}
            required
          />
        </Group>

        <TextInput
          label="Khu vực hoạt động"
          placeholder="Nhập khu vực hoạt động"
          value={formData.KhuVucHoatDong}
          onChange={(e) => handleChange("KhuVucHoatDong", e.target.value)}
          required
          mb="md"
        />

        <Group justify="flex-end" mt="xl">
          <Button variant="default" onClick={onClose}>
            Hủy
          </Button>
          <Button onClick={handleSubmit} loading={loading}>
            Thêm mới
          </Button>
        </Group>
      </div>
    </div>
  );
};

export default AddPartnerModal;
