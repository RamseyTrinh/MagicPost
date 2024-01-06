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
  const [category, setCategory] = useState(0);

  useEffect(() => {
    const fetchData = () => {
      fetch("http://localhost:3005/api/v1/packages/getAllPackages")
        .then((response) => {
          return response.json();
        })

        .then((data) => {
          setRows(
            data.data.packages.map((d) => {
              return {
                id: d.packagesId,
                packagesId: d.packagesId,
                productName: d.package.productName,
                productType: d.package.productType,
                senderName: d.sender.senderName,
                senderAdd: d.sender.senderAdd,
                receiverName: d.receiver.receiverName,
                receiverAdd: d.receiver.receiverAdd,
                cost: d.cost.totalCost,
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
    { field: "productName", headerName: "Tên bưu gửi", width: 180 },
    { field: "productType", headerName: "Loại", width: 100 },
    { field: "senderName", headerName: "Người gửi", width: 180 },
    { field: "senderAdd", headerName: "Nơi gửi", width: 280 },
    { field: "receiverName", headerName: "Người nhận", width: 180 },
    { field: "receiverAdd", headerName: "Nơi nhận", width: 280 },
    { field: "cost", headerName: "Giá tiền", width: 100 },

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
            <Stack
              direction="row"
              spacing={4}
              sx={{ alignItems: "center", mb: 4 }}
            >
              <FormControl sx={{ minWidth: 120 }}>
                <InputLabel>Loại hàng</InputLabel>
                <Select
                  label="Loại hàng"
                  value={category}
                  onChange={handleChange}
                  displayEmpty
                  sx={{ width: "300px", background: "#fdfdfd" }}
                >
                  <MenuItem value={0}>Tổng hàng </MenuItem>
                  <MenuItem value={1}>Hàng gửi thành công</MenuItem>
                  <MenuItem value={2}>Hàng gửi không thành công</MenuItem>
                </Select>
              </FormControl>
            </Stack>
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
                  paginationModel: { page: 0, pageSize: 50 },
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
