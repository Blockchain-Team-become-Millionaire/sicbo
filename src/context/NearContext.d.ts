import { Contract, WalletConnection } from "near-api-js";
import { contractConfig } from "../config";

declare const NearContext = WalletConnection;
declare const useNearContext: () => {
  wallet: WalletConnection;
  getContract: (contract: keyof typeof contractConfig) => Contract;
};

export { NearContext, useNearContext };
