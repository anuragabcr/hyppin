export type BusinessData = {
  gstin: string;
  gstVerified: boolean;
  storeName: string;
  address: string;
  entityType: string;
  phone: string;
  inventoryModel: string;
  days: number[];
  openAllDays: boolean;
  from: string;
  to: string;
};

export type SellerData = {
  fullName: string;
  phone: string;
  email: string;
};

export type BankData = {
  accountNumber: string;
  ifsc: string;
  bankType: string;
};

export type SignatureData = {
  type: "draw" | "upload";
  image: string | null;
  isAgreed: boolean;
};

export type OnboardingData = {
  business: BusinessData;
  seller: SellerData;
  bank: BankData;
  signature: SignatureData;
};
