import { useState } from 'react';
import { TransferForm } from '@/components/transfer/transfer-form';
import { TransferTable } from '@/components/transfer/transfer-table';
import { Order, TransferType } from '@/lib/types';

const mockOrders: Order[] = [
  {
    id: '12345',
    status: 'Pending',
    items: 10,
    lastUpdated: '2024-03-15',
    state: 'Tehran',
    city: 'Tehran',
    transferType: 'پست',
    transferTimestamp: '2024-03-15 15:30',
  },
  {
    id: '67890',
    status: 'Fulfilled',
    items: 8,
    lastUpdated: '2024-03-14',
    state: 'Isfahan',
    city: 'Isfahan',
  },
];

export function Transfer() {
  const [orders, setOrders] = useState<Order[]>(mockOrders);

  const handleTransferUpdate = async (orderId: string, transferType: TransferType) => {
    try {
      // TODO: Implement API call
      // await fetch(`/api/orders/${orderId}/transfer`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ transferType }),
      // });

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId
            ? {
                ...order,
                transferType,
                transferTimestamp: new Date().toISOString(),
              }
            : order
        )
      );
    } catch (error) {
      console.error('Failed to update transfer:', error);
    }
  };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-gray-900">Transfer Management</h1>
        <p className="mt-2 text-sm text-gray-700">
          Manage shipping methods for orders
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <TransferTable orders={orders} onUpdateTransfer={handleTransferUpdate} />
        </div>
        <div>
          <TransferForm onSubmit={handleTransferUpdate} />
        </div>
      </div>
    </div>
  );
}