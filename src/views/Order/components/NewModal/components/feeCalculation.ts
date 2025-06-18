export interface FeeCalculationParams {
  packageInfo: {
    length: number;
    width: number;
    height: number;
    weight: number;
  };
  deliveryMethod?: string;
  additionalServices?: string[];
}

export const calculateFees = ({
  packageInfo,
  deliveryMethod = "standard",
  additionalServices = [],
}: FeeCalculationParams) => {
  const { length, width, height, weight } = packageInfo;

  const volume = (length * width * height) / 5000;

  let baseFee = 0;
  switch (deliveryMethod) {
    case "express":
      baseFee = Math.max(volume, weight) * 15000;
      break;
    default:
      baseFee = Math.max(volume, weight) * 10000;
  }

  let serviceFee = 0;
  if (additionalServices.includes("insurance")) {
    serviceFee += 5000;
  }
  if (additionalServices.includes("codCheck")) {
    serviceFee += 3000;
  }

  const subtotal = baseFee + serviceFee;
  const vat = subtotal * 0.1;
  const total = subtotal + vat;

  return {
    baseFee: Math.round(baseFee),
    serviceFee: Math.round(serviceFee),
    vat: Math.round(vat),
    total: Math.round(total),
  };
};
