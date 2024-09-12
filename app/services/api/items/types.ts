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

export type Skin = {
  id: string;
  name: string;
  image: string;
  category: string;
  float?: string;
  price: number;
};

export type FindAllResponse = Skin[];
