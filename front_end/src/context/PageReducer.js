import Cookies from "js-cookie";
const initialState = {
  error: false,
  isLoading: false,

  role: Cookies.get("forFe"),
  dataAllUsers: null,
  dataAllOrders: null,
  dataAllStores: null,
  dataAllProducts: null,
  dataSingle: null,

  dataCart: [],
  reviewsOfThisProduct: null,
  dataUser: null,
  // productId: localStorage.getItem("productId"),
};

function PageReducer(state, action) {
  switch (action.type) {
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    case "SET_USER_LOGIN":
      return { ...state, role: action.payload };
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
    ////////////////////USER APP////////////////

    case "SET_DATA_CART":
      return { ...state, dataCart: action.payload };
    case "SET_REVIEW_THIS":
      return { ...state, reviewsOfThisProduct: action.payload };
    case "SET_DATA_USER":
      return { ...state, dataUser: action.payload };
    // case "SET_PRODUCT_ID":
    //   return { ...state, productId: action.payload };
    default:
      throw new Error("Invalid Action");
  }
}

export { initialState, PageReducer };
