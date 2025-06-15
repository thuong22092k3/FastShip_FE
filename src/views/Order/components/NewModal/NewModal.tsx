import {
  Box,
  Button,
  Grid,
  Group,
  LoadingOverlay,
  Paper,
  Stepper,
  Title,
} from "@mantine/core";
import "@mantine/core/styles.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { orderService } from "../../../../api/service/OrderService";
import { Order } from "../../../../api/type/OrderType";
import { ADD_ORDER } from "../../../../state_management/actions/actions";
import ConfirmationStep from "./components/ConfirmationStep";
import DeliveryServiceStep from "./components/DeliveryServiceStep";
import OrderInfoStep from "./components/OrderInfoStep";
import OrderSummary from "./components/OrderSummary";
import PackageInfoStep from "./components/PackageInfoStep";

// src/components/order/NewModal.tsx
interface NewModalProps {
  open: boolean;
  onClose: () => void;
  onOrderCreated: () => void;
}

// Package information interface
interface PackageInfo {
  length: number;
  width: number;
  height: number;
  weight: number;
}

const calculateFees = (packageInfo: PackageInfo) => {
  const { length, width, height, weight } = packageInfo;
  const volume = length * width * height;
  const baseFee = Math.max(volume * 0.0001, weight * 5000, 15000);
  const vat = baseFee * 0.1;
  const total = baseFee + vat;

  return {
    baseFee: Math.round(baseFee),
    vat: Math.round(vat),
    total: Math.round(total),
  };
};

export default function NewModal({
  open,
  onClose,
  onOrderCreated,
}: NewModalProps) {
  const [active, setActive] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [packageInfo, setPackageInfo] = useState<PackageInfo>({
    length: 20,
    width: 15,
    height: 10,
    weight: 1,
  });

  const [formData, setFormData] = useState<Partial<Order>>({
    TrangThai: "Chờ xác nhận",
    CuocPhi: 0,
    NguoiGui: "CÔNG TY TNHH MORIMURA BROS. (VIETNAM)",
    DiaChiLayHang: "123 Đường ABC, Quận 1, TP.HCM",
  });

  // Calculate fees based on package info
  const fees = calculateFees(packageInfo);

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
  // const handleSubmit = async () => {
  //   if (!validateForm()) return;

  //   setIsSubmitting(true);
  //   try {
  //     const payload = {
  //       NhanVienId: formData.NhanVienID || "NV001",
  //       NguoiGui: formData.NguoiGui || "",
  //       NguoiNhan: formData.NguoiNhan || "",
  //       SDT: formData.SDT || "",
  //       DiaChiLayHang: formData.DiaChiLayHang || "",
  //       DiaChiGiaoHang: formData.DiaChiGiaoHang || "",
  //       CuocPhi: fees.total,
  //       TrangThai: formData.TrangThai || "Chờ xác nhận",
  //       GhiChu: formData.GhiChu || "",
  //       KichThuoc: `${packageInfo.length}x${packageInfo.width}x${packageInfo.height}cm`,
  //       CanNang: packageInfo.weight,
  //       deliveryMethod: formData.deliveryMethod || "standard",
  //       payer: formData.payer || "sender",
  //       additionalServices: formData.additionalServices || [],
  //       packageInfo: {
  //         length: packageInfo.length,
  //         width: packageInfo.width,
  //         height: packageInfo.height,
  //         weight: packageInfo.weight,
  //       },
  //       CreatedAt: new Date().toISOString(),
  //       UpdatedAt: new Date().toISOString(),
  //     };

  //     const createdOrder = await orderService.createOrder(payload);
  //     dispatch(ADD_ORDER(createdOrder));
  //     onOrderCreated();
  //     onClose();
  //   } catch (error) {
  //     console.error("Error creating order:", error);
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const payload = {
        NhanVienId: formData.NhanVienID || "NV001",
        NguoiGui: formData.NguoiGui || "",
        NguoiNhan: formData.NguoiNhan || "",
        SDT: formData.SDT || "",
        DiaChiLayHang: formData.DiaChiLayHang || "",
        DiaChiGiaoHang: formData.DiaChiGiaoHang || "",
        CuocPhi: fees.total,
        TrangThai: formData.TrangThai || "Chờ xác nhận",
        GhiChu: formData.GhiChu || "",
        deliveryMethod: formData.deliveryMethod || "standard",
        payer: formData.payer || "sender",
        additionalServices: formData.additionalServices || [],
        packageType: formData.packageType || "parcel",
        packageInfo: {
          length: packageInfo.length,
          width: packageInfo.width,
          height: packageInfo.height,
          weight: packageInfo.weight,
        },
        CreatedAt: new Date().toISOString(),
        UpdatedAt: new Date().toISOString(),
      };

      const createdOrder = await orderService.createOrder(payload);
      dispatch(ADD_ORDER(createdOrder));
      onOrderCreated();
      onClose();
    } catch (error) {
      console.error("Error creating order:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleSelectChange = (name: string, value: string | null) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
                    description="Thông tin đơn hàng"
                  />
                  <Stepper.Step
                    label="Bước 2"
                    description="Thông tin kiện hàng"
                  />
                  <Stepper.Step
                    label="Bước 3"
                    description="Hình thức giao hàng"
                  />
                  <Stepper.Step label="Bước 4" description="Xác nhận" />
                </Stepper>

                <Box mt="xl">
                  {active === 0 && (
                    <OrderInfoStep
                      formData={formData}
                      errors={errors}
                      handleInputChange={handleInputChange}
                    />
                  )}

                  {active === 1 && (
                    <PackageInfoStep
                      packageInfo={packageInfo}
                      setPackageInfo={setPackageInfo}
                    />
                  )}
                  {active === 2 && (
                    <DeliveryServiceStep
                      formData={formData}
                      handleInputChange={handleInputChange}
                      handleSelectChange={handleSelectChange}
                    />
                  )}
                  {active === 3 && (
                    <ConfirmationStep
                      formData={formData}
                      packageInfo={packageInfo}
                      fees={fees}
                    />
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
                    {active < 3 ? (
                      <Button
                        onClick={() => {
                          if (active === 0 && !validateForm()) return;
                          setActive((prev) => prev + 1);
                        }}
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
              <OrderSummary
                fees={fees}
                packageInfo={{
                  length: 0,
                  width: 0,
                  height: 0,
                  weight: 0,
                }}
              />
            </Grid.Col>
          </Grid>
        </div>
      </div>
    </div>
  );
}
