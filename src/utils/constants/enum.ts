export enum PageSize {
  TEN = 1,
  TWENTY = 20,
  FIFTY = 50,
  HUNDRED = 100,
}

export const PAGE_SIZE_OPTIONS = [
  { value: PageSize.TEN.toString(), label: `${PageSize.TEN} orders/page` },
  {
    value: PageSize.TWENTY.toString(),
    label: `${PageSize.TWENTY} orders/page`,
  },
  { value: PageSize.FIFTY.toString(), label: `${PageSize.FIFTY} orders/page` },
  {
    value: PageSize.HUNDRED.toString(),
    label: `${PageSize.HUNDRED} orders/page`,
  },
];
