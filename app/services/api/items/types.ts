type NumberOrUndefined = number | undefined;

export type FilterRange = [NumberOrUndefined, NumberOrUndefined];

type FilterParams = {
  category?: string;
  price?: FilterRange;
  float?: FilterRange;
  name?: string;
};

type OrderParams = {
  orderBy?: string;
  orderDirection?: string;
};

export type FindAllParams = FilterParams & OrderParams;
