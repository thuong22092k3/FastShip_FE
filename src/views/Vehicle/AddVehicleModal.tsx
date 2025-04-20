import {
  Box,
  Button,
  FileInput,
  Grid,
  Group,
  LoadingOverlay,
  Paper,
  Select,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useState } from "react";
import { Vehicle } from "../../api/type/VehicleType";
import { vehicleService } from "../../api/service/VehicleService";
import { useDispatch } from "react-redux";
import { ADD_VEHICLE } from "../../state_management/actions/actions";

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
  const [registrationDoc, setRegistrationDoc] = useState<File | null>(null);
  const [insuranceDoc, setInsuranceDoc] = useState<File | null>(null);
  const [maintenanceDoc, setMaintenanceDoc] = useState<File | null>(null);

  const [formData, setFormData] = useState<Partial<Vehicle>>({
    TrangThai: "Active",
    BaoDuong: "Đã bảo dưỡng",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.HangXe) newErrors.HangXe = "Vui lòng nhập hãng xe";
    if (!formData.BienSo) newErrors.BienSo = "Vui lòng nhập biển số";
    if (!formData.LoaiXe) newErrors.LoaiXe = "Vui lòng nhập loại xe";
    if (!formData.SucChua) newErrors.SucChua = "Vui lòng nhập sức chứa";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const dispatch = useDispatch();
  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const payload = {
        HangXe: formData.HangXe || "",
        TaiXeId: formData.TaiXeId || "TX001",
        BienSo: formData.BienSo || "",
        LoaiXe: formData.LoaiXe || "",
        SucChua: formData.SucChua || 0,
        TrangThai: formData.TrangThai || "Active",
        BaoDuong: formData.BaoDuong || "Đã bảo dưỡng",
      };

      const createdVehicle = await vehicleService.createVehicle(payload);
      dispatch(ADD_VEHICLE(createdVehicle));
      onVehicleCreated();
      onClose();
    } catch (error) {
      console.error("Error creating vehicle:", error);
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
            Add Vehicle
          </Title>

          <Box mb="xl">
            <Text fw={500} mb="sm">
              Made by
            </Text>
            <TextInput
              placeholder="Enter vehicle manufacturer"
              name="HangXe"
              value={formData.HangXe || ""}
              onChange={handleInputChange}
              error={errors.HangXe}
              required
            />
          </Box>

          <Grid gutter="xl">
            <Grid.Col span={6}>
              <Text fw={500} mb="sm">
                License Plate no
              </Text>
              <TextInput
                placeholder="Enter license plate"
                name="BienSo"
                value={formData.BienSo || ""}
                onChange={handleInputChange}
                error={errors.BienSo}
                required
              />
            </Grid.Col>

            <Grid.Col span={6}>
              <Text fw={500} mb="sm">
                Status
              </Text>
              <Select
                data={[
                  { value: "Active", label: "Active" },
                  { value: "Inactive", label: "Inactive" },
                  { value: "Maintenance", label: "Maintenance" },
                ]}
                value={formData.TrangThai}
                onChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    TrangThai: value || "Active",
                  }))
                }
              />
            </Grid.Col>

            <Grid.Col span={6}>
              <Text fw={500} mb="sm">
                Model
              </Text>
              <TextInput
                placeholder="Enter model"
                name="LoaiXe"
                value={formData.LoaiXe || ""}
                onChange={handleInputChange}
                error={errors.LoaiXe}
                required
              />
            </Grid.Col>

            <Grid.Col span={6}>
              <Text fw={500} mb="sm">
                VI number
              </Text>
              <TextInput
                placeholder="Enter VI number"
                name="SucChua"
                value={formData.SucChua?.toString() || ""}
                onChange={handleInputChange}
                error={errors.SucChua}
                required
              />
            </Grid.Col>
          </Grid>

          <Box mt="xl">
            <Title order={4} mb="md">
              Upload documents
            </Title>

            <Paper withBorder p="md" mb="md">
              <Text fw={500} mb="sm">
                Vehicle Registration
              </Text>
              <Group mb="sm">
                <FileInput
                  placeholder="Insurance"
                  value={insuranceDoc}
                  onChange={setInsuranceDoc}
                />
                <FileInput
                  placeholder="Upload document"
                  value={registrationDoc}
                  onChange={setRegistrationDoc}
                />
              </Group>
            </Paper>

            <Paper withBorder p="md">
              <Text fw={500} mb="sm">
                Maintenance Record
              </Text>
              <FileInput
                placeholder="Upload document"
                value={maintenanceDoc}
                onChange={setMaintenanceDoc}
                mb="md"
              />
            </Paper>
          </Box>

          <Group justify="flex-end" mt="xl">
            <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} color="green" loading={isSubmitting}>
              Submit
            </Button>
          </Group>
        </div>
      </div>
    </div>
  );
}
