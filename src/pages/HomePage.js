import { useEffect, useState } from "react";
import BetComponent from "./components/BetComponent";
import StatComponent from "./components/StatComponent";
import LoginComponent from "./components/LoginComponent";
import BigWinComponent from "./components/BigWinComponent";
import { useNearContext } from "../context/NearContext";
import WonPopup from "./components/WonPopup";

export default function HomePage() {
  const { wallet } = useNearContext();
  const [wonMessage, setWonMessage] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const transactionHashes = params.get("transactionHashes");
    if (transactionHashes) {
      window.history.replaceState({}, document.title, "/");
      wallet
        .account()
        .connection.provider.txStatus(transactionHashes, wallet.getAccountId())
        .then((tx) => {
          const { receipts_outcome } = tx;
          const { outcome } = receipts_outcome[0];
          const logs = outcome.logs;
          const log = logs.find((log) => log.startsWith(wallet.getAccountId()));
          setWonMessage(log);
        });
    }
  }, [wallet]);

  return (
    <main>
      <LoginComponent />
      <div className="max-w-4xl mx-auto">
        <BigWinComponent />
        <BetComponent />
        <StatComponent />
      </div>
      <WonPopup message={wonMessage} />
    </main>
  );
}
