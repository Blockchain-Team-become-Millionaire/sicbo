import { useEffect, useState } from "react";

export const usePromiseValue = (promise) => {
  const [value, setValue] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    promise().then(setValue).catch(setError);
  }, [promise]);
  return [value, error];
};
