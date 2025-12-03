import { Transaction } from "@/hooks/useTransactions";

interface TransactionsTableProps {
  transactions: Transaction[];
}

export default function TransactionsTable({
  transactions,
}: TransactionsTableProps) {
  const statusColorMap: Record<string, string> = {
    성공: "text-green-700",
    실패: "text-red-700",
    취소: "text-yellow-700",
    대기: "text-gray-700",
  };

  const thClass = "p-2 px-4 text-left font-medium";
  const tdClass = "p-2 px-4 align-middle";

  const columns = [
    { label: "코드", key: "code", className: thClass },
    { label: "가맹점명", key: "merchant", className: thClass },
    { label: "금액", key: "amount", className: thClass, align: "center" },
    { label: "상태", key: "status", className: thClass, align: "center" },
    { label: "결제수단", key: "paymentMethod", className: thClass },
    { label: "일시", key: "datetime", className: thClass },
  ];

  return (
    <div className="overflow-x-auto border border-gray-300 rounded-lg">
      <table className="w-full text-sm table-fixed">
        <thead className="bg-sub border-b border-gray-300">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className={
                  col.className +
                  (col.align === "right"
                    ? " text-right"
                    : col.align === "center"
                    ? " text-center"
                    : "")
                }
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {transactions.map((tx) => (
            <tr
              key={tx.code}
              className="border-b border-gray-200 hover:bg-slate-100"
            >
              <td className={tdClass}>{tx.code}</td>
              <td className={tdClass}>{tx.merchant}</td>
              <td className={tdClass}>
                {Number(tx.amount).toLocaleString()}원
              </td>
              <td className={tdClass}>
                <span
                  className={`text-xs ${
                    statusColorMap[tx.status] || "text-gray-700"
                  }`}
                >
                  {tx.status}
                </span>
              </td>
              <td className={tdClass}>{tx.paymentMethod}</td>
              <td className={`${tdClass} text-gray-600`}>{tx.datetime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
