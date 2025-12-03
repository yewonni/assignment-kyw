"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import SideBar from "@/components/SideBar";
import SearchFilters from "./components/SearchFilters";
import SearchButtons from "./components/SearchButtons";
import Pagination from "@/components/Pagination";
import TransactionsTable from "./components/TransactionsTable";
import { useTransactions, Transaction } from "@/hooks/useTransactions";

export default function TransactionsPage() {
  const { originalTransactions, stores, loading } = useTransactions();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [keyword, setKeyword] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterStore, setFilterStore] = useState("");
  const [sortOrder, setSortOrder] = useState("최신순");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  useEffect(() => {
    if (!loading) {
      setTransactions(originalTransactions);
    }
  }, [loading, originalTransactions]);

  if (loading) return <div>Loading...</div>;

  const applyFilters = (
    kw = keyword,
    status = filterStatus,
    store = filterStore,
    sort = sortOrder
  ) => {
    let filtered = [...originalTransactions];

    if (kw) {
      filtered = filtered.filter(
        (tx) => tx.code.includes(kw) || tx.merchant.includes(kw)
      );
    }
    if (status) filtered = filtered.filter((tx) => tx.status === status);
    if (store) filtered = filtered.filter((tx) => tx.merchant === store);

    if (sort === "금액 높은순") filtered.sort((a, b) => b.amount - a.amount);
    else if (sort === "금액 낮은순")
      filtered.sort((a, b) => a.amount - b.amount);
    else filtered.sort((a, b) => (a.datetime < b.datetime ? 1 : -1));

    setTransactions(filtered);
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setKeyword("");
    setFilterStatus("");
    setFilterStore("");
    setSortOrder("최신순");
    setTransactions(originalTransactions);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(transactions.length / itemsPerPage);
  const currentTransactions = transactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="flex min-h-screen">
      <SideBar />
      <div className="flex flex-col flex-1">
        <Header title="거래 내역" />
        <main className="flex-1 p-8">
          <SearchFilters
            keyword={keyword}
            filterStatus={filterStatus}
            filterStore={filterStore}
            sortOrder={sortOrder}
            setKeyword={setKeyword}
            setFilterStatus={setFilterStatus}
            setFilterStore={setFilterStore}
            setSortOrder={setSortOrder}
            stores={stores}
            onSearch={applyFilters}
            onReset={resetFilters}
          />

          <SearchButtons
            onSearch={() =>
              applyFilters(keyword, filterStatus, filterStore, sortOrder)
            }
            onReset={resetFilters}
          />

          <section className="mt-8">
            <h2 className="text-lg font-semibold mb-4">
              검색 결과 ({transactions.length}개)
            </h2>

            <TransactionsTable transactions={currentTransactions} />

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => {
                if (page < 1 || page > totalPages) return;
                setCurrentPage(page);
              }}
            />
          </section>
        </main>
      </div>
    </div>
  );
}
