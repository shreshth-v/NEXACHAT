import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { store } from "./app/store.js";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")).render(
  // Todo : Switch on the Strirt Mode
  // <StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  // </StrictMode>
);
