type FilterParams = {
  category?: string;
  price?: [number, number];
  float?: [number, number];
  name?: string;
};

type OrderParams = {
  orderBy?: string;
  orderDirection?: string;
};

export type FindAllParams = FilterParams & OrderParams;
