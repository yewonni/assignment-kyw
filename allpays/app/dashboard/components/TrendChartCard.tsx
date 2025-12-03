"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  getTransactions,
  TransactionsResponse,
} from "@/api/transactions/transactions";

interface TrendData {
  date: string;
  amount: number;
}

export default function TrendChartCard() {
  const [trendData, setTrendData] = useState<TrendData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getTransactions();

        const dateSums: Record<string, number> = {};
        data.data.forEach((tx: TransactionsResponse) => {
          const date = tx.paymentAt.split("T")[0];
          const amount = Number(tx.amount || 0);
          dateSums[date] = (dateSums[date] || 0) + amount;
        });

        const chartData: TrendData[] = Object.entries(dateSums)
          .map(([date, amount]) => ({ date, amount }))
          .sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
          );

        setTrendData(chartData);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    <article className="flex-1 rounded-xl shadow-md flex flex-col p-6 bg-white/80 backdrop-blur-sm border border-[#E5E7EB]">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">결제 트렌드</h3>
      <div className="flex-1 flex items-center justify-center">
        {trendData.length > 0 ? (
          <ResponsiveContainer width="100%" height={250}>
            <LineChart
              data={trendData}
              margin={{ top: 10, right: 20, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="4 4" stroke="#E5E7EB" />
              <XAxis dataKey="date" tick={{ fill: "#6B7280" }} />
              <YAxis tick={{ fill: "#6B7280" }} width={60} />
              <Tooltip
                contentStyle={{
                  borderRadius: 8,
                  border: "none",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                }}
                formatter={(value: number) => `₩ ${value.toLocaleString()}`}
              />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="#6366F1"
                strokeWidth={3}
                dot={{ r: 4, fill: "#60A5FA" }}
                activeDot={{ r: 6, fill: "#2563EB" }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <span className="text-gray-400 text-lg">거래 데이터가 없습니다</span>
        )}
      </div>
    </article>
  );
}
