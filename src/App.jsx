import "./App.css";
import TokenSaleForm from "./components/TokenSaleForm";
import Navbar from "./components/Navbar";
import BalChecker from "./components/BalChecker";
import TokenSaleEventList from "./components/Sales";
function App() {
  return (
    <>
      <Navbar />

      <TokenSaleForm />
      <BalChecker />
      <TokenSaleEventList />
    </>
  );
}

export default App;
