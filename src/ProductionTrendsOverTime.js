import React, { useEffect, useState } from "react";
import { Grid, Paper, Text } from "@mantine/core";

function ProductionTrendsOverTime({ data }) {
  const [cropData, setCropData] = useState([]);

  useEffect(() => {
    const cropNames = Array.from(
      new Set(data.map((item) => item["Crop Name"]))
    );

    const initialCropData = cropNames.map((cropName) => ({
      name: cropName,
      years: [],
      productions: [],
    }));

    data.forEach((item) => {
      const cropIndex = initialCropData.findIndex(
        (crop) => crop.name === item["Crop Name"]
      );

      if (cropIndex !== -1) {
        initialCropData[cropIndex].years.push(item["Year"]);
        initialCropData[cropIndex].productions.push(
          parseFloat(item["Crop Production (UOM:t(Tonnes))"]) || 0
        );
      }
    });

    setCropData(initialCropData);
  }, [data]);

  return (
    <Grid gutter="md">
      <Paper shadow="sm">
        <div style={{ overflowX: "auto" }}>
          <h1 className="text-xl font-bold mb-4 text-center">
            Production Trends Over Time Table
          </h1>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Crop Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Years
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Production (UOM:t(Tonnes))
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {cropData.map((crop, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">{crop.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {crop.years.join(", ")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {crop.productions.map((production, idx) => (
                      <span key={idx}>
                        {production.toFixed(2)}
                        {idx !== crop.productions.length - 1 && ", "}
                      </span>
                    ))}
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

export default ProductionTrendsOverTime;
