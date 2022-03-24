import { utils } from "near-api-js";
import { useEffect, useState } from "react";
import { useNearContext } from "../../context/NearContext";

export default function StatComponent() {
  const { getContract, wallet } = useNearContext();
  const [stats, setStats] = useState({});

  useEffect(() => {
    const getStats = async () => {
      if (!wallet.getAccountId()) {
        return;
      }
      const contract = await getContract("main");
      if (!contract) {
        return;
      }
      console.log(contract.get_total_bet);
      const [totalBet, totalWin] = await Promise.all([
        contract.get_total_bet({
          player: wallet.getAccountId(),
        }),
        contract.get_total_win({
          player: wallet.getAccountId(),
        }),
      ]);
      console.log(totalBet, totalWin);
      setStats({
        totalBet,
        totalWin,
      });
    };
    getStats();
  }, [getContract, wallet]);

  return (
    <div>
      <div>Total Bet: {utils.format.formatNearAmount(stats.totalBet || 0)}</div>
      <div>Total Win: {utils.format.formatNearAmount(stats.totalWin || 0)}</div>
    </div>
  );
}
