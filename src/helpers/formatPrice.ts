export function formatPrice(price: number, withCurrency = false): string {
  const formatted = price.toFixed(2).replace(".", ",");
  return withCurrency ? `R$ ${formatted}` : formatted;
}
