import { useState, useEffect } from "react";
import { getTransactions } from "@/api/transactions/transactions";
import { getMerchants, MerchantsResponse } from "@/api/merchants/merchants";
import { mapTransactions } from "@/utils/mapTransactions";

export type Transaction = {
  code: string;
  merchant: string;
  amount: number;
  status: "성공" | "실패" | "대기" | "취소";
  paymentMethod: string;
  datetime: string;
};

export function useTransactions() {
  const [originalTransactions, setOriginalTransactions] = useState<
    Transaction[]
  >([]);
  const [stores, setStores] = useState<MerchantsResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [txRes, storesRes] = await Promise.all([
          getTransactions(),
          getMerchants(),
        ]);

        const parsed = mapTransactions(txRes.data.data, storesRes.data.data);
        setOriginalTransactions(parsed);
        setStores(storesRes.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return {
    originalTransactions,
    stores,
    loading,
  };
}
