import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import { DataGrid } from "@mui/x-data-grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useAuthUser } from "react-auth-kit";

export default function PackageStatistics() {
  const auth = useAuthUser();
  const user = auth()?.data;

  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      fetch(`http://localhost:3005/api/v1/order/currentPoint/${user.location}`)
        .then((response) => {
          return response.json();
        })

        .then((data) => {
          setRows(
            data.data?.map((d) => {
              return { id: d._id, ...d };
            })
          );
        });
    };
    fetchData();
  });

  const columns = [
    {
      field: "packagesId",
      headerName: "Mã bưu gửi",
      width: 150,
      valueGetter: (params) => params.row.packagesId,
    },
    {
      field: "senderName",
      headerName: "Tên người gửi",
      width: 150,
      valueGetter: (params) => params.row.sender.senderName,
    },
    {
      field: "senderPhone",
      headerName: "Số điện thoại",
      width: 150,
      valueGetter: (params) => params.row.sender.senderPhone,
    },
    {
      field: "receiverName",
      headerName: "Tên người nhận",
      width: 150,
      valueGetter: (params) => params.row.receiver.receiverName,
    },
    {
      field: "receiverPhone",
      headerName: "Số điện thoại",
      width: 150,
      valueGetter: (params) => params.row.receiver.receiverPhone,
    },

    {
      field: "receiverAdd",
      headerName: "Địa chỉ nhận hàng",
      width: 450,
      valueGetter: (params) => params.row.receiver.receiverAdd,
    },
    {
      field: "productName",
      headerName: "Bưu gửi",
      width: 150,
      valueGetter: (params) => params.row.package.productName,
    },
  ];

  return (
    <Paper
      sx={{
        p: 4,
        background: "#faf6ed",
        width: "100%",
      }}
    >
      <Stack alignItems={"center"}>
        <Typography
          variant="h3"
          sx={{ color: "#003e29", fontWeight: "bold", mb: 4 }}
        >
          THỐNG KÊ
        </Typography>

        <DataGrid
          id="confirmationTable"
          sx={{
            mb: 4,
            width: "100%",
            background: "#fdfdfd",
            maxHeight: "60vh",
          }}
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10, 15, 20, 25]}
        />
      </Stack>
    </Paper>
  );
}
