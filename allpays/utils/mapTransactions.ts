import { Transaction } from "@/hooks/useTransactions";
import { TransactionsResponse } from "@/api/transactions/transactions";
import { MerchantsResponse } from "@/api/merchants/merchants";

const statusMap: Record<string, Transaction["status"]> = {
  SUCCESS: "성공",
  FAIL: "실패",
  CANCEL: "취소",
  PENDING: "대기",
};

const payTypeMap: Record<string, string> = {
  ONLINE: "온라인",
  DEVICE: "단말기",
  MOBILE: "모바일",
  VACT: "가상계좌",
  BILLING: "정기결제",
};

export function mapTransactions(
  txData: TransactionsResponse[],
  storesData: MerchantsResponse[]
): Transaction[] {
  const storeMap = storesData.reduce((acc, s) => {
    acc[s.mchtCode] = s.mchtName;
    return acc;
  }, {} as Record<string, string>);

  return txData.map((t) => ({
    code: t.paymentCode,
    merchant: storeMap[t.mchtCode] || t.mchtCode,
    amount: Number(t.amount || 0),
    status: statusMap[t.status] || "대기",
    paymentMethod: payTypeMap[t.payType] || t.payType,
    datetime: t.paymentAt.replace("T", " ").slice(0, 16),
  }));
}
