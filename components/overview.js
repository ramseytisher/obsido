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
  }, [symbol]);

  if (overview) {
    return (<div>
      <p>{overview.Name}</p>

      <p>Market Cap: {overview.MarketCapitalization}</p>
      <p>EPS: {overview.EPS}</p>
      <p>Beta: {overview.Beta}</p>
      <p>PE Ratio: {overview.PERatio}</p>
      <p>PEG Ratio: {overview.PEGRatio}</p>
      <p>Dividend Yield: {overview.DividendYield}</p>
      <p>Analyst Target: {overview.AnalystTargetPrice}</p>
      <p>Profit Margin: {overview.ProfitMargin}</p>

    </div>)
  } else {
    return <div>No overview data to show ... </div>
  }
}
