import Cookies from "js-cookie";
const initialState = {
  roleForLogin: null,
  dataAllUsers: null,
  dataAllOrders: null,
  dataAllStores: null,
  dataSingle: null,
};

function PageReducer(state, action) {
  switch (action.type) {
    case "SET_USER_LOGIN":
      return { ...state, roleForLogin: action.payload };
    case "SET_DATA_ALL_USERS":
      return { ...state, dataAllUsers: action.payload };
    case "SET_DATA_ALL_ORDERS":
      return { ...state, dataAllOrders: action.payload };
    case "SET_DATA_ALL_STORES":
      return { ...state, dataAllStores: action.payload };
    case "SET_DATA_SINGLE":
      return { ...state, dataSingle: action.payload };

    default:
      throw new Error("Invalid Action");
  }
}

export { initialState, PageReducer };
