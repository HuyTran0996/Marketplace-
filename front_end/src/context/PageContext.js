import { createContext, useReducer, useEffect } from "react";

import { initialState, PageReducer } from "./PageReducer";
import { FetchAllUsers, FetchSingleUser } from "../data/FetchUsersData";
import { FetchAllOrders } from "../data/FetchOrdersData";
import { FetchAllStores } from "../data/FetchStoresData";

const PageContext = createContext();

function PageProvider({ children }) {
  const [state, dispatch] = useReducer(PageReducer, initialState);
  const { isLogin, dataAllUsers, dataAllOrders, dataSingle } = state;

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

  const valueToShare = { state, dispatch, getData, getSingleUser };

  return (
    <PageContext.Provider value={valueToShare}>{children}</PageContext.Provider>
  );
}

export { PageProvider, PageContext };
