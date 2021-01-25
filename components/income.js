import { useState, useEffect } from "react";

import { key } from "../api/api-key.json";
import sampleIncome from "../api/sample-income.json";

export default function Income({ symbol, dev }) {
  const [income, setIncome] = useState(null);
  useEffect(() => {
    if (dev) {
      setIncome(sampleIncome);
    } else {
      fetch(
        `https://www.alphavantage.co/query?function=INCOME_STATEMENT&symbol=${symbol}&apikey=${key}`
      )
        .then((res) => res.json())
        .then((data) => setIncome(data))
        .catch((error) => setError(error));
    }
  }, []);

  return <pre>{JSON.stringify(income, null, 2)}</pre>;
}
