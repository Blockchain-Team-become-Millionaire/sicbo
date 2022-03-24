import { useCallback, useState, useEffect } from "react";
import { useNearContext } from "../../context/NearContext";
import { utils } from "near-api-js";

export default function LoginComponent() {
  const { wallet } = useNearContext();
  const [balance, setBalance] = useState({});

  useEffect(() => {
    wallet.account().getAccountBalance().then(setBalance);
  }, [wallet]);

  const Button = useCallback(() => {
    if (wallet) {
      return (
        <div className="flex rounded-full bg-slate-200">
          <div className="py-3 pl-5 pr-3 text-sm font-medium tracking-wider">
            Balance: {Number(utils.format.formatNearAmount(balance.total || 0)).toFixed(6)} Near
          </div>
          <div className="px-5 py-3 text-sm font-medium tracking-wider text-pink-100 bg-pink-600 rounded-full shadow-sm hover:shadow-2xl hover:bg-pink-700">
            {wallet.account().accountId}
          </div>
        </div>
      );
    }
    return (
      <button
        onClick={wallet.requestSignIn}
        className="px-5 py-3 text-sm font-medium tracking-wider text-pink-100 bg-pink-600 rounded-full shadow-sm hover:shadow-2xl hover:bg-pink-700"
      >
        Login With Near
      </button>
    );
  }, [wallet, balance]);

  return (
    <div className="sticky inset-x-0 top-0 h-16">
      <div className="flex items-center justify-between h-full max-w-4xl mx-auto">
        <div></div>
        <Button />
      </div>
    </div>
  );
}
