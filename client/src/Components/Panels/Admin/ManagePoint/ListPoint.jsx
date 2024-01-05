import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import { DataGrid } from "@mui/x-data-grid";
import Stack from "@mui/material/Stack";
import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";

export default function ListPoint() {
  const [rows, setRows] = useState([]);
  const [category, setCategory] = useState(0);

  useEffect(() => {
    const fetchData = () => {
      if (category === 1) {
        fetch(
          "http://localhost:3005/api/v1/transactionPoint/AllTransactionPoint"
        )
          .then((response) => {
            return response.json();
          })

          .then((data) => {
            setRows(
              data.data.transactionPoint?.map((d) => {
                return { id: d._id, ...d };
              })
            );
          });
      }
      if (category === 2) {
        fetch("http://localhost:3005/api/v1/warehouse/allWareHouse")
          .then((response) => {
            return response.json();
          })

          .then((data) => {
            console.log(data);

            setRows(
              data.data.warehouse?.map((d) => {
                return { id: d._id, ...d };
              })
            );
          });
      }
    };
    fetchData();
  }, [category]);

  const columns = [
    category === 1
      ? {
          field: "transactionPointId",
          headerName: "ID",
          width: 80,
          valueGetter: (params) => params.row.transactionPointId,
        }
      : {
          field: "warehouseId",
          headerName: "ID",
          width: 80,
          valueGetter: (params) => params.row.warehouseId,
        },
    {
      field: "name",
      headerName: "Tên điểm",
      width: 260,
      valueGetter: (params) => params.row.name,
    },
    {
      field: "address",
      headerName: "Địa chỉ",
      width: 500,
      valueGetter: (params) => params.row.address,
    },
    category === 1
      ? {
          field: "warehouseLocation",
          headerName: "Miền",
          width: 400,
          valueGetter: (params) => params.row.warehouseLocation,
        }
      : {
          field: "location",
          headerName: "Miền",
          width: 400,
          valueGetter: (params) => params.row.location,
        },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
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
      fetch("http://localhost:3005/api/v1/transactionPoint/AllTransactionPoint")
        .then((response) => {
          return response.json();
        })

        .then((data) => {
          setRows(
            data.data.transactionPoint?.map((d) => {
              return { id: d._id, ...d };
            })
          );
        });
    }
    if (category === 2) {
      fetch("http://localhost:3005/api/v1/warehouse/allWareHouse")
        .then((response) => {
          return response.json();
        })

        .then((data) => {
          console.log(data);

          setRows(
            data.data.warehouse?.map((d) => {
              return { id: d._id, ...d };
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
          THỐNG KÊ CÁC ĐIỂM
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
              paginationModel: { page: 0, pageSize: 50 },
            },
          }}
          checkboxSelection
        />
      </Stack>
    </Paper>
  );
}
