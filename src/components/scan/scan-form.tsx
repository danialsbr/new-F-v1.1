import { useState } from 'react';
import { Scan as ScanIcon } from 'lucide-react';
import { ScanStatus } from '@/lib/types';
import { cn } from '@/lib/utils';

const scanStatuses: ScanStatus[] = ['موجود', 'کالا ایرادار', 'عدم موجودی', 'انصراف مشتری'];

interface ScanFormProps {
  orderId: string;
  onSubmit: (sku: string, status: ScanStatus) => void;
}

export function ScanForm({ orderId, onSubmit }: ScanFormProps) {
  const [sku, setSku] = useState('');
  const [status, setStatus] = useState<ScanStatus>('موجود');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (sku && status) {
      onSubmit(sku, status);
      setSku('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow">
      <h2 className="text-lg font-medium text-gray-900">Scan SKU</h2>
      
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Order ID
        </label>
        <input
          type="text"
          value={orderId}
          disabled
          className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm text-gray-500 sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="sku" className="block text-sm font-medium text-gray-700">
          SKU Code
        </label>
        <div className="mt-1 flex rounded-md shadow-sm">
          <input
            type="text"
            id="sku"
            value={sku}
            onChange={(e) => setSku(e.target.value)}
            className="flex-1 min-w-0 block w-full px-3 py-2 rounded-l-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter SKU code"
          />
          <button
            type="button"
            className="inline-flex items-center px-3 py-2 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 text-gray-500 hover:text-gray-700"
          >
            <ScanIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div>
        <label htmlFor="status" className="block text-sm font-medium text-gray-700">
          Status
        </label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value as ScanStatus)}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          {scanStatuses.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Submit Scan
      </button>
    </form>
  );
}