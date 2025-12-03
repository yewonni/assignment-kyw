"use client";

import { useEffect, useState } from "react";
import { getTransactions } from "@/api/transactions/transactions";
import { getMerchants } from "@/api/merchants/merchants";
import { calcTopStores, attachStoreNames } from "@/utils/calcTopStores";

interface TopStoreItem {
  mchtCode: string;
  mchtName: string;
  totalAmount: number;
}

export default function TopStoreList() {
  const [topStores, setTopStores] = useState<TopStoreItem[]>([]);

  useEffect(() => {
    const fetchTopStores = async () => {
      try {
        const { data: txData } = await getTransactions();
        const { data: storesData } = await getMerchants();

        const top5 = calcTopStores(txData.data);
        const top5WithName = attachStoreNames(top5, storesData.data);

        setTopStores(top5WithName);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTopStores();
  }, []);

  return (
    <article className="flex-1 flex flex-col gap-3">
      <h3 className="text-[#1E3A5F] font-semibold mb-2">거래 상위 가맹점</h3>

      {topStores.map((store, idx) => (
        <div
          key={idx}
          className="flex justify-between py-3 px-4 rounded-xl shadow-sm bg-white border border-[#cbd5e1]"
        >
          <span className="text-[#1E3A5F] font-medium">{store.mchtName}</span>
          <span className="text-primary font-bold">
            ₩ {store.totalAmount.toLocaleString()}
          </span>
        </div>
      ))}
    </article>
  );
}
