import { useReducer } from "react";

import Context from "./Context";
import reducer, { initialState } from "./reducer";

function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {} = state;

  const valueToShare = { state, dispatch };

  return <Context.Provider value={valueToShare}>{children}</Context.Provider>;
}

export { StoreProvider };
