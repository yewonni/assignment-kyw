"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import SideBar from "@/components/SideBar";
import StoresTable from "./components/MerchantsTable";
import Pagination from "@/components/Pagination";
import SearchBar from "./components/SearchBar";
import { getMerchants, MerchantsResponse } from "@/api/merchants/merchants";
import MerchantDetailModal from "./components/MerchantDetailModal";

export type MerchantStatus = "대기" | "활성" | "중지" | "폐기";

export interface Merchant {
  mchtCode: string;
  mchtName: string;
  status: MerchantStatus;
  bizType: string;
}

export default function MerchantsPage() {
  const [allMerchants, setAllMerchants] = useState<Merchant[]>([]);
  const [filteredMerchants, setFilteredMerchants] = useState<Merchant[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMerchantCode, setSelectedMerchantCode] = useState<
    string | null
  >(null);
  const itemsPerPage = 17;

  const totalPages = Math.ceil(filteredMerchants.length / itemsPerPage);

  const currentMerchants = filteredMerchants.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const statusMap: Record<string, MerchantStatus> = {
    ACTIVE: "활성",
    READY: "대기",
    INACTIVE: "중지",
    CLOSED: "폐기",
  };

  const convertToMerchant = (item: MerchantsResponse): Merchant => ({
    mchtCode: item.mchtCode,
    mchtName: item.mchtName,
    bizType: item.bizType,
    status: statusMap[item.status] ?? "대기",
  });

  const fetchAllMerchants = async () => {
    try {
      const res = await getMerchants();
      const list = res.data.data.map(convertToMerchant);
      setAllMerchants(list);
      setFilteredMerchants(list);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAllMerchants();
  }, []);

  const handleSearch = (keyword: string) => {
    const result = allMerchants.filter((m) => m.mchtCode.includes(keyword));
    setFilteredMerchants(result);
    setCurrentPage(1);
  };

  const handleReset = () => {
    setFilteredMerchants(allMerchants);
    setCurrentPage(1);
  };

  return (
    <div className="flex min-h-screen">
      <SideBar />
      <div className="flex flex-col flex-1">
        <Header title="가맹점 목록" />
        <main className="flex-1 p-8">
          <SearchBar onSearch={handleSearch} onReset={handleReset} />

          <StoresTable
            merchants={currentMerchants}
            onRowClick={(code) => setSelectedMerchantCode(code)}
          />

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

      {selectedMerchantCode && (
        <MerchantDetailModal
          mchtCode={selectedMerchantCode}
          onClose={() => setSelectedMerchantCode(null)}
        />
      )}
    </div>
  );
}
