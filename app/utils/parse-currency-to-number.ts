export const parseCurrencyToNumber = (
  value?: string | number
): number | undefined => {
  if (!value) {
    return undefined;
  }

  const parseToNumber =
    typeof value === "string" ? Number(value.replace(",", ".").trim()) : value;

  return isNaN(parseToNumber) ? undefined : parseToNumber;
};
