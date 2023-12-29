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
      ? "http://localhost:3005/api/v1/order/warehouseToTransaction"
      : category === 2
      ? "http://localhost:3005/api/v1/order/orderSuccess"
      : "";

  useEffect(() => {
    const fetchData = () => {
      if (category === 1) {
        fetch(
          `http://localhost:3005/api/v1/order/packagesIdRequireTransactionReceive/${user.location}`
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
          `http://localhost:3005/api/v1/order/packagesIdRequireReceiver/${user.location}`
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
            } catch (error) {}
          }}
        >
          Xác nhận
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

  function handleClickLeft() {
    setTitle("ĐIỂM TẬP KẾT");
    setCategory(1);
  }
  function handleClickRight() {
    setTitle("NGƯỜI NHẬN");
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
          label1={"ĐIỂM TẬP KẾT"}
          label2={"NGƯỜI NHẬN"}
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
            />
          </Stack>
        </Paper>
      </div>
    </div>
  );
}
