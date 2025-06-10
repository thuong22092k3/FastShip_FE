import {
  Box,
  Checkbox,
  Radio,
  Select,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { Order } from "../../../../../api/type/OrderType";

interface Props {
  formData: Partial<Order>;
  errors?: Record<string, string>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCheckboxChange?: (value: string) => void;
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
}: Props) => {
  //   const selectedServices = formData.additionalServices || [];

  return (
    <Stack gap="md">
      <Box>
        <Title order={5} c="blue">
          Dịch vụ giao hàng
        </Title>
        <Text fw={500} mt="sm">
          Hình thức giao hàng
        </Text>
        <Select
          name="deliveryMethod"
          placeholder="Chọn hình thức"
          data={DELIVERY_METHODS}
          //   value={formData.deliveryMethod || ""}
          //   onChange={(value) =>
          //     handleInputChange({
          //       target: {
          //         name: "deliveryMethod",
          //         value,
          //       } as React.ChangeEvent<HTMLInputElement>,
          //     })
          //   }
          error={errors?.deliveryMethod}
        />
      </Box>

      <Box>
        <Text fw={500}>Người trả phí</Text>
        <Radio.Group
          name="payer"
          //   value={formData.payer || ""}
          //   onChange={(value) =>
          //     handleInputChange({
          //       target: {
          //         name: "payer",
          //         value,
          //       } as React.ChangeEvent<HTMLInputElement>,
          //     })
          //   }
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
              //   checked={selectedServices.includes(service.value)}
              onChange={() => handleCheckboxChange?.(service.value)}
            />
          ))}
        </Stack>
      </Box>
    </Stack>
  );
};

export default DeliveryServiceStep;
