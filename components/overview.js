import { useState, useEffect } from "react";

import { key } from "../api/api-key.json";
import sampleOverview from "../api/sample-overview.json";

export default function Overview({ symbol, dev }) {
  const [overview, setOverview] = useState(null);
  useEffect(() => {
    if (dev) {
      setOverview(sampleOverview);
    } else {
      fetch(
        `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${key}`
      )
        .then((res) => res.json())
        .then((data) => setOverview(data))
        .catch((error) => setError(error));
    }
  }, []);

  return <pre>{JSON.stringify(overview, null, 2)}</pre>;
}
