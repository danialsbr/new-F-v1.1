export type TransferType = 'پست' | 'اسنپ باکس' | 'ماهکس';
export type ScanStatus = 'موجود' | 'کالا ایرادار' | 'عدم موجودی' | 'انصراف مشتری';

export interface SKU {
  sku: string;
  title: string;
  quantityRequested: number;
  quantityScanned: number;
  status: ScanStatus | 'Pending';
  scanTimestamp?: string;
  imageUrl?: string;
}

export interface Order {
  id: string;
  status: 'Pending' | 'Fulfilled';
  items: number;
  lastUpdated: string;
  state?: string;
  city?: string;
  transferType?: TransferType;
  transferTimestamp?: string;
  skus?: SKU[];
}

export interface TransferUpdatePayload {
  transferType: TransferType;
}

export interface ScanUpdatePayload {
  sku: string;
  status: ScanStatus;
}