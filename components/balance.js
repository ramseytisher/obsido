import { useState, useEffect } from "react";

import { key } from "../api/api-key.json";
import sampleBalance from "../api/sample-balance.json";

export default function Balance({ symbol, dev }) {
  const [balance, setBalance] = useState(null);
  useEffect(() => {
    if (dev) {
      setBalance(sampleBalance);
    } else {
      fetch(
        `https://www.alphavantage.co/query?function=BALANCE_SHEET&symbol=${symbol}&apikey=${key}`
      )
        .then((res) => res.json())
        .then((data) => setBalance(data))
        .catch((error) => setError(error));
    }
  }, []);

  return <pre>{JSON.stringify(balance, null, 2)}</pre>;
}
