import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import { DataGrid } from "@mui/x-data-grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useAuthUser } from "react-auth-kit";

export default function StaffStatistics() {
  const [rows, setRows] = useState([]);

  const auth = useAuthUser();
  const user = auth().data;

  const fetchData = () => {
    fetch(
      `http://localhost:3005/api/v1/users/allTransactionStaff/${user.location}`
    )
      .then((response) => {
        return response.json();
      })

      .then((data) => {
        setRows(
          data.users?.map((d) => {
            return { id: d._id, ...d };
          })
        );
      });
  };

  useEffect(() => {
    fetchData();
  });

  const columns = [
    {
      field: "userId",
      headerName: "Mã nhân viên",
      width: 150,
      valueGetter: (params) => params.row.userId,
    },
    {
      field: "name",
      headerName: "Họ và tên",
      width: 200,
      valueGetter: (params) => params.row.name,
    },
    {
      field: "phoneNumber",
      headerName: "Số điện thoại",
      width: 150,
      valueGetter: (params) => params.row.phoneNumber,
    },
    {
      field: "email",
      headerName: "Email",
      width: 250,
      valueGetter: (params) => params.row.email,
    },
    {
      field: "home",
      headerName: "Địa chỉ",
      width: 400,
      valueGetter: (params) => params.row.home,
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
