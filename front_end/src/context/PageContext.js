import { createContext, useReducer, useEffect, useState } from "react";

import { initialState, PageReducer } from "./PageReducer";
import {
  FetchAllUsers,
  FetchSingleUser,
  FetchMyInfo,
} from "../data/FetchUsersData";
import { FetchAllStores, FetchSingleStore } from "../data/FetchStoresData";
import { FetchAllOrders, FetchSingleOrder } from "../data/FetchOrdersData";
import {
  FetchAllProducts,
  FetchSearchProductByName,
  FetchSingleProduct,
} from "../data/FetchProductsData";

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
  const getDataAllProducts = async (genre) => {
    const resultAllProducts = await FetchAllProducts(genre);
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
      type: "SET_AVATAR",
      payload: resultMyInfo.data.user.photo,
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

  useEffect(() => {
    const productInStoreAge = JSON.parse(localStorage.getItem("favorite"));
    dispatch({
      type: "SET_DATA_CART",
      payload: productInStoreAge,
    });
    dispatch({
      type: "SET_FAVORITE_OVERRIDE",
      payload: productInStoreAge,
    });
  }, []);

  const valueToShare = {
    state,
    dispatch,
    getData,
    getDataAllUsers,
    getDataAllOrders,
    getDataAllStores,
    getDataAllProducts,
    searchProductByName,
    getSingleUser,
    getMyInfo,
    getSingleStore,
    getSingleOrder,
    getSingleProduct,
  };

  return (
    <PageContext.Provider value={valueToShare}>{children}</PageContext.Provider>
  );
}

export { PageProvider, PageContext };
