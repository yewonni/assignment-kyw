import SummaryCards from "./components/SummaryCards";
import StoreStatusCard from "./components/StoreStatusCard";
import TopStoreList from "./components/TopStoreList";
import PaymentStatusChartCard from "./components/PaymentStatusChartCard";
import TrendChartCard from "./components/TrendChartCard";
import PaymentMethodChartCard from "./components/PaymentMethodChartCard";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen">
      <div className="flex flex-col flex-1">
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
            <PaymentMethodChartCard />
            <TrendChartCard />
          </section>
        </main>
      </div>
    </div>
  );
}
