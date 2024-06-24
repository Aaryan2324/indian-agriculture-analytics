import React from "react";
import { Grid, Paper } from "@mantine/core";

function SummaryTable({ summary }) {
  const headers = Object.keys(summary.total);

  return (
    <Grid gutter="md">
      <Paper shadow="sm">
        <div style={{ overflowX: "auto" }}>
          <h1 className="text-xl font-bold mb-4 text-center">SummaryTable</h1>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Metric
                </th>
                {headers.map((header) => (
                  <th
                    key={header}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">Total</td>
                {Object.values(summary.total).map((value, index) => (
                  <td key={index} className="px-6 py-4 whitespace-nowrap">
                    {value}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">Average</td>
                {Object.values(summary.average).map((value, index) => (
                  <td key={index} className="px-6 py-4 whitespace-nowrap">
                    {value.toFixed(2)}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </Paper>
    </Grid>
  );
}

export default SummaryTable;
