import { useState, useEffect } from "react";
import { XYPlot, XAxis, YAxis, VerticalBarSeries } from "react-vis";
import _ from "lodash";

const sampleData = [
  { x: "2020-09-30", y: 0.72 },
  { x: "2020-06-30", y: 0.63 },
];

export default function BarChart({ title, data, years, x, y }) {
  const [chartData, setChartData] = useState(null);
  const [lookback, setLookback] = useState(years);

  useEffect(() => {
    let temp = [];
    data.forEach((e) => {
      const date = new Date(e[x]);
      const current = new Date(_.now());

      if (current.getFullYear() - date.getFullYear() <= lookback) {
        temp.push({
          x: e[x],
          y: e[y],
        });
      }
      setChartData(_.orderBy(temp, "x", "asc"));
    });
  }, [data, years, x, y]);

  if (chartData) {
    return (
      <div>
        <h4>{title ? title : y}</h4>
        <XYPlot height={200} width={200} xType="ordinal">
          {/* <XAxis /> */}
          <YAxis width={190} position="start" tickSize={2} />
          <VerticalBarSeries opacity={0.5} data={chartData} />
        </XYPlot>
      </div>
    );
  } else {
    return <div>No data found ...</div>;
  }
}
