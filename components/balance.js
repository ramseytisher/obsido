import { useState, useEffect } from "react";
import styled from "styled-components";

import { key } from "../api/api-key.json";
import sampleBalance from "../api/sample-balance.json";
import BarChart from "./charts/bar-chart";

const Box = styled.div`
  display: flex;
`;

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

  if (balance) {
    return (
      <div>
        <h2>Balance</h2>
        <Box>
          <BarChart
            title="Annual Assets"
            data={balance.quarterlyReports}
            years={10}
            x="fiscalDateEnding"
            y="totalAssets"
          />
          <BarChart
            title="Annual Revenue"
            data={balance.annualReports}
            years={10}
            x="fiscalDateEnding"
            y="totalAssets"
          />
        </Box>
      </div>
    );
  } else {
    return <div>Loading data ...</div>;
  }
}
