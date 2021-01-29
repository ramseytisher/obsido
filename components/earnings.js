import { useState, useEffect } from "react";
import styled from "styled-components";

import { key } from "../api/api-key.json";
import sampleEarnings from "../api/sample-earnings.json";

import BarChart from "./charts/bar-chart";

const Box = styled.div`
  display: flex;
`;

export default function Earnings({ symbol, dev }) {
  const [earnings, setEarnings] = useState(null);
  useEffect(() => {
    if (dev) {
      setEarnings(sampleEarnings);
    } else {
      fetch(
        `https://www.alphavantage.co/query?function=earnings&symbol=${symbol}&apikey=${key}`
      )
        .then((res) => res.json())
        .then((data) => setEarnings(data))
        .catch((error) => setError(error));
    }
  }, [symbol]);

  if (earnings) {
    return (
      <div>
        <h2>Earnings</h2>
        <Box>
          <BarChart
            title="Quarterly Revenue"
            data={earnings.quarterlyEarnings}
            years={10}
            x="fiscalDateEnding"
            y="reportedEPS"
          />
          <BarChart
            title="Annual Revenue"
            data={earnings.annualEarnings}
            years={10}
            x="fiscalDateEnding"
            y="reportedEPS"
          />
        </Box>
      </div>
    );
  } else {
    return <div>Loading data ...</div>;
  }
}
