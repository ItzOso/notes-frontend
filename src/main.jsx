import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "react-auth-kit";
import { Provider } from "react-redux";
import {store} from "./redux/store.js";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Provider store={store}>
            <AuthProvider
                authType={"cookie"}
                authName={"_auth"}
                cookieDomain={window.location.hostname}
                cookieSecure={window.location.protocol === "https:"}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </AuthProvider>
        </Provider>
    </React.StrictMode>
);
