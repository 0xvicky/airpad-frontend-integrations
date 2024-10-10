import React, {createContext, useState} from "react";

export const AccountContext = createContext();

const AccountProvider = ({children}) => {
  const [account, setAccount] = useState("");
  const [provider, setProvider] = useState();
  const [signer, setSigner] = useState();
  const [chainId, setChainId] = useState();

  return (
    <AccountContext.Provider
      value={{
        account,
        setAccount,
        provider,
        signer,
        chainId,
        setProvider,
        setSigner,
        setChainId
      }}>
      {children}
    </AccountContext.Provider>
  );
};

export default AccountProvider;
