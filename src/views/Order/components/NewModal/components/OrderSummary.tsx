import { Paper, Text, Title } from "@mantine/core";

interface OrderSummaryProps {
  fees: {
    baseFee: number;
    serviceFee?: number;
    vat: number;
    total: number;
    insuranceFee?: number;
    serviceFees?: {
      codCheck: number;
      viewBeforePay: number;
    };
  };
  packageInfo: {
    length: number;
    width: number;
    height: number;
    weight: number;
  };
  deliveryMethod?: string;
  additionalServices?: string[];
}

const OrderSummary = ({
  fees,
  packageInfo,
  deliveryMethod,
  additionalServices,
}: OrderSummaryProps) => {
  const hasPackageInfo =
    packageInfo.length > 0 &&
    packageInfo.width > 0 &&
    packageInfo.height > 0 &&
    packageInfo.weight > 0;

  return (
    <Paper p="md" withBorder radius="md" shadow="sm">
      <Title order={5} mb="sm">
        Thông tin kiện hàng
      </Title>
      <Text>
        Kích thước: {packageInfo.length}x{packageInfo.width}x
        {packageInfo.height}cm
      </Text>
      <Text>Cân nặng: {packageInfo.weight}kg</Text>

      {deliveryMethod && (
        <>
          <Title order={5} mt="md" mb="sm">
            Dịch vụ
          </Title>
          <Text>
            Phương thức:{" "}
            {deliveryMethod === "standard" ? "Tiêu chuẩn" : "Hỏa tốc"}
          </Text>
          {additionalServices?.includes("insurance") && (
            <Text>Bảo hiểm: Có</Text>
          )}
          {additionalServices?.includes("codCheck") && (
            <Text>Đồng kiểm: Có</Text>
          )}
          {additionalServices?.includes("viewBeforePay") && (
            <Text>Xem hàng: Có</Text>
          )}
        </>
      )}

      {hasPackageInfo && (
        <>
          <Title order={5} mt="md" mb="sm">
            Chi phí
          </Title>
          <Text>Phí vận chuyển: {fees.baseFee.toLocaleString()}đ</Text>

          {fees.serviceFee && fees.serviceFee > 0 && (
            <Text>Phí dịch vụ: {fees.serviceFee.toLocaleString()}đ</Text>
          )}

          {fees.insuranceFee && fees.insuranceFee > 0 && (
            <Text>Phí bảo hiểm: {fees.insuranceFee.toLocaleString()}đ</Text>
          )}

          {fees.serviceFees?.codCheck && fees.serviceFees.codCheck > 0 && (
            <Text>
              Phí đồng kiểm: {fees.serviceFees.codCheck.toLocaleString()}đ
            </Text>
          )}

          {fees.serviceFees?.viewBeforePay &&
            fees.serviceFees.viewBeforePay > 0 && (
              <Text>
                Phí xem hàng: {fees.serviceFees.viewBeforePay.toLocaleString()}đ
              </Text>
            )}

          <Text>VAT (10%): {fees.vat.toLocaleString()}đ</Text>

          <Text fw="bold" size="lg" mt="sm">
            Tổng cộng: {fees.total.toLocaleString()}đ
          </Text>
        </>
      )}

      {!hasPackageInfo && (
        <Text c="dimmed" mt="md">
          Vui lòng nhập đầy đủ thông tin kiện hàng để xem chi phí
        </Text>
      )}
    </Paper>
  );
};

export default OrderSummary;
