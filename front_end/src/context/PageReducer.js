import Cookies from "js-cookie";
const initialState = {
  error: false,
  isLoading: false,

  token: Cookies.get("forFe"),
  dataAllUsers: null,
  dataAllOrders: null,
  dataAllStores: null,
  dataAllProducts: null,
  dataSingle: null,

  cartCounter: 0,
  avatar: null,
};

function PageReducer(state, action) {
  switch (action.type) {
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    case "SET_USER_LOGIN":
      return { ...state, token: action.payload };
    case "SET_DATA_ALL_USERS":
      return { ...state, dataAllUsers: action.payload };
    case "SET_DATA_ALL_ORDERS":
      return { ...state, dataAllOrders: action.payload };
    case "SET_DATA_ALL_STORES":
      return { ...state, dataAllStores: action.payload };
    case "SET_DATA_ALL_PRODUCTS":
      return { ...state, dataAllProducts: action.payload };
    case "SET_DATA_SINGLE":
      return { ...state, dataSingle: action.payload };

    case "SET_CART_COUNTER":
      return { ...state, cartCounter: action.payload };
    case "SET_AVATAR":
      return { ...state, avatar: action.payload };

    default:
      throw new Error("Invalid Action");
  }
}

export { initialState, PageReducer };
