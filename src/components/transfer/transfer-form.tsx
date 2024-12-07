import { useState } from 'react';
import { Scan } from 'lucide-react';
import { TransferType } from '@/lib/types';

const transferTypes: TransferType[] = ['پست', 'اسنپ باکس', 'ماهکس'];

interface TransferFormProps {
  onSubmit: (orderId: string, transferType: TransferType) => void;
}

export function TransferForm({ onSubmit }: TransferFormProps) {
  const [orderId, setOrderId] = useState('');
  const [transferType, setTransferType] = useState<TransferType>('پست');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderId && transferType) {
      onSubmit(orderId, transferType);
      setOrderId('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow">
      <h2 className="text-lg font-medium text-gray-900">Update Transfer Method</h2>
      
      <div>
        <label htmlFor="orderId" className="block text-sm font-medium text-gray-700">
          Order ID
        </label>
        <div className="mt-1 flex rounded-md shadow-sm">
          <input
            type="text"
            id="orderId"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            className="flex-1 min-w-0 block w-full px-3 py-2 rounded-l-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter order ID"
          />
          <button
            type="button"
            className="inline-flex items-center px-3 py-2 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 text-gray-500 hover:text-gray-700"
          >
            <Scan className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div>
        <label htmlFor="transferType" className="block text-sm font-medium text-gray-700">
          Shipping Method
        </label>
        <select
          id="transferType"
          value={transferType}
          onChange={(e) => setTransferType(e.target.value as TransferType)}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          {transferTypes.map((type) => (
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
        Update Transfer Method
      </button>
    </form>
  );
}