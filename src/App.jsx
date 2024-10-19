import "./App.css";

import {Routes, Route, Navigate} from "react-router-dom";

import Navbar from "./components/Navbar";
import {Airpad, NFT} from "./container";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path='/airpad'
          element={<Airpad />}
        />
        <Route
          path='/nft'
          element={<NFT />}
        />
        <Route
          path='*'
          element={
            <Navigate
              to='/airpad'
              replace
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
