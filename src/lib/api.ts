import { Order, ScanStatus, TransferType } from './types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new ApiError(response.status, error.error || 'Unknown error');
  }
  return response.json();
}

export const api = {
  // Orders
  async getOrders(page = 1, size = 10) {
    const response = await fetch(
      `${API_URL}/api/orders?page=${page}&size=${size}`
    );
    return handleResponse<{
      page: number;
      size: number;
      total_pages: number;
      orders: Order[];
    }>(response);
  },

  async getOrder(orderId: string) {
    const response = await fetch(`${API_URL}/api/orders/${orderId}`);
    return handleResponse<{ order_id: string; details: Order }>(response);
  },

  // SKUs
  async getRemainingSkus(orderId: string) {
    const response = await fetch(
      `${API_URL}/api/orders/${orderId}/remaining-skus`
    );
    return handleResponse<{
      order_id: string;
      remaining_skus: Array<{
        sku: string;
        title: string;
        quantity_requested: number;
        quantity_scanned: number;
      }>;
    }>(response);
  },

  async getScannedHistory(orderId: string) {
    const response = await fetch(
      `${API_URL}/api/orders/${orderId}/scanned-history`
    );
    return handleResponse<{
      order_id: string;
      scanned_skus: Array<{
        sku: string;
        timestamp: string | null;
        status: string;
      }>;
    }>(response);
  },

  async scanSku(orderId: string, sku: string, status: ScanStatus) {
    const response = await fetch(`${API_URL}/api/orders/${orderId}/scan`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sku, status }),
    });
    return handleResponse<{
      message: string;
      updated_sku: {
        sku: string;
        quantity_scanned: number;
        status: string;
        scan_timestamp: string;
      };
    }>(response);
  },

  // Transfer
  async updateTransfer(orderId: string, transferType: TransferType) {
    const response = await fetch(`${API_URL}/api/orders/${orderId}/transfer`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ transfer_type: transferType }),
    });
    return handleResponse<{ message: string; order_id: string }>(response);
  },

  async getTransferOptions() {
    const response = await fetch(`${API_URL}/api/transfer-options`);
    return handleResponse<{ options: TransferType[] }>(response);
  },

  // File Operations
  async uploadFile(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    const response = await fetch(`${API_URL}/api/upload`, {
      method: 'POST',
      body: formData,
    });
    return handleResponse<{ message: string; file_path: string }>(response);
  },

  async downloadFile() {
    const response = await fetch(`${API_URL}/api/download`);
    if (!response.ok) {
      throw new ApiError(response.status, 'Failed to download file');
    }
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'orders.xlsx';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  },

  // Summary
  async getOrdersSummary() {
    const response = await fetch(`${API_URL}/api/orders/summary`);
    return handleResponse<{
      total_orders: number;
      fulfilled_orders: number;
      pending_orders: number;
      scanned_items: number;
      total_items: number;
    }>(response);
  },
};