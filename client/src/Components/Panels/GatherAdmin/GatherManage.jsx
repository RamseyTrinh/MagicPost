import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import { DataGrid } from "@mui/x-data-grid";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useAuthUser } from "react-auth-kit";

export default function GatherManager() {
  const [rows, setRows] = useState([]);

  const auth = useAuthUser();
  const user = auth()?.data;

  useEffect(() => {
    const fetchData = () => {
      fetch(
        `http://localhost:3005/api/v1/users/allWarehouseStaff/${user.location}`
      )
        .then((response) => {
          return response.json();
        })

        .then((data) => {
          console.log(data);
          setRows(
            data.users?.map((d) => {
              return { id: d.userId, name: d.name, email: d.email };
            })
          );
        });
    };
    fetchData();
  }, []);

  const columns = [
    { field: "id", headerName: "Mã nhân viên", width: 150 },
    { field: "name", headerName: "Họ và tên", width: 200 },
    { field: "email", headerName: "Email", width: 250 },
    {
      field: "delete",
      headerName: "Xóa tài khoản",
      width: 200,
      sortable: false,
      renderCell: (params) => (
        <Button
          onClick={async () => {
            console.log(params);
            try {
              const result = await axios.delete(
                `http://localhost:3005/api/v1/users/deleteUser/${params.id}`
              );
              console.log(result);
            } catch (error) {}
          }}
        >
          Xóa tài khoản
        </Button>
      ),
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
        <Paper sx={{ p: 4, background: "#faf6ed", width: "100%" }}>
          <Stack alignItems={"center"}>
            <Typography
              variant="h4"
              sx={{ color: "#003e29", fontWeight: "bold", mb: 4 }}
            >
              Quản lý tài khoản
            </Typography>
            <DataGrid
              id="confirmationTable"
              sx={{
                mb: 4,
                width: "60%",
                background: "#fdfdfd",
                maxHeight: "55vh",
              }}
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10, 15, 25, 30]}
            />
          </Stack>
        </Paper>
      </div>
    </div>
  );
}
