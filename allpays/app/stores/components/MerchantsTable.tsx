interface Merchant {
  mchtCode: string;
  mchtName: string;
  status: "대기" | "활성" | "중지" | "폐기";
  bizType: string;
}

interface MerchantsTableProps {
  merchants: Merchant[];
}

export default function MerchantsTable({ merchants }: MerchantsTableProps) {
  const statusColorMap: Record<string, string> = {
    대기: "text-gray-700",
    활성: "text-green-700",
    중지: "text-yellow-700",
    폐기: "text-red-700",
  };

  return (
    <div className="overflow-x-auto border border-gray-300">
      <table className="w-full text-sm">
        <thead className="bg-sub border-b border-gray-300">
          <tr>
            <th className="p-2 px-4 text-left font-medium">코드</th>
            <th className="p-2 px-4 text-left font-medium">가맹점명</th>
            <th className="p-2 px-4 text-center font-medium">상태</th>
            <th className="p-2 px-4 text-left font-medium">업종</th>
          </tr>
        </thead>

        <tbody>
          {merchants.map((m) => (
            <tr
              key={m.mchtCode}
              className="border-b border-gray-200 hover:bg-slate-100"
            >
              <td className="p-2 px-4">{m.mchtCode}</td>
              <td className="p-2 px-4">{m.mchtName}</td>
              <td className="p-2 px-4 text-center">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs ${
                    statusColorMap[m.status] || "text-gray-700"
                  }`}
                >
                  {m.status}
                </span>
              </td>
              <td className="p-2 px-4">{m.bizType}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
