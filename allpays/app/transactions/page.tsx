"use client";

import { useState } from "react";
import Header from "@/components/Header";
import SideBar from "@/components/SideBar";
import SearchFilters from "./components/SearchFilters";
import SearchButtons from "./components/SearchButtons";
import Pagination from "@/components/Pagination";
import TransactionsTable from "./components/TransactionsTable";

export interface Transaction {
  id: string;
  merchant: string;
  amount: number;
  status: "성공" | "실패" | "대기" | "취소";
  paymentMethod: string;
  datetime: string;
}

export default function TransactionsPage() {
  const mockTransactions: Transaction[] = [
    {
      id: "TXN001",
      merchant: "GS25 강남점",
      amount: 12500,
      status: "성공",
      paymentMethod: "신용카드",
      datetime: "2024-12-02 14:35",
    },
    {
      id: "TXN002",
      merchant: "스타벅스 역삼점",
      amount: 8900,
      status: "취소",
      paymentMethod: "체크카드",
      datetime: "2024-12-02 11:20",
    },
    {
      id: "TXN003",
      merchant: "쿠팡",
      amount: 45000,
      status: "성공",
      paymentMethod: "신용카드",
      datetime: "2024-12-01 22:15",
    },
    {
      id: "TXN004",
      merchant: "올리브영 신촌점",
      amount: 23400,
      status: "실패",
      paymentMethod: "신용카드",
      datetime: "2024-12-01 18:42",
    },
    {
      id: "TXN005",
      merchant: "CU 홍대입구점",
      amount: 5600,
      status: "성공",
      paymentMethod: "간편결제",
      datetime: "2024-12-01 15:10",
    },
    {
      id: "TXN006",
      merchant: "교보문고",
      amount: 34800,
      status: "대기",
      paymentMethod: "신용카드",
      datetime: "2024-11-30 20:05",
    },
    {
      id: "TXN007",
      merchant: "맥도날드 광화문점",
      amount: 11200,
      status: "성공",
      paymentMethod: "간편결제",
      datetime: "2024-11-30 12:30",
    },
    {
      id: "TXN008",
      merchant: "이마트24 서초점",
      amount: 7800,
      status: "성공",
      paymentMethod: "체크카드",
      datetime: "2024-11-29 19:45",
    },
    {
      id: "TXN009",
      merchant: "네이버페이",
      amount: 98000,
      status: "대기",
      paymentMethod: "계좌이체",
      datetime: "2024-11-29 16:22",
    },
    {
      id: "TXN010",
      merchant: "CGV 강남",
      amount: 28000,
      status: "취소",
      paymentMethod: "신용카드",
      datetime: "2024-11-28 21:10",
    },
    {
      id: "TXN011",
      merchant: "파리바게뜨 역삼점",
      amount: 14500,
      status: "실패",
      paymentMethod: "신용카드",
      datetime: "2024-11-28 08:15",
    },
    {
      id: "TXN012",
      merchant: "GS25 논현점",
      amount: 9300,
      status: "성공",
      paymentMethod: "간편결제",
      datetime: "2024-11-27 17:50",
    },
    {
      id: "TXN013",
      merchant: "GS25 논현점",
      amount: 9300,
      status: "성공",
      paymentMethod: "간편결제",
      datetime: "2024-11-27 17:50",
    },
    {
      id: "TXN014",
      merchant: "GS25 논현점",
      amount: 9300,
      status: "성공",
      paymentMethod: "간편결제",
      datetime: "2024-11-27 17:50",
    },
    {
      id: "TXN015",
      merchant: "GS25 논현점",
      amount: 9300,
      status: "성공",
      paymentMethod: "간편결제",
      datetime: "2024-11-27 17:50",
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;
  const totalPages = Math.ceil(mockTransactions.length / itemsPerPage);

  const currentTransactions = mockTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSearch = (): void => {
    console.log("검색");
  };

  const handleReset = (): void => {
    console.log("초기화");
  };

  return (
    <div className="flex min-h-screen">
      <SideBar />
      <div className="flex flex-col flex-1">
        <Header title="거래 내역" />
        <main className="flex-1 p-8">
          <SearchFilters onSearch={handleSearch} onReset={handleReset} />
          <SearchButtons onSearch={handleSearch} onReset={handleReset} />

          <section className="mt-8">
            <h2 className="text-lg font-semibold mb-4">
              검색 결과 ({mockTransactions.length}개)
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
