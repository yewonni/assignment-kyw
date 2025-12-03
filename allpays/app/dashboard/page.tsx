import SummaryCards from "./components/SummaryCards";
import StoreStatusCard from "./components/StoreStatusCard";
import TopStoreList from "./components/TopStoreList";
import TrendChartCard from "./components/TrendChartCard";
import RecentTransactionsCard from "./components/RecentTransactionCard";
import PaymentStatusChartCard from "./components/PaymentStatusChartCard";
import Header from "@/components/Header";
import SideBar from "@/components/SideBar";

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
            <RecentTransactionsCard />
          </section>
        </main>
      </div>
    </div>
  );
}
