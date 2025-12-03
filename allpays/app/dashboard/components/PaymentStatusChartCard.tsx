"use client";

import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import {
  getTransactions,
  TransactionsResponse,
} from "@/api/transactions/transactions";

type StatusType = "SUCCESS" | "FAIL" | "CANCEL" | "PENDING";
type StatusLabel = "성공" | "실패" | "취소" | "대기";

export default function PaymentStatusChartCard() {
  const [chartData, setChartData] = useState<
    { name: StatusLabel; value: number }[]
  >([]);

  const COLORS: Record<StatusLabel, string> = {
    성공: "#7C3AED",
    실패: "#F87171",
    대기: "#93C5FD",
    취소: "#FDBA74",
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getTransactions();

        const statusCounts: Record<StatusLabel, number> = {
          성공: 0,
          실패: 0,
          대기: 0,
          취소: 0,
        };

        data.data.forEach((tx: TransactionsResponse) => {
          const mapStatus: Record<StatusType, StatusLabel> = {
            SUCCESS: "성공",
            FAIL: "실패",
            CANCEL: "취소",
            PENDING: "대기",
          };

          const status = mapStatus[tx.status as StatusType] || "대기";
          statusCounts[status]++;
        });

        const dataForChart = Object.entries(statusCounts).map(
          ([name, value]) => ({
            name: name as StatusLabel,
            value,
          })
        );

        setChartData(dataForChart);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    <article className="flex-1 rounded-xl p-6 flex flex-col bg-white/60">
      <h3 className="text-lg font-semibold text-secondary mb-4">
        결제 상태별 비율
      </h3>

      <div className="flex-1 flex items-center justify-center">
        {chartData.length > 0 && chartData.some((d) => d.value > 0) ? (
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={3}
                label
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[entry.name]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <span className="text-gray-400 text-lg">거래 데이터가 없습니다</span>
        )}
      </div>

      <div className="mt-6 flex justify-center gap-6">
        {Object.entries(COLORS).map(([label, color]) => (
          <div key={label} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: color }}
            ></div>
            <span className="text-gray-600 text-sm">{label}</span>
          </div>
        ))}
      </div>
    </article>
  );
}
