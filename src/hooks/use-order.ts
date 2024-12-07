import { useState, useEffect } from 'react';
import { Order } from '@/lib/types';
import { api } from '@/lib/api';

export function useOrder(orderId: string) {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        const data = await api.getOrder(orderId);
        setOrder(data.details);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch order'));
      } finally {
        setLoading(false);
      }
    };

    if (orderId) {
      fetchOrder();
    }
  }, [orderId]);

  return { order, loading, error };
}