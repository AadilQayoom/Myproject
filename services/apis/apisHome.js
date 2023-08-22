import {
  BANNERS,
  BRANDS,
  CATEGORIES,
  CATEGORY_PRODUCTS,
  EVENTS,
  JOIN_EVENT,
  LATEST_PRODUCTS,
  PRODUCTS_FROM_CATEGORY,
  PROFILE,
  SINGLE_EVENT,
  WISHLIST,
} from "../constants/apiEndPointsHome";

import { GetApi, PostApi } from "./crudApis";

export const LatestProducts = () => GetApi(LATEST_PRODUCTS);
export const ProductsOfCategory = (category_id) =>
  GetApi(CATEGORY_PRODUCTS + category_id);
export const Categories = () => GetApi(CATEGORIES);
export const Brands = () => GetApi(BRANDS);
export const Banners = () => GetApi(BANNERS);
export const GetEvents = () => GetApi(EVENTS)
export const GetSingleEvents = () => PostApi(SINGLE_EVENT);
export const JoinEvent = () => PostApi(JOIN_EVENT)
export const getProfile = () => PostApi(PROFILE)
// export const AddEvent = (endpoint) => PostApi(endpoint)
