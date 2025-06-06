import {
  Box,
  Button,
  Grid,
  Group,
  Paper,
  Stepper,
  TextInput,
  Text,
  Title,
  LoadingOverlay,
} from "@mantine/core";
import "@mantine/core/styles.css";
import { useState } from "react";
import { Order } from "../../api/type/OrderType";
import { orderService } from "../../api/service/OrderService";
import { useDispatch } from "react-redux";
import { ADD_ORDER } from "../../state_management/actions/actions";
interface NewModalProps {
  open: boolean;
  onClose: () => void;
  onOrderCreated: () => void;
}

export default function NewModal({
  open,
  onClose,
  onOrderCreated,
}: NewModalProps) {
  const [active, setActive] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState<Partial<Order>>({
    TrangThai: "Chờ xác nhận",
    CuocPhi: 50000,
    NguoiGui: "CÔNG TY TNHH MORIMURA BROS. (VIETNAM)",
    DiaChiLayHang: "123 Đường ABC, Quận 1, TP.HCM",
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
    if (!formData.NguoiNhan)
      newErrors.NguoiNhan = "Vui lòng nhập tên người nhận";
    if (!formData.SDT) newErrors.SDT = "Vui lòng nhập số điện thoại";
    if (!formData.DiaChiGiaoHang)
      newErrors.DiaChiGiaoHang = "Vui lòng nhập địa chỉ giao hàng";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const dispatch = useDispatch();
  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const payload = {
        NhanVienID: formData.NhanVienID || "NV001",
        NguoiGui: formData.NguoiGui || "",
        NguoiNhan: formData.NguoiNhan || "",
        SDT: formData.SDT || "",
        DiaChiLayHang: formData.DiaChiLayHang || "",
        DiaChiGiaoHang: formData.DiaChiGiaoHang || "",
        CuocPhi: formData.CuocPhi || 0,
        TrangThai: formData.TrangThai || "Chờ xác nhận",
        GhiChu: formData.GhiChu || "",
      };

      console.log("Payload gửi lên:", payload);

      // const createdOrder = await orderService.createOrder(payload);
      // dispatch(ADD_ORDER(createdOrder));
      onOrderCreated();
      onClose();
    } catch (error) {
      console.error("Error creating order:", error);
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
          width: "80%",
          maxHeight: "90vh",
          borderRadius: "8px",
          overflow: "auto",
          position: "relative",
        }}
      >
        <LoadingOverlay visible={isSubmitting} />
        <div style={{ padding: "20px", position: "relative" }}>
          <button
            onClick={onClose}
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
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
            Tạo đơn hàng mới
          </Title>

          <Grid gutter="md">
            <Grid.Col span={{ base: 12, md: 8 }}>
              <Paper p="md" withBorder radius="md" shadow="sm">
                <Stepper
                  active={active}
                  onStepClick={setActive}
                  allowNextStepsSelect={false}
                >
                  <Stepper.Step
                    label="Bước 1"
                    description="Thông tin người nhận"
                  />
                  <Stepper.Step
                    label="Bước 2"
                    description="Địa chỉ giao hàng"
                  />
                  <Stepper.Step label="Bước 3" description="Xác nhận" />
                </Stepper>

                <Box mt="xl">
                  {active === 0 && (
                    <>
                      <Title order={5} c="blue">
                        Thông tin người gửi
                      </Title>
                      <TextInput
                        label="Địa chỉ KH"
                        name="NguoiGui"
                        value={formData.NguoiGui}
                        onChange={handleInputChange}
                        readOnly
                        mt="sm"
                      />
                      {/* <Grid>
                        <Grid.Col span={6}>
                          <TextInput
                            label="Đại diện gửi"
                            name="DaiDienGui"
                            value={formData.DaiDienGui || ""}
                            onChange={handleInputChange}
                            mt="sm"
                          />
                        </Grid.Col>
                      </Grid> */}

                      <Box mt="md">
                        <Title order={5} c="blue">
                          Thông tin người nhận
                        </Title>
                        <TextInput
                          label="Số điện thoại *"
                          name="SDT"
                          value={formData.SDT || ""}
                          onChange={handleInputChange}
                          error={errors.SDT}
                          required
                          mt="sm"
                        />
                        <TextInput
                          label="Họ và tên *"
                          name="NguoiNhan"
                          value={formData.NguoiNhan || ""}
                          onChange={handleInputChange}
                          error={errors.NguoiNhan}
                          required
                          mt="sm"
                        />
                      </Box>
                    </>
                  )}

                  {active === 1 && (
                    <>
                      <Title order={5} c="blue">
                        Địa chỉ giao hàng
                      </Title>
                      <TextInput
                        label="Địa chỉ *"
                        name="DiaChiGiaoHang"
                        value={formData.DiaChiGiaoHang || ""}
                        onChange={handleInputChange}
                        error={errors.DiaChiGiaoHang}
                        required
                        mt="sm"
                      />

                      <TextInput
                        label="Ghi chú"
                        name="GhiChu"
                        value={formData.GhiChu || ""}
                        onChange={handleInputChange}
                        mt="sm"
                      />
                    </>
                  )}

                  {active === 2 && (
                    <Box>
                      <Title order={5} c="blue" mb="md">
                        Xác nhận thông tin
                      </Title>
                      <Text>Người nhận: {formData.NguoiNhan}</Text>
                      <Text>SĐT: {formData.SDT}</Text>
                      <Text>Địa chỉ: {formData.DiaChiGiaoHang}</Text>
                      <Text>Ghi chú: {formData.GhiChu || "Không có"}</Text>
                      <Text mt="sm" fw={500}>
                        Cước phí: {formData.CuocPhi?.toLocaleString()} VND
                      </Text>
                    </Box>
                  )}

                  <Group justify="flex-end" mt="xl">
                    {active > 0 && (
                      <Button
                        variant="outline"
                        onClick={() => setActive((prev) => prev - 1)}
                        disabled={isSubmitting}
                      >
                        Quay lại
                      </Button>
                    )}
                    {active < 2 ? (
                      <Button
                        onClick={() => setActive((prev) => prev + 1)}
                        disabled={isSubmitting}
                      >
                        Tiếp theo
                      </Button>
                    ) : (
                      <Button
                        onClick={handleSubmit}
                        color="green"
                        loading={isSubmitting}
                      >
                        Xác nhận tạo đơn
                      </Button>
                    )}
                  </Group>
                </Box>
              </Paper>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 4 }}>
              <Paper p="md" withBorder radius="md" shadow="sm">
                <Title order={5}>Chi phí đơn hàng</Title>
                <Box mt="sm">
                  <Group justify="space-between">
                    <Text>Chuyển phát nhanh</Text>
                    <Text>{formData.CuocPhi?.toLocaleString()} VND</Text>
                  </Group>
                  <hr />
                  <Group justify="space-between" mt="sm">
                    <Text fw={600}>Tổng tiền</Text>
                    <Text fw={600}>
                      {formData.CuocPhi?.toLocaleString()} VND
                    </Text>
                  </Group>
                </Box>
              </Paper>
            </Grid.Col>
          </Grid>
        </div>
      </div>
    </div>
  );
}
