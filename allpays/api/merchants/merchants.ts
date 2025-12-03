import axiosInstance from "../axiosInstance";

export interface MerchantsResponse {
  mchtCode: string;
  mchtName: string;
  status: string;
  bizType: string;
}

interface MerchantsAPIResponse {
  message: string;
  data: MerchantsResponse[];
}

export const getMerchants = () => {
  return axiosInstance.get<MerchantsAPIResponse>("/merchants/list");
};

export interface MerchantsDetailResponse {
  mchtCode: string;
  mchtName: string;
  status: string;
  bizType: string;
  bizNo: string;
  address: string;
  phone: string;
  email: string;
  registeredAt: string;
  updatedAt: string;
}

export const getMerchantDetail = async (mchtCode: string) => {
  const res = await axiosInstance.get(`/merchants/details/${mchtCode}`);
  return res.data.data as MerchantsDetailResponse;
};
