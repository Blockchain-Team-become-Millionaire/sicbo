import { utils } from "near-api-js";
import { useState } from "react";
import { useNearContext } from "../../context/NearContext";

// const FEE = 0.25;

export default function BetComponent() {
  const { getContract } = useNearContext();
  const [amount, setAmount] = useState();

  const bet = async (value) => {
    const contract = getContract("main");
    if (!contract) {
      return;
    }
    console.log(contract);
    contract.play({
      args: {
        bet: value,
      },
      amount: utils.format.parseNearAmount(amount),
    });
  };

  const betHight = () => bet(1);
  const betLow = () => bet(0);

  return (
    <div className="py-10">
      <div>
        <input
          type="text"
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Input your bet amount"
          className="w-full p-2 my-2 border border-gray-300 rounded-md focus:outline-none focus:ringnone"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div
          role="presentation"
          onClick={betLow}
          className="flex justify-center w-full py-20 transition-colors border-gray-500 rounded-lg cursor-pointer border-1 bg-slate-200 hover:bg-slate-300"
        >
          <span className="text-2xl font-semibold">LOW</span>
        </div>
        <div
          role="presentation"
          onClick={betHight}
          className="flex justify-center w-full py-20 transition-colors border-gray-500 rounded-lg cursor-pointer border-1 bg-slate-200 hover:bg-slate-300"
        >
          <span className="text-2xl font-semibold">HIGH</span>
        </div>
      </div>
    </div>
  );
}
