import React, { useState, useEffect } from "react";
import {
  Modal,
  TextInput,
  Select,
  NumberInput,
  Group,
  Button,
  Text,
} from "@mantine/core";
import { DoiTac } from "../../../api/type/PartnerType";
import { showNotification } from "@mantine/notifications";

interface EditPartnerModalProps {
  open: boolean;
  onClose: () => void;
  onUpdate: (DoiTacId: string, updateData: Partial<DoiTac>) => void;
  partnerData: DoiTac;
}

const EditPartnerModal: React.FC<EditPartnerModalProps> = ({
  open,
  onClose,
  onUpdate,
  partnerData,
}) => {
  const [formData, setFormData] = useState<Partial<DoiTac>>(partnerData);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFormData(partnerData);
  }, [partnerData]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await onUpdate(partnerData.DoiTacId, formData);
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <Modal
      opened={open}
      onClose={onClose}
      title="Cập nhật đối tác"
      size="lg"
      centered
    >
      <div style={{ padding: "20px" }}>
        <TextInput
          label="ID Đối tác"
          value={formData.DoiTacId}
          readOnly
          mb="md"
        />

        <TextInput
          label="Tên đối tác"
          placeholder="Nhập tên đối tác"
          value={formData.TenDoiTac}
          onChange={(e) =>
            setFormData({ ...formData, TenDoiTac: e.target.value })
          }
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
            setFormData({ ...formData, KieuDoiTac: value || "NhaCungCap" })
          }
          required
          mb="md"
        />

        <TextInput
          label="Người liên lạc"
          placeholder="Nhập tên người liên lạc"
          value={formData.NguoiLienLac}
          onChange={(e) =>
            setFormData({ ...formData, NguoiLienLac: e.target.value })
          }
          required
          mb="md"
        />

        <Group grow mb="md">
          <TextInput
            label="Số điện thoại"
            placeholder="Nhập số điện thoại"
            value={formData.SDT}
            onChange={(e) => setFormData({ ...formData, SDT: e.target.value })}
            required
          />
          <TextInput
            label="Email"
            placeholder="Nhập email"
            value={formData.Email}
            onChange={(e) =>
              setFormData({ ...formData, Email: e.target.value })
            }
            required
          />
        </Group>

        <TextInput
          label="Địa chỉ"
          placeholder="Nhập địa chỉ"
          value={formData.DiaChi}
          onChange={(e) => setFormData({ ...formData, DiaChi: e.target.value })}
          required
          mb="md"
        />

        <Group grow mb="md">
          <TextInput
            label="Số giấy phép"
            placeholder="Nhập số giấy phép"
            value={formData.SoGiayPhep}
            onChange={(e) =>
              setFormData({ ...formData, SoGiayPhep: e.target.value })
            }
            required
          />
          <NumberInput
            label="Sức chứa"
            placeholder="Nhập sức chứa"
            value={formData.SucChua}
            onChange={(value) =>
              setFormData({ ...formData, SucChua: Number(value) })
            }
            required
          />
        </Group>

        <TextInput
          label="Khu vực hoạt động"
          placeholder="Nhập khu vực hoạt động"
          value={formData.KhuVucHoatDong}
          onChange={(e) =>
            setFormData({ ...formData, KhuVucHoatDong: e.target.value })
          }
          required
          mb="md"
        />

        <Group justify="flex-end" mt="xl">
          <Button variant="default" onClick={onClose}>
            Hủy
          </Button>
          <Button onClick={handleSubmit} loading={loading}>
            Cập nhật
          </Button>
        </Group>
      </div>
    </Modal>
  );
};

export default EditPartnerModal;
