"use client";
import { useEffect, useState } from "react";
import TransactionsTable from "@/app/transactions/components/TransactionsTable";
import { getTransactions } from "@/api/transactions/transactions";
import { getMerchants } from "@/api/merchants/merchants";
import { attachStoreNames } from "@/utils/calcTopStores";
import { Transaction } from "@/hooks/useTransactions";
import { mapTransactions } from "@/utils/mapTransactions";

export default function RecentTransactionsCard() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const { data: txData } = await getTransactions();
        const { data: storesData } = await getMerchants();

        const recent5 = txData.data.slice(0, 5);

        const top5WithNames = attachStoreNames(
          recent5.map((tx) => ({
            mchtCode: tx.mchtCode,
            totalAmount: Number(tx.amount),
          })),
          storesData.data
        );

        const tableData = mapTransactions(recent5, storesData.data).map((t) => {
          const store = top5WithNames.find((s) => s.mchtCode === t.code);
          return {
            ...t,
            merchant: store?.mchtName || t.merchant,
          };
        });

        setTransactions(tableData);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <article className="flex-1 rounded-xl shadow-md flex flex-col p-6 bg-white/80 backdrop-blur-sm border border-[#E5E7EB]">
      <h3 className="text-lg font-medium text-secondary mb-4">최근 거래 5건</h3>
      <div className="overflow-x-auto min-w-[600px]">
        <TransactionsTable transactions={transactions} />
      </div>
    </article>
  );
}
