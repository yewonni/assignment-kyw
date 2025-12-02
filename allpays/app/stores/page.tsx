"use client";

import { useState } from "react";
import Header from "@/components/Header";
import SideBar from "@/components/SideBar";
import StoresTable from "./components/MerchantsTable";
import Pagination from "@/components/Pagination";
import SearchBar from "./components/SearchBar";

export type MerchantStatus = "대기" | "활성" | "중지" | "폐기";

export interface Merchant {
  mchtCode: string;
  mchtName: string;
  status: MerchantStatus;
  bizType: string;
}

const mockMerchants: Merchant[] = [
  {
    mchtCode: "TXN001",
    mchtName: "브런치 잠실점",
    status: "활성",
    bizType: "CAFE",
  },
  {
    mchtCode: "TXN002",
    mchtName: "스타벅스 강남점",
    status: "중지",
    bizType: "CAFE",
  },
  {
    mchtCode: "TXN003",
    mchtName: "카페 드롭탑",
    status: "대기",
    bizType: "CAFE",
  },
  {
    mchtCode: "TXN004",
    mchtName: "빽다방 압구정점",
    status: "폐기",
    bizType: "CAFE",
  },
  {
    mchtCode: "TXN005",
    mchtName: "투썸플레이스 청담점",
    status: "활성",
    bizType: "CAFE",
  },
];

export default function StoresPage() {
  const [filteredMerchants, setFilteredMerchants] = useState(mockMerchants);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  const totalPages = Math.ceil(filteredMerchants.length / itemsPerPage);
  const currentMerchants = filteredMerchants.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSearch = (keyword: string) => {
    const result = mockMerchants.filter((m) => m.mchtCode.includes(keyword));
    setFilteredMerchants(result);
    setCurrentPage(1);
  };

  const handleReset = () => {
    setFilteredMerchants(mockMerchants);
    setCurrentPage(1);
  };

  return (
    <div className="flex min-h-screen">
      <SideBar />
      <div className="flex flex-col flex-1">
        <Header title="가맹점 목록" />
        <main className="flex-1 p-8">
          <SearchBar onSearch={handleSearch} onReset={handleReset} />
          <StoresTable merchants={currentMerchants} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => {
              if (page < 1 || page > totalPages) return;
              setCurrentPage(page);
            }}
          />
        </main>
      </div>
    </div>
  );
}
