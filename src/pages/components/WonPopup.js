import { useEffect, useState } from "react";

export default function WonPopup({ message }) {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    setIsVisible(!!message);
  }, [message]);
  if (!isVisible) {
    return null;
  }
  return (
    <div className="absolute inset-0" onClick={() => setIsVisible(false)}>
      <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-70">
        <div className="p-12 text-lg bg-white rounded-3xl">{message}</div>
      </div>
    </div>
  );
}
