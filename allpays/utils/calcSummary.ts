import { TransactionsResponse } from "@/api/transactions/transactions";

export function calcSummary(transactions: TransactionsResponse[]) {
  const totalAmount = transactions.reduce(
    (sum, t) => sum + Number(t.amount || 0),
    0
  );

  const totalCount = transactions.length;

  const successCount = transactions.filter(
    (t) => t.status === "SUCCESS"
  ).length;

  const successRate = totalCount > 0 ? (successCount / totalCount) * 100 : 0;

  const cancelAmount = transactions
    .filter((t) => t.status === "CANCELLED")
    .reduce((sum, t) => sum + Number(t.amount || 0), 0);

  return { totalAmount, totalCount, successRate, cancelAmount };
}
