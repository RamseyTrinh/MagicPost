import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import { DataGrid } from "@mui/x-data-grid";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

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
    { field: "userId", headerName: "Mã nhân viên", width: 200 },
    { field: "name", headerName: "Họ và tên", width: 200 },
    { field: "location", headerName: "Địa điểm", width: 150 },
    { field: "role", headerName: "Chức danh", width: 200 },
    { field: "email", headerName: "Email", width: 250 },
    // {
    //   field: "street",
    //   headerName: "Street",
    //   description: "This column has a value getter and is not sortable.",
    //   sortable: false,
    //   width: 150,
    //   valueGetter: (params) => params.row.address.street,
    // },
  ];

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
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10, 15, 25, 30]}
          checkboxSelection
        />
        <Button
          variant="contained"
          sx={{ width: "150px" }}
          style={{ fontWeight: "bold", background: "#003e29" }}
        >
          XÓA TÀI KHOẢN
        </Button>
      </Stack>
    </Paper>
  );
}
