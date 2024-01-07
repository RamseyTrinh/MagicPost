import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import { DataGrid } from "@mui/x-data-grid";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useAuthUser } from "react-auth-kit";

export default function StaffStatistics() {
  const [rows, setRows] = useState([]);

  const auth = useAuthUser();
  const user = auth()?.data;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3005/api/v1/users/allTransactionStaff/${user.location}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);

        setRows(
          data.users?.map((d) => {
            return {
              id: d.userId,
              name: d.name,
              email: d.email,
              address: d.address,
              phoneNumber: d.phoneNumber,
              role: d.role,
              location: d.location,
            };
          })
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [user.location]);

  const columns = [
    { field: "id", headerName: "Mã nhân viên", width: 150 },
    { field: "name", headerName: "Họ và tên", width: 150 },
    { field: "email", headerName: "Email", width: 250 },
    { field: "location", headerName: "Làm việc tại", width: 150 },
    { field: "address", headerName: "Nơi tạm trú", width: 500 },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          onClick={() => handleDelete(params.row.id)}
          sx={{ fontWeight: "bold", background: "#ff0000" }}
        >
          Xóa
        </Button>
      ),
    },
  ];

  const handleDelete = async (userId) => {
    const isConfirmed = window.confirm("Bạn có chắc chắn muốn xóa?");
    if (isConfirmed) {
      try {
        const result = await axios.delete(
          `http://localhost:3005/api/v1/users/delete/${userId}`
        );
        console.log(result);
        fetchData();
      } catch (error) {
        console.error(error);
      }
    }
  };
  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://localhost:3005/api/v1/users/allTransactionStaff/${user.location}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);

      setRows(
        data.users?.map((d) => {
          return {
            id: d.userId,
            name: d.name,
            email: d.email,
            address: d.address,
            phoneNumber: d.phoneNumber,
            role: d.role,
            location: d.location,
          };
        })
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

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
            pageSizeOptions={[5, 10, 15, 25, 30]}
          />
        </Stack>
      </Paper>
    </div>
  );
}
