import { Grid, NumberInput, Text, Title } from "@mantine/core";

interface PackageInfo {
  length: number;
  width: number;
  height: number;
  weight: number;
}

interface Props {
  packageInfo: PackageInfo;
  setPackageInfo: React.Dispatch<React.SetStateAction<PackageInfo>>;
  additionalServices?: string[];
}

const calculateFee = (packageInfo: PackageInfo, services: string[] = []) => {
  const { length, width, height, weight } = packageInfo;
  const volume = (length * width * height) / 5000;
  const baseFee = Math.max(volume, weight) * 10000;

  let serviceFee = 0;
  if (services?.includes("insurance")) serviceFee += 5000;
  if (services?.includes("codCheck")) serviceFee += 3000;

  return baseFee + serviceFee;
};

const PackageInfoStep = ({
  packageInfo,
  setPackageInfo,
  additionalServices,
}: Props) => {
  const fee = calculateFee(packageInfo, additionalServices);

  return (
    <>
      <Title order={5} c="blue">
        Thông tin kiện hàng
      </Title>
      <Grid mt="sm">
        {["length", "width", "height", "weight"].map((key) => (
          <Grid.Col span={6} key={key}>
            <NumberInput
              label={
                key === "length"
                  ? "Dài (cm)"
                  : key === "width"
                  ? "Rộng (cm)"
                  : key === "height"
                  ? "Cao (cm)"
                  : "Cân nặng (kg)"
              }
              value={packageInfo[key as keyof PackageInfo]}
              onChange={(value) =>
                setPackageInfo((prev) => ({
                  ...prev,
                  [key]: Number(value),
                }))
              }
              min={key === "weight" ? 0.1 : 1}
              step={key === "weight" ? 0.1 : 1}
              required
            />
          </Grid.Col>
        ))}
      </Grid>
      <Text mt="md" fw={500}>
        Chi phí ước tính: {fee.toLocaleString()} VND
      </Text>
    </>
  );
};

export default PackageInfoStep;
