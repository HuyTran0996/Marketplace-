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
  FetchAllProductsOfAStore,
  FetchSearchProductByName,
  FetchSingleProduct,
} from "../data/FetchProductsData";

import { FetchReviewOfProduct } from "../data/FetchReviewData";

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
  const getDataAllUsers = async (email) => {
    const resultAllUsers = await FetchAllUsers(email);
    dispatch({
      type: "SET_DATA_ALL_USERS",
      payload: resultAllUsers,
    });

    return;
  };
  const getDataAllOrders = async (orderId) => {
    const resultAllOrders = await FetchAllOrders(orderId);
    dispatch({
      type: "SET_DATA_ALL_ORDERS",
      payload: resultAllOrders,
    });

    return;
  };
  const getDataAllOrdersOfAUser = async (userID) => {
    const resultAllOrders = await FetchAllOrdersOfAUser(userID);
    dispatch({
      type: "SET_DATA_ALL_ORDERS",
      payload: resultAllOrders,
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
  const getDataAllStores = async (storeName) => {
    const resultAllStores = await FetchAllStores(storeName);
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
    dispatch({
      type: "SET_DATA_SINGLE",
      payload: resultSingleUser,
    });
    return resultSingleUser;
  };

  const getMyInfo = async () => {
    const resultMyInfo = await FetchMyInfo();
    dispatch({
      type: "SET_DATA_SINGLE",
      payload: resultMyInfo,
    });

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
    getDataAllProductsOfAStore,
    searchProductByName,
    getSingleUser,
    getMyInfo,
    getSingleStore,
    getSingleOrder,
    getSingleProduct,
    getReviewsOfThis,
  };

  return (
    <PageContext.Provider value={valueToShare}>{children}</PageContext.Provider>
  );
}

export { PageProvider, PageContext };
