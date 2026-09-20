export const saleConfig = {
  domain: "calltoagent.com",
  price: 15_000,
  currency: "EUR",
  contactEmail: "support@calltoagent.com",
  escrowUrl: process.env.ESCROW_PURCHASE_URL ?? "",
} as const;

export const formattedPrice = new Intl.NumberFormat("en-IE", {
  style: "currency",
  currency: saleConfig.currency,
  maximumFractionDigits: 0,
}).format(saleConfig.price);
