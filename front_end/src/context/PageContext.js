import { createContext, useReducer, useEffect } from "react";

import { initialState, PageReducer } from "./PageReducer";
import {
  FetchAllUsers,
  FetchSingleUser,
  FetchMyInfo,
} from "../data/FetchUsersData";
import { FetchAllStores, FetchSingleStore } from "../data/FetchStoresData";
import { FetchAllOrders, FetchSingleOrder } from "../data/FetchOrdersData";

const PageContext = createContext();

function PageProvider({ children }) {
  const [state, dispatch] = useReducer(PageReducer, initialState);
  const { roleForLogin, dataAllUsers, dataAllOrders, dataSingle } = state;

  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  const getData = async () => {
    try {
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
    } catch (err) {
      console.log(`Error Home: ${err.name}: ${err.message}`);
    }
  };

  const getSingleUser = async (userId) => {
    try {
      const resultSingleUser = await FetchSingleUser(userId);
      dispatch({
        type: "SET_DATA_SINGLE",
        payload: resultSingleUser,
      });
      return resultSingleUser;
    } catch (err) {
      console.log(`Error Home: ${err.name}: ${err.message}`);
    }
  };

  const getMyInfo = async () => {
    try {
      const resultMyInfo = await FetchMyInfo();
      dispatch({
        type: "SET_DATA_SINGLE",
        payload: resultMyInfo,
      });
      return resultMyInfo;
    } catch (err) {
      console.log(`Error Home: ${err.name}: ${err.message}`);
    }
  };

  const getSingleStore = async (storeId) => {
    try {
      const resultSingleStore = await FetchSingleStore(storeId);
      dispatch({
        type: "SET_DATA_SINGLE",
        payload: resultSingleStore,
      });
      return resultSingleStore;
    } catch (err) {
      console.log(`Error Home: ${err.name}: ${err.message}`);
    }
  };

  const getSingleOrder = async (orderId) => {
    try {
      const resultSingleOrder = await FetchSingleOrder(orderId);
      dispatch({
        type: "SET_DATA_SINGLE",
        payload: resultSingleOrder,
      });
      return resultSingleOrder;
    } catch (err) {
      console.log(`Error Home: ${err.name}: ${err.message}`);
    }
  };

  const valueToShare = {
    state,
    dispatch,
    getData,
    getSingleUser,
    getMyInfo,
    getSingleStore,
    getSingleOrder,
  };

  return (
    <PageContext.Provider value={valueToShare}>{children}</PageContext.Provider>
  );
}

export { PageProvider, PageContext };
