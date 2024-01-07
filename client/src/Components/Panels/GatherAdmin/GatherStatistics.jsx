import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import { DataGrid } from "@mui/x-data-grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useAuthUser } from "react-auth-kit";

export default function GatherStatistics() {
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
      field: "receiverAddr",
      headerName: "Địa chỉ nhận",
      width: 150,
      valueGetter: (params) => params.row.receiver.receiverAddr,
    },
    {
      field: "receiverAdd",
      headerName: "",
      width: 250,
      valueGetter: (params) => params.row.receiver.receiverAdd,
    },
    {
      field: "productName",
      headerName: "Bưu gửi",
      width: 100,
      valueGetter: (params) => params.row.package.productName,
    },
    // {
    //   field: "street",
    //   headerName: "Street",
    //   description: "This column has a value getter and is not sortable.",
    //   sortable: false,
    //   width: 150,
    //   valueGetter: (params) => params.row.address.street,
    // },
  ];

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80vh",
        width: "100%",
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
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
            <Typography variant="h5" sx={{ color: "#003e29", mb: 4 }}>
              Hàng tại điểm
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
      </div>
    </div>
  );
}
