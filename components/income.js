import { useState, useEffect } from "react";
import styled from "styled-components";

import { key } from "../api/api-key.json";
import sampleIncome from "../api/sample-income.json";

import BarChart from "./charts/bar-chart";

const Box = styled.div`
  display: flex;
`;

export default function Income({ symbol, dev }) {
  const [income, setIncome] = useState(null);
  // const [lookback, setLookback] = useState(10);

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
  }, [symbol]);

  if (income) {
    return (
      <div>
        <h2>Income</h2>
        <Box>
          {/* <input value={lookback} onChange={(e) => setLookback(e.target.value)} />{" "} */}
          <BarChart
            title="Quarterly Revenue"
            data={income.quarterlyReports}
            years={5}
            x="fiscalDateEnding"
            y="totalRevenue"
          />
          <BarChart
            title="Annual Revenue"
            data={income.annualReports}
            years={5}
            x="fiscalDateEnding"
            y="totalRevenue"
          />
          <BarChart
            title="Annual Gross Profit"
            data={income.annualReports}
            years={5}
            x="fiscalDateEnding"
            y="grossProfit"
          />
          <BarChart
            title="Annual R & D "
            data={income.annualReports}
            years={5}
            x="fiscalDateEnding"
            y="researchAndDevelopment"
          />
        </Box>
      </div>
    );
  } else {
    return <div>No income data ...</div>;
  }
}
