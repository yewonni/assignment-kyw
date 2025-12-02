import TransactionsTable from "@/app/transactions/components/TransactionsTable";
import { Transaction } from "@/app/transactions/page";

interface RecentTransactionsCardProps {
  transactions: Transaction[];
}

export default function RecentTransactionsCard({
  transactions,
}: RecentTransactionsCardProps) {
  const recent5 = transactions.slice(0, 5);

  return (
    <article className="flex-1 rounded-xl shadow-sm flex flex-col p-6 bg-white border border-[#cbd5e1]">
      <h3 className="text-lg font-medium text-secondary mb-4">최근 거래 5건</h3>
      <div className="overflow-x-auto min-w-[600px]">
        <TransactionsTable transactions={recent5} />
      </div>
    </article>
  );
}
