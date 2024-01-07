import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import { DataGrid } from "@mui/x-data-grid";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Navigator from "../../../Funtions/Navigator/Navigator";
import Typography from "@mui/material/Typography";
import { useAuthUser } from "react-auth-kit";
import axios from "axios";

export default function DataTable() {
  const [rows, setRows] = useState([]);
  const [category, setCategory] = useState(0);
  const [title, setTitle] = useState("XÁC NHẬN BƯU GỬI");

  const auth = useAuthUser();
  const user = auth()?.data;

  const confirmApi =
    category === 1
      ? "http://localhost:3005/api/v1/order/transactionToWarehouse"
      : category === 2
      ? "http://localhost:3005/api/v1/order/warehouseToWarehouse"
      : "";
  const fetchData = () => {
    if (category === 1) {
      fetch(
        `http://localhost:3005/api/v1/order/packagesIdRequireWarehouseSend/${user.location}`
      )
        .then((response) => {
          return response.json();
        })

        .then((data) => {
          console.log(data);
          setRows(
            data.data.map((d) => {
              return { id: d };
            })
          );
        });
    }
    if (category === 2) {
      fetch(
        `http://localhost:3005/api/v1/order/packagesIdRequireWarehouseReceive/${user.location}`
      )
        .then((response) => {
          return response.json();
        })

        .then((data) => {
          setRows(
            data.data.map((d) => {
              return { id: d };
            })
          );
        });
    }
  };
  useEffect(() => {
    fetchData();
  }, [category, user.location]);

  const columns = [
    {
      field: "id",
      headerName: "Mã bưu gửi",
      width: 180,
    },
    {
      field: "confirm",
      headerName: "Xác nhận",
      width: 200,
      sortable: false,
      renderCell: (params) => (
        <Button
          onClick={async () => {
            console.log(params);
            try {
              const result = await axios.patch(confirmApi, {
                packagesId: params.id,
              });
              console.log(result);
              if (result.data.success) {
                window.alert("Xác nhận hàng đến thành công");
                fetchData();
              }
            } catch (error) {}
          }}
        >
          Xác nhận
        </Button>
      ),
    },
  ];

  function handleClickLeft() {
    setTitle("CÁC HÀNG TỪ ĐIỂM GIAO DỊCH ĐẾN");
    setCategory(1);
  }
  function handleClickRight() {
    setTitle("CÁC HÀNG TỪ ĐIỂM TẬP KẾT KHÁC ĐẾN");
    setCategory(2);
  }

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
        <Navigator
          type={2}
          label1={"HÀNG TỪ ĐIỂM GIAO DỊCH"}
          label2={"HÀNG TỪ ĐIỂM TẬP KẾT KHÁC"}
          function1={handleClickLeft}
          function2={handleClickRight}
        />
        <Paper sx={{ p: 4, background: "#faf6ed", width: "100%" }}>
          <Stack alignItems={"center"}>
            <Typography
              variant="h4"
              sx={{ color: "#003e29", fontWeight: "bold", mb: 4 }}
            >
              {title}
            </Typography>
            <DataGrid
              id="confirmationTable"
              sx={{
                mb: 4,
                width: "80%",
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
