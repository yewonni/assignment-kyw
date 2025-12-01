export default function PaymentStatusChartCard() {
  const statusLabels = [
    { label: "성공", color: "bg-purple-700" },
    { label: "실패", color: "bg-red-400" },
    { label: "대기", color: "bg-blue-300" },
    { label: "취소", color: "bg-orange-300" },
  ];

  return (
    <article className="flex-1 rounded-xl p-6 flex flex-col bg-white/60">
      <h3 className="text-lg font-semibold text-secondary mb-4">
        결제 상태별 비율 (Today)
      </h3>
      <div className="flex-1 flex items-center justify-center">
        <span className="text-gray-400 text-lg">도넛 차트 예정</span>
      </div>

      <div className="mt-6 flex justify-center gap-6">
        {statusLabels.map((status) => (
          <div key={status.label} className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${status.color}`}></div>
            <span className="text-gray-600 text-sm">{status.label}</span>
          </div>
        ))}
      </div>
    </article>
  );
}
