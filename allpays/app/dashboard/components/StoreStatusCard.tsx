"use client";

import { useEffect, useState } from "react";
import { getMerchants, MerchantsResponse } from "@/api/merchants/merchants";

interface StoreStatusItem {
  label: string;
  value: number;
  bg: string;
}

export default function StoreStatusCard() {
  const [storeStatusItems, setStoreStatusItems] = useState<StoreStatusItem[]>([
    { label: "전체", value: 0, bg: "bg-[#BFD7EA]" },
    { label: "대기", value: 0, bg: "bg-[#D0E2F0]" },
    { label: "활성", value: 0, bg: "bg-[#D0E2F0]" },
    { label: "중지", value: 0, bg: "bg-[#D0E2F0]" },
    { label: "폐기", value: 0, bg: "bg-[#c9c5dc]" },
  ]);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const { data } = await getMerchants();
        const stores: MerchantsResponse[] = data.data;

        const statusCount: Record<string, number> = {
          READY: 0,
          ACTIVE: 0,
          INACTIVE: 0,
          CLOSED: 0,
        };

        stores.forEach((store) => {
          if (store.status in statusCount) {
            statusCount[store.status]++;
          }
        });

        setStoreStatusItems([
          { label: "전체", value: stores.length, bg: "bg-[#BFD7EA]" },
          { label: "대기", value: statusCount.READY, bg: "bg-[#D0E2F0]" },
          { label: "활성", value: statusCount.ACTIVE, bg: "bg-[#D0E2F0]" },
          { label: "중지", value: statusCount.INACTIVE, bg: "bg-[#D0E2F0]" },
          { label: "폐기", value: statusCount.CLOSED, bg: "bg-[#c9c5dc]" },
        ]);
      } catch (err) {
        console.error(err);
      }
    };

    fetchStores();
  }, []);

  return (
    <article className="flex-1 p-6 rounded-xl shadow-sm flex flex-col justify-center bg-linear-to-br from-[#EDF2F7] to-[#E2E8F0]">
      <h3 className="text-[#1E3A5F] font-semibold mb-4 text-center text-lg">
        가맹점 상태
      </h3>

      <div className="grid grid-cols-5 gap-4 flex-1 h-full">
        {storeStatusItems.map((item, idx) => (
          <div
            key={idx}
            className={`flex flex-col justify-center items-center rounded-lg p-2 ${item.bg}`}
          >
            <p
              className={`font-bold ${
                item.label === "전체" ? "text-xl" : "text-lg"
              } text-primary`}
            >
              {item.value}
            </p>
            <p className="text-sm text-[#1E3A5F]">{item.label}</p>
          </div>
        ))}
      </div>
    </article>
  );
}
