import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App.jsx";
import { config } from "./config/config.js";
import "./index.css";
import { persistor, store } from "./store/store.js";

const stripePromise = loadStripe(config.key.PUBLISHABLE_KEY);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate
          loading={
            <div className="w-full flex justify-center items-center h-[90vh]">
              <ClipLoader size={100} color="blue" />
            </div>
          }
          persistor={persistor}
        >
          <Elements stripe={stripePromise}>
            <App />
          </Elements>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
