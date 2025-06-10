import { Grid, NumberInput, Title } from "@mantine/core";

interface PackageInfo {
  length: number;
  width: number;
  height: number;
  weight: number;
}

interface Props {
  packageInfo: PackageInfo;
  setPackageInfo: React.Dispatch<React.SetStateAction<PackageInfo>>;
}

const PackageInfoStep = ({ packageInfo, setPackageInfo }: Props) => (
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
  </>
);

export default PackageInfoStep;
