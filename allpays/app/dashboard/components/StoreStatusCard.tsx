const storeStatusItems = [
  { label: "전체", value: 120, bg: "bg-[#BFD7EA]" },
  { label: "대기", value: 15, bg: "bg-[#D0E2F0]" },
  { label: "활성", value: 90, bg: "bg-[#D0E2F0]" },
  { label: "중지", value: 10, bg: "bg-[#D0E2F0]" },
  { label: "폐기", value: 5, bg: "bg-[#c9c5dc]" },
];

export default function StoreStatusCard() {
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
