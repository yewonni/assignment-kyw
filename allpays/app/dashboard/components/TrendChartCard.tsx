export default function TrendChartCard() {
  return (
    <article className="flex-1 rounded-xl shadow-sm flex flex-col p-6 bg-white border border-[#cbd5e1]">
      <h3 className="text-lg font-medium text-secondary mb-4">
        최근 7일 결제 트렌드
      </h3>
      <div className="flex-1 flex items-center justify-center">
        <span className="text-gray-400 text-lg">차트 예정</span>
      </div>
    </article>
  );
}
