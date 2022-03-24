import { useEffect, useState } from "react";
import { useNearContext } from "../../context/NearContext";

export default function BigWinComponent() {
  const { getContract, wallet } = useNearContext();
  const [bigWin, setBigWin] = useState();

  useEffect(() => {
    const getStats = async () => {
      if (!wallet.getAccountId()) {
        return;
      }

      const contract = await getContract("main");
      if (!contract) {
        return;
      }

      const _bigWin = await contract.get_big_win();
      setBigWin(_bigWin);
    };
    getStats();
  }, [getContract, wallet]);

  return (
    <div className="pt-10">
      <div className="flex items-center justify-center h-12 text-lg font-semibold">
        {bigWin ? (
          <div>
            BIGWIN - <span className="text-[#28a745]">{bigWin}</span>{" "}
          </div>
        ) : null}
      </div>
    </div>
  );
}
