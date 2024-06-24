import React, { useEffect, useState } from "react";
import { Grid, Paper } from "@mantine/core";

function TopProducingCropsTable({ data }) {
  const [topCrops, setTopCrops] = useState([]);

  useEffect(() => {
    const getTopProducingCrops = () => {
      const cropsByProduction = {};
      data.forEach((item) => {
        const cropName = item["Crop Name"];
        const production =
          parseFloat(item["Crop Production (UOM:t(Tonnes))"]) || 0;
        if (!cropsByProduction[cropName]) {
          cropsByProduction[cropName] = 0;
        }
        cropsByProduction[cropName] += production;
      });

      const sortedCrops = Object.entries(cropsByProduction).sort(
        (a, b) => b[1] - a[1]
      );

      return sortedCrops.slice(0, 5);
    };

    const topCrops = getTopProducingCrops();
    setTopCrops(topCrops);
  }, [data]);

  return (
    <Grid gutter="md">
      <Paper shadow="sm">
        <div style={{ overflowX: "auto" }}>
          <h1 className="text-xl font-bold mb-4 text-center">
            TopProducingCropsTable
          </h1>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Crop Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Production (Tonnes)
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {topCrops.map(([crop, production]) => (
                <tr key={crop}>
                  <td className="px-6 py-4 whitespace-nowrap">{crop}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {production.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Paper>
    </Grid>
  );
}

export default TopProducingCropsTable;
