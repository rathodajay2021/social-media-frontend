import { combineReducers, legacy_createStore as createStore } from "redux";

import reducers from "./Reducers";

export const store = createStore(
  combineReducers({
    ...reducers,
  })
);
