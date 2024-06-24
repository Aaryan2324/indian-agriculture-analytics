import React from "react";
import { Grid, Paper } from "@mantine/core";

function AgricultureTable({ data }) {
  const headers = Object.keys(data[0]);

  return (
    <Grid gutter="md">
      <Paper shadow="sm">
        <div style={{ overflowX: "auto" }}>
          <h1 className="text-xl font-bold mb-4 text-center">
            Agriculture of India Table
          </h1>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
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
              {data.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {headers.map((header) => (
                    <td key={header} className="px-6 py-4 whitespace-nowrap">
                      {row[header]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Paper>
    </Grid>
  );
}

export default AgricultureTable;
