import React from "react";
import BalChecker from "../components/BalChecker";
import TokenSaleEventList from "../components/Sales";
import TokenSaleForm from "../components/TokenSaleForm";
const Airpad = () => {
  return (
    <div>
      <TokenSaleForm />
      <BalChecker />
      <TokenSaleEventList />
    </div>
  );
};

export default Airpad;
