import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

import { connect, Contract, keyStores, WalletConnection } from "near-api-js";
import { contractConfig } from "../config";

const config = {
  networkId: "testnet",
  keyStore: new keyStores.BrowserLocalStorageKeyStore(),
  nodeUrl: "https://rpc.testnet.near.org",
  walletUrl: "https://wallet.testnet.near.org",
  helperUrl: "https://helper.testnet.near.org",
  explorerUrl: "https://explorer.testnet.near.org",
};

const NearContext = createContext({});
export const useNearContext = () => useContext(NearContext);

export default function NearContextProvider({ children }) {
  const [wallet, setWallet] = useState(null);
  const [contracts, setContract] = useState({});

  useEffect(() => {
    const initWalletConnection = async () => {
      const near = await connect(config);
      const wallet = new WalletConnection(near);
      setWallet(wallet);
    };
    initWalletConnection();
  }, []);

  const getContract = useCallback(
    (contractName) => {
      if (!wallet) {
        return null;
      }
      if (contracts[contractName]) {
        return contracts[contractName];
      }
      console.log(wallet.account());
      const contract = new Contract(
        wallet.account(),
        contractConfig[contractName].contract,
        contractConfig[contractName].methods
      );
      setContract((prev) => ({ ...prev, [contractName]: contract }));
      return contract;
    },
    [wallet, contracts]
  );

  const contextValue = useMemo(() => ({ wallet, getContract }), [wallet, getContract]);

  if (!wallet) {
    return null;
  }

  return <NearContext.Provider value={contextValue}>{children}</NearContext.Provider>;
}
