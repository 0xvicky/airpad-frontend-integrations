import {createRoot} from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import AccountProvider from "./context/AccountContext.jsx";

createRoot(document.getElementById("root")).render(
  <AccountProvider>
    <App />
  </AccountProvider>
);
