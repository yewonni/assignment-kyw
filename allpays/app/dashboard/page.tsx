import SummaryCards from "./components/SummaryCards";
import StoreStatusCard from "./components/StoreStatusCard";
import TopStoreList from "./components/TopStoreList";
import TrendChartCard from "./components/TrendChartCard";
import RecentTransactionsCard from "./components/RecentTransactionCard";
import PaymentStatusChartCard from "./components/PaymentStatusChartCard";
import Header from "@/components/Header";
import SideBar from "@/components/SideBar";
import { Transaction } from "../transactions/page";

const transactions: Transaction[] = [
  {
    id: "1",
    merchant: "가맹점 A",
    amount: 1200000,
    status: "성공",
    paymentMethod: "카드",
    datetime: "2025-12-02 10:30",
  },
  {
    id: "2",
    merchant: "가맹점 B",
    amount: 980000,
    status: "실패",
    paymentMethod: "현금",
    datetime: "2025-12-02 09:50",
  },
  {
    id: "3",
    merchant: "가맹점 C",
    amount: 540000,
    status: "성공",
    paymentMethod: "카드",
    datetime: "2025-12-01 18:20",
  },
  {
    id: "4",
    merchant: "가맹점 D",
    amount: 760000,
    status: "대기",
    paymentMethod: "계좌이체",
    datetime: "2025-12-01 14:10",
  },
  {
    id: "5",
    merchant: "가맹점 E",
    amount: 230000,
    status: "취소",
    paymentMethod: "카드",
    datetime: "2025-12-01 11:05",
  },
  {
    id: "6",
    merchant: "가맹점 F",
    amount: 890000,
    status: "성공",
    paymentMethod: "현금",
    datetime: "2025-11-30 16:40",
  },
];

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen">
      <SideBar />
      <div className="flex flex-col flex-1">
        <Header title="대시보드" />
        <main className="flex-1 p-8">
          <section className="flex gap-8 w-full h-[500px]">
            <div className="flex-[0_0_64%] flex flex-col gap-6 h-full">
              <SummaryCards />
              <div className="flex gap-8 flex-1">
                <StoreStatusCard />
                <TopStoreList />
              </div>
            </div>
            <PaymentStatusChartCard />
          </section>

          <section className="flex gap-8 w-full h-[400px] mt-6">
            <TrendChartCard />
            <RecentTransactionsCard transactions={transactions} />
          </section>
        </main>
      </div>
    </div>
  );
}
