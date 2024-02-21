const initialState = {
  dataAllUsers: null,
};

function PageReducer(state, action) {
  switch (action.type) {
    case "SET_DATA_ALL_USERS":
      return { ...state, dataAllUsers: action.payload };
    default:
      throw new Error("Invalid Action");
  }
}

export { initialState, PageReducer };
