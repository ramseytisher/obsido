import { useState, useEffect } from "react";

import { key } from "../api/api-key.json";
import sampleEarnings from "../api/sample-earnings.json";

export default function Earnings({ symbol, dev }) {
  const [earnings, setEarnings] = useState(null);
  useEffect(() => {
    if (dev) {
      setEarnings(sampleOverview);
    } else {
      fetch(
        `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${key}`
      )
        .then((res) => res.json())
        .then((data) => setEarnings(data))
        .catch((error) => setError(error));
    }
  }, []);

  return <pre>{JSON.stringify(earnings, null, 2)}</pre>;
}
