import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../reducers/rootReducer";
import thunk from 'redux-thunk';

export default function store() {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
  });
}
