import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "../../../Assets/Styles/Table/Table.css";
import { Stack } from "@mui/material";

export default function PackageSearch({ pkgId }) {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      fetch(`http://localhost:3005/api/v1/packages/${pkgId}`)
        .then((response) => {
          return response.json();
        })

        .then((data) => {
          setRows(
            data.order.route?.map((d) => {
              return { id: d._id, ...d };
            })
          );
        });
    };
    fetchData();
  }, [pkgId]);

  const columns = [
    {
      field: "pointName",
      headerName: "Trạng thái / Đã đến",
      width: 300,
      valueGetter: (params) => params.row.pointName,
    },
    {
      field: "timestamp",
      headerName: "Thời gian",
      width: 400,
      valueGetter: (params) => params.row.timestamp,
    },
  ];

  return (
    <Paper>
      <Stack direction="column" sx={{ alignItems: "center" }}>
        <Typography
          sx={{
            textAlign: "center",
            fontFamily: "arial",
            fontWeight: "bold",
            fontSize: "30px",
            color: "#003e29",
            mb: 2,
          }}
        >
          THÔNG TIN PHÁT
        </Typography>
        <DataGrid
          id="confirmationTable"
          sx={{
            mb: 2,
            width: "60%",
            background: "#fxfxfx",
            maxHeight: "60vh",
          }}
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
        />
      </Stack>
    </Paper>
  );
}
