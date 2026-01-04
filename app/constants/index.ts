import {
  FOOTWEAR_FILTERS,
  KIDS_FILTERS,
  MEN_FILTERS,
  STORE_FILTERS,
  WOMEN_FILTERS,
} from "./filters";

export const FILTERS_BY_CATEGORY = {
  women: WOMEN_FILTERS,
  men: MEN_FILTERS,
  kids: KIDS_FILTERS,
  stores: STORE_FILTERS,
  footwear: FOOTWEAR_FILTERS,
};

export type CategoryId = keyof typeof FILTERS_BY_CATEGORY;
