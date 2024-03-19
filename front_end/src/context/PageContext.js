import { createContext, useReducer, useEffect, useState } from "react";

import { initialState, PageReducer } from "./PageReducer";
import {
  FetchAllUsers,
  FetchSingleUser,
  FetchMyInfo,
} from "../data/FetchUsersData";
import {
  FetchAllStores,
  FetchSingleStore,
  FetchStoreByOwnerEmail,
} from "../data/FetchStoresData";
import {
  FetchAllOrders,
  FetchSingleOrder,
  FetchAllOrdersOfAUser,
} from "../data/FetchOrdersData";
import {
  FetchAllProducts,
  FetchProductsUsePageAndLimit,
  FetchAllProductsOfAStore,
  FetchSearchProductByName,
  FetchSingleProduct,
} from "../data/FetchProductsData";

import { FetchAllOrdersProductOfStore } from "../data/FetchOrdersProductData";

import {
  FetchReviewOfProduct,
  FetchReviewOfProductForAdmin,
} from "../data/FetchReviewData";

const PageContext = createContext();

function PageProvider({ children }) {
  const [state, dispatch] = useReducer(PageReducer, initialState);

  const getData = async () => {
    const resultAllUsers = await FetchAllUsers();
    dispatch({
      type: "SET_DATA_ALL_USERS",
      payload: resultAllUsers,
    });

    const resultAllOrders = await FetchAllOrders();
    dispatch({
      type: "SET_DATA_ALL_ORDERS",
      payload: resultAllOrders,
    });

    const resultAllStores = await FetchAllStores();
    dispatch({
      type: "SET_DATA_ALL_STORES",
      payload: resultAllStores,
    });

    return;
  };
  const getDataAllUsers = async (email, page, limit) => {
    const resultAllUsers = await FetchAllUsers(email, page, limit);
    dispatch({
      type: "SET_DATA_ALL_USERS",
      payload: resultAllUsers,
    });

    return;
  };
  const getDataAllOrders = async (orderId, page, limit) => {
    const resultAllOrders = await FetchAllOrders(orderId, page, limit);
    dispatch({
      type: "SET_DATA_ALL_ORDERS",
      payload: resultAllOrders,
    });

    return;
  };

  const getDataAllOrdersProductOfAStore = async (storeID, page, limit) => {
    const resultAllOrders = await FetchAllOrdersProductOfStore(
      storeID,
      page,
      limit
    );
    dispatch({
      type: "SET_DATA_ALL_ORDERS_PRODUCT_OF_STORE",
      payload: resultAllOrders,
    });

    return;
  };

  const getDataAllOrdersOfAUser = async (userID, page, limit) => {
    const resultAllOrders = await FetchAllOrdersOfAUser(userID, page, limit);
    dispatch({
      type: "SET_DATA_ALL_ORDERS",
      payload: resultAllOrders,
    });

    return;
  };
  const getDataProductsUsePageAndLimit = async (page, limit) => {
    const resultAllProducts = await FetchProductsUsePageAndLimit(page, limit);
    dispatch({
      type: "SET_DATA_ALL_PRODUCTS",
      payload: resultAllProducts,
    });

    return;
  };

  const getDataAllProducts = async (genre) => {
    const resultAllProducts = await FetchAllProducts(genre);
    dispatch({
      type: "SET_DATA_ALL_PRODUCTS",
      payload: resultAllProducts,
    });

    return;
  };

  const getDataOfThreeGenres = async () => {
    const resultdataPopularFoods = await FetchAllProducts("Foods");
    dispatch({
      type: "SET_DATA_PopularFoods",
      payload: resultdataPopularFoods,
    });

    const resultdataPopularDevices = await FetchAllProducts("Devices");
    dispatch({
      type: "SET_DATA_PopularDevices",
      payload: resultdataPopularDevices,
    });

    const resultdataPopularStationery = await FetchAllProducts("Stationery");
    dispatch({
      type: "SET_DATA_PopularStationery",
      payload: resultdataPopularStationery,
    });

    return;
  };

  const getDataAllProductsOfAStore = async (storeID) => {
    const resultAllProducts = await FetchAllProductsOfAStore(storeID);
    dispatch({
      type: "SET_DATA_ALL_PRODUCTS",
      payload: resultAllProducts,
    });

    return;
  };
  const searchProductByName = async (productName) => {
    const resultAllProducts = await FetchSearchProductByName(productName);
    dispatch({
      type: "SET_DATA_ALL_PRODUCTS",
      payload: resultAllProducts,
    });

    return;
  };
  const getDataAllStores = async (storeName, page, limit) => {
    const resultAllStores = await FetchAllStores(storeName, page, limit);
    dispatch({
      type: "SET_DATA_ALL_STORES",
      payload: resultAllStores,
    });

    return;
  };
  const getDataAllStoreByOwnerEmail = async (ownerEmail) => {
    const resultStore = await FetchStoreByOwnerEmail(ownerEmail);

    resultStore.data.stores = { ...resultStore.data.stores[0] };

    dispatch({
      type: "SET_DATA_SINGLE",
      payload: resultStore,
    });

    return resultStore;
  };

  const getSingleUser = async (userId) => {
    const resultSingleUser = await FetchSingleUser(userId);
    // dispatch({
    //   type: "SET_DATA_SINGLE",
    //   payload: resultSingleUser,
    // });

    dispatch({
      type: "SET_DATA_USER",
      payload: resultSingleUser,
    });
    return resultSingleUser;
  };

  const getMyInfo = async () => {
    const resultMyInfo = await FetchMyInfo();

    dispatch({
      type: "SET_DATA_USER",
      payload: resultMyInfo,
    });

    return resultMyInfo;
  };

  const getSingleStore = async (storeId) => {
    const resultSingleStore = await FetchSingleStore(storeId);
    dispatch({
      type: "SET_DATA_SINGLE",
      payload: resultSingleStore,
    });

    return resultSingleStore;
  };

  const getSingleProduct = async (productId) => {
    const resultSingleProduct = await FetchSingleProduct(productId);
    dispatch({
      type: "SET_DATA_SINGLE",
      payload: resultSingleProduct,
    });
    return resultSingleProduct;
  };
  const getSingleOrder = async (orderId) => {
    const resultSingleOrder = await FetchSingleOrder(orderId);
    dispatch({
      type: "SET_DATA_SINGLE",
      payload: resultSingleOrder,
    });
    return resultSingleOrder;
  };

  const getReviewsOfThis = async (productId) => {
    const reviews = await FetchReviewOfProduct(productId);
    dispatch({
      type: "SET_REVIEW_THIS",
      payload: reviews,
    });
  };

  const getReviewsOfThisForAdmin = async (productId, page, limit) => {
    const reviews = await FetchReviewOfProductForAdmin(productId, page, limit);
    dispatch({
      type: "SET_REVIEW_THIS",
      payload: reviews,
    });
  };

  useEffect(() => {
    const productInStorage = JSON.parse(localStorage.getItem("favorite"));
    dispatch({
      type: "SET_DATA_CART",
      payload: productInStorage,
    });
  }, []);

  const valueToShare = {
    state,
    dispatch,
    getData,
    getDataAllUsers,
    getDataAllOrders,
    getDataAllOrdersOfAUser,
    getDataAllStores,
    getDataAllStoreByOwnerEmail,
    getDataAllProducts,
    getDataProductsUsePageAndLimit,
    getDataAllOrdersProductOfAStore,
    getDataAllProductsOfAStore,
    searchProductByName,
    getSingleUser,
    getMyInfo,
    getSingleStore,
    getSingleOrder,
    getSingleProduct,
    getReviewsOfThis,
    getDataOfThreeGenres,
    getReviewsOfThisForAdmin,
  };

  return (
    <PageContext.Provider value={valueToShare}>{children}</PageContext.Provider>
  );
}

export { PageProvider, PageContext };
