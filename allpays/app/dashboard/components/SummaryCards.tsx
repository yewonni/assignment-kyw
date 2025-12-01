const summaryCards = [
  { title: "오늘 총 거래 금액", value: "₩ 12,500,000" },
  { title: "오늘 거래 건수", value: "1,201건" },
  { title: "결제 성공률", value: "96.2%" },
  { title: "환불 금액", value: "₩ 120,000" },
];

export default function SummaryCards() {
  return (
    <div className="flex gap-6 flex-[0_0_130px]">
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
          <p className="text-secondary text-sm font-medium">{card.title}</p>
          <p className="text-primary text-lg font-bold">{card.value}</p>
        </article>
      ))}
    </div>
  );
}
