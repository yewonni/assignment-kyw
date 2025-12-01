const topStores = [
  { name: "가맹점 X", value: "₩ 1,200,000" },
  { name: "가맹점 Y", value: "₩ 980,000" },
  { name: "가맹점 Z", value: "₩ 750,000" },
  { name: "가맹점 W", value: "₩ 700,000" },
  { name: "가맹점 V", value: "₩ 650,000" },
];

export default function TopStoreList() {
  return (
    <article className="flex-1 flex flex-col gap-3">
      <h3 className="text-[#1E3A5F] font-semibold mb-2">거래 상위 가맹점</h3>

      {topStores.map((store, idx) => (
        <div
          key={idx}
          className="flex justify-between py-3 px-4 rounded-xl shadow-sm bg-white border border-[#cbd5e1]"
        >
          <span className="text-[#1E3A5F] font-medium">{store.name}</span>
          <span className="text-primary font-bold">{store.value}</span>
        </div>
      ))}
    </article>
  );
}
