import { TransactionsResponse } from "@/api/transactions/transactions";
import { MerchantsResponse } from "@/api/merchants/merchants";

export function calcTopStores(transactions: TransactionsResponse[], topN = 5) {
  const storeSums: Record<string, number> = {};

  transactions.forEach((t) => {
    const amount = Number(t.amount || 0);
    if (storeSums[t.mchtCode]) {
      storeSums[t.mchtCode] += amount;
    } else {
      storeSums[t.mchtCode] = amount;
    }
  });

  const sortedStores = Object.entries(storeSums)
    .map(([mchtCode, totalAmount]) => ({ mchtCode, totalAmount }))
    .sort((a, b) => b.totalAmount - a.totalAmount)
    .slice(0, topN);

  return sortedStores;
}

export function attachStoreNames(
  topStores: { mchtCode: string; totalAmount: number }[],
  stores: MerchantsResponse[]
) {
  const storeMap = stores.reduce<Record<string, string>>((acc, s) => {
    acc[s.mchtCode] = s.mchtName;
    return acc;
  }, {});

  return topStores.map((s) => ({
    ...s,
    mchtName: storeMap[s.mchtCode] || s.mchtCode,
  }));
}
