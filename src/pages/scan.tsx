import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ScanForm } from '@/components/scan/scan-form';
import { SKUTable } from '@/components/scan/sku-table';
import { ProductPreview } from '@/components/scan/product-preview';
import { Order, SKU, ScanStatus } from '@/lib/types';

const mockOrder: Order = {
  id: '12345',
  status: 'Pending',
  items: 3,
  lastUpdated: '2024-03-15',
  skus: [
    {
      sku: 'SKU001',
      title: 'Product A',
      quantityRequested: 5,
      quantityScanned: 3,
      status: 'موجود',
      scanTimestamp: '2024-03-15 15:30',
      imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
    },
    {
      sku: 'SKU002',
      title: 'Product B',
      quantityRequested: 2,
      quantityScanned: 0,
      status: 'Pending',
    },
  ],
};

export function Scan() {
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<Order>(mockOrder);
  const [lastScannedSku, setLastScannedSku] = useState<SKU | null>(null);

  const handleScan = async (sku: string, status: ScanStatus) => {
    try {
      // TODO: Implement API call
      // await fetch(`/api/orders/${orderId}/scan`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ sku, status }),
      // });

      setOrder((prevOrder) => ({
        ...prevOrder,
        skus: prevOrder.skus?.map((item) =>
          item.sku === sku
            ? {
                ...item,
                status,
                quantityScanned: item.quantityScanned + 1,
                scanTimestamp: new Date().toISOString(),
              }
            : item
        ),
      }));

      const scannedSku = order.skus?.find((item) => item.sku === sku);
      if (scannedSku) {
        setLastScannedSku({
          ...scannedSku,
          status,
          quantityScanned: (scannedSku.quantityScanned || 0) + 1,
          scanTimestamp: new Date().toISOString(),
        });
      }
    } catch (error) {
      console.error('Failed to update scan:', error);
    }
  };

  if (!orderId) {
    return <div>Order ID is required</div>;
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-gray-900">Scan Management</h1>
        <p className="mt-2 text-sm text-gray-700">
          Scan and update SKUs for order #{orderId}
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <SKUTable skus={order.skus || []} />
          <ScanForm orderId={orderId} onSubmit={handleScan} />
        </div>
        <div>
          <ProductPreview
            imageUrl={lastScannedSku?.imageUrl}
            title={lastScannedSku?.title}
            sku={lastScannedSku?.sku}
            quantityScanned={lastScannedSku?.quantityScanned}
            quantityRequested={lastScannedSku?.quantityRequested}
          />
        </div>
      </div>
    </div>
  );
}