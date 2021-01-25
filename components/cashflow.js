import { useState, useEffect } from "react";

import { key } from "../api/api-key.json";
import sampleCashflow from "../api/sample-cashflow.json";

export default function Cashflow({ symbol, dev }) {
  const [cashflow, setCashflow] = useState(null);
  useEffect(() => {
    if (dev) {
      setCashflow(sampleCashflow);
    } else {
      fetch(
        `https://www.alphavantage.co/query?function=BALANCE_SHEET&symbol=${symbol}&apikey=${key}`
      )
        .then((res) => res.json())
        .then((data) => setCashflow(data))
        .catch((error) => setError(error));
    }
  }, []);

  return <pre>{JSON.stringify(cashflow, null, 2)}</pre>;
}
