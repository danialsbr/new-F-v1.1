import { useState, useEffect } from 'react';
import { Order } from '@/lib/types';
import { api } from '@/lib/api';

export function useOrders(page = 1, size = 10) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const data = await api.getOrders(page, size);
        setOrders(data.orders);
        setTotalPages(data.total_pages);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch orders'));
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [page, size]);

  return { orders, loading, error, totalPages };
}