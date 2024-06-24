import React, { useEffect, useState } from "react";
import { Container, Text } from "@mantine/core";
import AgricultureTable from "./AgricultureTable";
import SummaryTable from "./SummaryTable";
import TopProducingCrops from "./TopProducingCrops";
import ProductionTrendsOverTime from "./ProductionTrendsOverTime";

import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [summary, setSummary] = useState({ total: {}, average: {} });

  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => {
        const processedData = data.map((row) =>
          Object.fromEntries(
            Object.entries(row).map(([key, value]) => [key, value ?? 0])
          )
        );
        setData(processedData);

        const total = processedData.reduce((acc, row) => {
          for (const [key, value] of Object.entries(row)) {
            if (typeof value === "number") {
              acc[key] = (acc[key] || 0) + value;
            }
          }
          return acc;
        }, {});

        const average = {};
        for (const key in total) {
          average[key] = total[key] / processedData.length;
        }

        setSummary({ total, average });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <Container size="sm">
      <div className="border-b-2 text-center text-xl font-bold mb-4 ">
        Indian Agriculture Analytics
      </div>
      {data.length === 0 ? (
        <Text align="center">Loading...</Text>
      ) : (
        <>
          <SummaryTable summary={summary} />
          <TopProducingCrops data={data} />
          <ProductionTrendsOverTime data={data} />
          <AgricultureTable data={data} />
        </>
      )}
    </Container>
  );
}

export default App;
