import { useEffect, useState } from "react";
import { itemsApi } from "../../services/api/items";
import { FindAllParams } from "../../services/api/items/types";

interface Item {
  id: string;
  name: string;
  image: string;
  category: string;
  float?: string;
  price: number;
}

export const useFetchItems = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = async (params?: FindAllParams) => {
    try {
      const res = await itemsApi.index({
        ...(!!params?.name && {
          name: params?.name,
        }),
        ...(!!params?.orderBy && {
          orderBy: params?.orderBy,
        }),
        ...(!!params?.orderDirection && {
          orderDirection: params?.orderDirection,
        }),
      });

      setItems(res.data);
    } catch (error) {
      setError("Erro ao conectar com o servidor");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return {
    fetchItems,
    items,
    setItems,
    loading,
    error,
  };
};
