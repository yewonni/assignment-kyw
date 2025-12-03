"use client";

import { useEffect, useState } from "react";
import { getTransactions } from "@/api/transactions/transactions";
import { calcSummary } from "@/utils/calcSummary";

export default function SummaryCards() {
  const [summary, setSummary] = useState({
    totalAmount: 0,
    totalCount: 0,
    successRate: 0,
    cancelAmount: 0,
  });

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const { data } = await getTransactions();
        const transactions = data.data;

        const result = calcSummary(transactions);
        setSummary(result);
      } catch (err) {
        console.error(err);
      }
    };

    fetchSummary();
  }, []);

  const summaryCards = [
    {
      title: "총 거래 금액",
      value: `₩ ${summary.totalAmount.toLocaleString()}`,
    },
    {
      title: "거래 건수",
      value: `${summary.totalCount.toLocaleString()}건`,
    },
    {
      title: "결제 성공률",
      value: `${summary.successRate.toFixed(1)}%`,
    },
    {
      title: "취소 금액",
      value: `₩ ${summary.cancelAmount.toLocaleString()}`,
    },
  ];

  return (
    <div className="flex gap-6">
      {summaryCards.map((card, idx) => (
        <article
          key={idx}
          className="flex flex-col gap-1 p-5 pt-6 rounded-xl shadow-sm flex-1"
          style={{
            background: `linear-gradient(135deg, ${
              ["#E3E8F9", "#D9E2F5", "#E8EEF4", "#F4F6F9"][idx]
            }, #FFFFFF)`,
          }}
        >
          <p className="text-secondary font-medium text-xs sm:text-sm">
            {card.title}
          </p>
          <p className="text-primary font-bold text-xs sm:text-sm md:text-base">
            {card.value}
          </p>
        </article>
      ))}
    </div>
  );
}
