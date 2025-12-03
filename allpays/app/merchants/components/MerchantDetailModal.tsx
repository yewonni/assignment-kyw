"use client";

import { useEffect, useState } from "react";
import {
  getMerchantDetail,
  MerchantsDetailResponse,
} from "@/api/merchants/merchants";

interface MerchantDetailModalProps {
  mchtCode: string | null;
  onClose: () => void;
}

export default function MerchantDetailModal({
  mchtCode,
  onClose,
}: MerchantDetailModalProps) {
  const [detail, setDetail] = useState<MerchantsDetailResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!mchtCode) return;

    const fetchDetail = async () => {
      setLoading(true);
      setError(false);
      setDetail(null);

      try {
        const res = await getMerchantDetail(mchtCode);
        setDetail(res);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [mchtCode]);

  if (!mchtCode) return null;

  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  const fields = detail
    ? [
        { label: "코드", value: detail.mchtCode },
        { label: "가맹점명", value: detail.mchtName },
        { label: "상태", value: detail.status },
        { label: "업종", value: detail.bizType },
        { label: "사업자번호", value: detail.bizNo },
        { label: "주소", value: detail.address },
        { label: "전화", value: detail.phone },
        { label: "이메일", value: detail.email },
        {
          label: "등록일",
          value: new Date(detail.registeredAt).toLocaleDateString(),
        },
        {
          label: "수정일",
          value: new Date(detail.updatedAt).toLocaleDateString(),
        },
      ]
    : [];

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
      onClick={handleBackgroundClick}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-lg"
          onClick={onClose}
        >
          ✕
        </button>

        {loading && <p className="text-center text-gray-500">로딩 중...</p>}

        {!loading && error && (
          <p className="text-center text-red-500">
            데이터를 불러오지 못했습니다.
          </p>
        )}

        {!loading && detail && (
          <div className="space-y-4 text-sm">
            <h2 className="text-2xl text-gray-800 mb-4">가맹점 상세</h2>
            <div className="grid grid-cols-2 gap-y-2 gap-x-4">
              {fields.map((field) => (
                <div key={field.label} className="contents">
                  <span className="text-gray-600">{field.label}:</span>
                  <span className="text-gray-900">{field.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
