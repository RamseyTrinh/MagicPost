import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import { DataGrid } from "@mui/x-data-grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";

export default function AdminStatistics() {
  const [rows, setRows] = useState([]);
  // const [category, setCategory] = useState(0);

  useEffect(() => {
    const fetchData = () => {
      fetch("http://localhost:3005/api/v1/packages/getAllPackages")
        .then((response) => {
          return response.json();
        })

        .then((data) => {
          // console.log(data);
          setRows(
            data.data.packages.map((d) => {
              return {
                id: d.packagesId,
                packagesId: d.packagesId,
                productName: d.package.productName,
                productType: d.package.productType,
              };
            })
          );
          console.log(data.data.packages);
        });
    };
    fetchData();
  }, []);

  const columns = [
    { field: "packagesId", headerName: "Mã bưu gửi", width: 150 },
    { field: "productName", headerName: "Tên bưu gửi", width: 150 },
    { field: "productType", headerName: "Loại bưu gửi", width: 250 },
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
            {/* <Stack
              direction="row"
              spacing={4}
              sx={{ alignItems: "center", mb: 4 }}
            >
              <FormControl sx={{ minWidth: 120 }}>
                <InputLabel>Nơi</InputLabel>
                <Select
                  label="Nơi"
                  //   value={category}
                  //   onChange={handleChange}
                  value={3}
                  displayEmpty
                  sx={{ width: "160px", background: "#fdfdfd" }}
                >
                  <MenuItem value={3}>Toàn quốc</MenuItem>
                  <MenuItem value={6}>Điểm giao dịch</MenuItem>
                  <MenuItem value={4}>Điểm tập kết</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ minWidth: 120 }}>
                <InputLabel>Loại hàng</InputLabel>
                <Select
                  label="Loại hàng"
                  value={category}
                  onChange={handleChange}
                  displayEmpty
                  sx={{ width: "150px", background: "#fdfdfd" }}
                >
                  <MenuItem value={0}>Tổng</MenuItem>
                  <MenuItem value={1}>Hàng gủi</MenuItem>
                  <MenuItem value={2}>Hàng nhận</MenuItem>
                </Select>
              </FormControl>
            </Stack> */}
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
