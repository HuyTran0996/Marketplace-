import { createContext, useReducer, useEffect } from "react";

import { initialState, PageReducer } from "./PageReducer";
import {
  FetchAllUsers,
  FetchAllOrders,
  FetchAllStores,
} from "../data/FetchUsersData";

const PageContext = createContext();

function PageProvider({ children }) {
  const [state, dispatch] = useReducer(PageReducer, initialState);
  const { isLogin, dataAllUsers, dataAllOrders } = state;

  const currentUrl = typeof window !== "undefined" ? window.location.href : "";
  console.log("current Url:", currentUrl);

  const getData = async () => {
    try {
      const resultAllUsers = await FetchAllUsers();
      dispatch({
        type: "SET_DATA_ALL_USERS",
        payload: resultAllUsers,
      });

      const resultAllOrders = await FetchAllOrders();
      console.log("data all orders", resultAllOrders);
      dispatch({
        type: "SET_DATA_ALL_ORDERS",
        payload: resultAllOrders,
      });

      const resultAllStores = await FetchAllStores();
      console.log("data all orders", resultAllStores);
      dispatch({
        type: "SET_DATA_ALL_STORES",
        payload: resultAllStores,
      });

      return;
    } catch (err) {
      console.log(`Error Home: ${err.name}: ${err.message}`);
    }
  };

  const valueToShare = { state, dispatch, getData };

  return (
    <PageContext.Provider value={valueToShare}>{children}</PageContext.Provider>
  );
}

export { PageProvider, PageContext };
