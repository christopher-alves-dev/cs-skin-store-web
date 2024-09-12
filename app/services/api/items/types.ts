type FilterParams = {
  category?: string;
  price?: [number, number | undefined];
  float?: [number, number | undefined];
  name?: string;
};

type OrderParams = {
  orderBy?: string;
  orderDirection?: string;
};

export type FindAllParams = FilterParams & OrderParams;
