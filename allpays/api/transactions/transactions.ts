import axiosInstance from "../axiosInstance";

export interface TransactionsResponse {
  paymentCode: string;
  mchtCode: string;
  amount: string;
  currency: string;
  payType: string;
  status: string;
  paymentAt: string;
}

interface TransactionsAPIResponse {
  message: string;
  data: TransactionsResponse[];
}

export const getTransactions = () => {
  return axiosInstance.get<TransactionsAPIResponse>("/payments/list");
};
