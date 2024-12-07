import { useState, useEffect } from 'react';
import { api } from '@/lib/api';

interface OrdersSummary {
  totalOrders: number;
  fulfilledOrders: number;
  pendingOrders: number;
  scannedItems: number;
  totalItems: number;
}

export function useOrdersSummary() {
  const [summary, setSummary] = useState<OrdersSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        setLoading(true);
        const data = await api.getOrdersSummary();
        setSummary({
          totalOrders: data.total_orders,
          fulfilledOrders: data.fulfilled_orders,
          pendingOrders: data.pending_orders,
          scannedItems: data.scanned_items,
          totalItems: data.total_items,
        });
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch summary'));
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  return { summary, loading, error };
}