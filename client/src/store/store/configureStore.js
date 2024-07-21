import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../reducers/rootReducer"; 

export default function store() {
  return configureStore({
    reducer: rootReducer,
  });
}
