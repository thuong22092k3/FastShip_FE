import { Paper, Text, Title } from "@mantine/core";

interface OrderSummaryProps {
  fees: {
    baseFee?: number;
    vat?: number;
    total?: number;
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
}

const OrderSummary = ({ fees, packageInfo }: OrderSummaryProps) => {
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

      {hasPackageInfo && (
        <>
          <Title order={5} mt="md" mb="sm">
            Chi phí
          </Title>

          {fees.baseFee !== undefined && (
            <Text>Phí vận chuyển: {fees.baseFee?.toLocaleString()}đ</Text>
          )}
          {fees.insuranceFee && (
            <Text>Phí bảo hiểm: {fees.insuranceFee.toLocaleString()}đ</Text>
          )}
          {fees.serviceFees?.codCheck && (
            <Text>
              Phí đồng kiểm: {fees.serviceFees.codCheck.toLocaleString()}đ
            </Text>
          )}
          {fees.serviceFees?.viewBeforePay && (
            <Text>
              Phí xem hàng: {fees.serviceFees.viewBeforePay.toLocaleString()}đ
            </Text>
          )}
          {fees.vat !== undefined && (
            <Text>VAT (10%): {fees.vat.toLocaleString()}đ</Text>
          )}
          {fees.total !== undefined && (
            <Text fw="bold" size="lg" mt="sm">
              Tổng cộng: {fees.total.toLocaleString()}đ
            </Text>
          )}
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
