import {
  Box,
  Checkbox,
  NativeSelect,
  Radio,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { JSX } from "react";
import { AdditionalService, Order } from "../../../../../api/type/OrderType";

interface Props {
  formData: Partial<Order>;
  errors?: Record<string, string>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCheckboxChange?: (value: string) => void;
  handleSelectChange?: (name: string, value: string | null) => void;
}

const DELIVERY_METHODS = [
  { value: "standard", label: "Giao tiêu chuẩn" },
  { value: "express", label: "Giao hỏa tốc" },
];

const PAYERS = [
  { value: "sender", label: "Người gửi trả" },
  { value: "receiver", label: "Người nhận trả" },
];

const ADDITIONAL_SERVICES = [
  { value: "viewBeforePay", label: "Cho xem hàng" },
  { value: "codCheck", label: "Đồng kiểm" },
  { value: "insurance", label: "Bảo hiểm hàng hóa" },
];

const DeliveryServiceStep = ({
  formData,
  errors,
  handleInputChange,
  handleCheckboxChange,
  handleSelectChange,
}: Props): JSX.Element => {
  const selectedServices = formData.additionalServices || [];

  const handleDeliveryMethodChange = (value: string | null) => {
    if (handleSelectChange) {
      handleSelectChange("deliveryMethod", value);
    } else {
      handleInputChange({
        target: {
          name: "deliveryMethod",
          value: value || "",
        },
      } as React.ChangeEvent<HTMLInputElement>);
    }
  };

  const handlePayerChange = (value: string) => {
    handleInputChange({
      target: {
        name: "payer",
        value,
      },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  const handleAdditionalServicesChange = (values: AdditionalService[]) => {
    if (handleSelectChange) {
      handleSelectChange("additionalServices", values as any);
    }
  };

  const handleServiceChange = (value: AdditionalService) => {
    let newServices = [...selectedServices];
    if (newServices.includes(value)) {
      newServices = newServices.filter((service) => service !== value);
    } else {
      newServices.push(value);
    }
    handleAdditionalServicesChange(newServices);
  };
  console.log("deliveryMethod value:", formData.deliveryMethod);
  return (
    <Stack gap="md">
      <Box>
        <Title order={5} c="blue">
          Dịch vụ giao hàng
        </Title>

        {/* <Select id="select" value="20">
          <MenuItem value="10">Ten</MenuItem>
          <MenuItem value="20">Twenty</MenuItem>
        </Select> */}
        <NativeSelect
          label="Hình thức giao hàng"
          data={[{ value: "", label: "Chọn hình thức" }, ...DELIVERY_METHODS]}
          value={formData.deliveryMethod || ""}
          onChange={(e) => handleDeliveryMethodChange(e.target.value || null)}
          required
          mb="md"
        />
        {/* <Text>hello</Text>
        <Select
          label="Hình thức giao hàng"
          placeholder="Chọn hình thức"
          data={[
            { value: "standard", label: "Giao tiêu chuẩn" },
            { value: "express", label: "Giao hỏa tốc" },
            { value: "Khac", label: "Khác" },
          ]}
          value={formData.deliveryMethod}
          onChange={(value) =>
            handleSelectChange
              ? handleSelectChange("deliveryMethod", value)
              : handleInputChange({
                  target: {
                    name: "deliveryMethod",
                    value: value || "",
                  },
                } as React.ChangeEvent<HTMLInputElement>)
          }
          required
          mb="md"
        /> */}
      </Box>

      <Box>
        <Text fw={500}>Người trả phí</Text>
        <Radio.Group
          name="payer"
          value={formData.payer || ""}
          onChange={handlePayerChange}
        >
          <Stack mt="xs">
            {PAYERS.map((p) => (
              <Radio key={p.value} value={p.value} label={p.label} />
            ))}
          </Stack>
        </Radio.Group>
      </Box>

      <Box>
        <Text fw={500}>Dịch vụ thêm</Text>
        <Stack gap={4} mt="xs">
          {ADDITIONAL_SERVICES.map((service) => (
            <Checkbox
              key={service.value}
              label={service.label}
              checked={selectedServices.includes(
                service.value as AdditionalService
              )}
              onChange={() =>
                handleServiceChange(service.value as AdditionalService)
              }
            />
          ))}
        </Stack>
      </Box>
    </Stack>
  );
};

export default DeliveryServiceStep;
