import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import { DataGrid } from "@mui/x-data-grid";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";

export default function ListPointAcc() {
  const [rows, setRows] = useState([]);
  const [category, setCategory] = useState(0);

  useEffect(() => {
    const fetchData = () => {
      if (category === 1) {
        fetch("http://localhost:3005/api/v1/users/allManager/transaction")
          .then((response) => {
            return response.json();
          })

          .then((data) => {
            console.log(data);
            setRows(
              data.map((d) => {
                const role = d.role;
                let roleToVN;
                if (role === "transactionAdmin") {
                  roleToVN = "Trưởng điểm giao dịch";
                }
                return { ...d, id: d._id, role: roleToVN };
              })
            );
          });
      }
      if (category === 2) {
        fetch("http://localhost:3005/api/v1/users/allManager/warehouse")
          .then((response) => {
            return response.json();
          })

          .then((data) => {
            setRows(
              data.map((d) => {
                const role = d.role;
                let roleToVN;
                if (role === "warehouseAdmin") {
                  roleToVN = "Trưởng điểm tập kết";
                }
                return { ...d, id: d._id, role: roleToVN };
              })
            );
          });
      }
    };
    fetchData();
  }, [category]);

  const columns = [
    { field: "userId", headerName: "Mã nhân viên", width: 150 },
    { field: "name", headerName: "Họ và tên", width: 200 },
    { field: "address", headerName: "Nơi tạm trú", width: 300 },
    { field: "location", headerName: "Làm việc tại", width: 150 },
    { field: "role", headerName: "Chức danh", width: 200 },
    { field: "email", headerName: "Email", width: 250 },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          onClick={() => handleDelete(params.row.userId)}
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

  const fetchData = () => {
    if (category === 1) {
      fetch("http://localhost:3005/api/v1/users/allManager/transaction")
        .then((response) => {
          return response.json();
        })

        .then((data) => {
          console.log(data);
          setRows(
            data.map((d) => {
              const role = d.role;
              let roleToVN;
              if (role === "transactionAdmin") {
                roleToVN = "Trưởng điểm giao dịch";
              }
              return { ...d, id: d._id, role: roleToVN };
            })
          );
        });
    }
    if (category === 2) {
      fetch("http://localhost:3005/api/v1/users/allManager/warehouse")
        .then((response) => {
          return response.json();
        })

        .then((data) => {
          setRows(
            data.map((d) => {
              const role = d.role;
              let roleToVN;
              if (role === "warehouseAdmin") {
                roleToVN = "Trưởng điểm tập kết";
              }
              return { ...d, id: d._id, role: roleToVN };
            })
          );
        });
    }
  };

  const handleChange = (e) => {
    setCategory(e.target.value);
  };

  return (
    <Paper sx={{ p: 4, background: "#faf6ed", width: "100%" }}>
      <Stack alignItems={"center"}>
        <Typography
          variant="h4"
          sx={{ color: "#003e29", fontWeight: "bold", mb: 4 }}
        >
          THỐNG KÊ TÀI KHOẢN TRƯỜNG ĐIỂM
        </Typography>
        <Stack direction="row" spacing={1} sx={{ alignItems: "center", mb: 4 }}>
          <Typography sx={{ fontSize: "20px" }}>Chọn:</Typography>
          <FormControl sx={{ minWidth: 120 }}>
            <Select
              value={category}
              onChange={handleChange}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              sx={{
                height: "35px",
                width: "170px",
                background: "#fdfdfd",
              }}
            >
              <MenuItem value={0}>-</MenuItem>
              <MenuItem value={1}>Điểm giao dịch</MenuItem>
              <MenuItem value={2}>Điểm tập kết</MenuItem>
            </Select>
          </FormControl>
        </Stack>
        <DataGrid
          id="confirmationTable"
          sx={{
            mb: 4,
            width: "100%",
            background: "#fdfdfd",
            maxHeight: "55vh",
          }}
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[10, 15, 25, 30]}
          checkboxSelection
        />
      </Stack>
    </Paper>
  );
}
