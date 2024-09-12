import { skinsReducer } from "@/app/reducers/skins-reducer";
import { ACTIONS_TYPE } from "@/app/reducers/types";
import { useToast } from "@chakra-ui/react";
import { useEffect, useReducer } from "react";
import { itemsApi } from "../../services/api/items";
import { FindAllParams } from "../../services/api/items/types";

export const useFetchItems = () => {
  const toast = useToast();
  const [state, dispatch] = useReducer(skinsReducer, {
    items: [],
    isLoading: false,
    isFiltering: false,
    isEmptyList: false,
  });

  const fetchItems = async (params?: FindAllParams) => {
    dispatch({ type: ACTIONS_TYPE.FETCH_START });
    try {
      const res = await itemsApi.index(params);
      await new Promise((resolve) => setTimeout(resolve, 3000));
      dispatch({ type: ACTIONS_TYPE.FETCH_SUCCESS, payload: res.data });
    } catch (error) {
      toast({
        title: "Erro ao buscar itens, tente novamente mais tarde.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return {
    fetchItems,
    ...state,
  };
};
