import {createRoot} from "react-dom/client";
import App from "./App.jsx";

import "./index.css";
import {BrowserRouter as Router} from "react-router-dom";

import AccountProvider from "./context/AccountContext.jsx";

createRoot(document.getElementById("root")).render(
  <Router>
    <AccountProvider>
      <App />
    </AccountProvider>
  </Router>
);
