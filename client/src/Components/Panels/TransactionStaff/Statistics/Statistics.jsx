import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import { DataGrid } from "@mui/x-data-grid";
import Stack from "@mui/material/Stack";
import Navigator from "../../../Funtions/Navigator/Navigator";
import Typography from "@mui/material/Typography";
import { useAuthUser } from "react-auth-kit";

export default function DataTable() {
  const [rows, setRows] = useState([]);
  const [category, setCategory] = useState(0);
  const [title, setTitle] = useState("THỐNG KÊ");

  const auth = useAuthUser();
  const user = auth()?.data;

  useEffect(() => {
    const fetchData = () => {
      if (category === 1) {
        fetch(
          `http://localhost:3005/api/v1/order/packagesSuccess/${user.location}`
        )
          .then((response) => {
            return response.json();
          })

          .then((data) => {
            setRows(
              data.data?.map((d) => {
                return { id: d._id, ...d };
              })
            );
          });
      }
      if (category === 2) {
        fetch(
          `http://localhost:3005/api/v1/order/packagesFail/${user.location}`
        )
          .then((response) => {
            return response.json();
          })

          .then((data) => {
            setRows(
              data.data?.map((d) => {
                return { id: d._id, ...d };
              })
            );
          });
      }
    };
    fetchData();
  });

  const columns = [
    {
      field: "packagesId",
      headerName: "Mã bưu gửi",
      width: 150,
      valueGetter: (params) => params.row.packagesId,
    },
    {
      field: "senderName",
      headerName: "Người gửi",
      width: 150,
      valueGetter: (params) => params.row.sender.senderName,
    },
    {
      field: "senderPhone",
      headerName: "SĐT Người gửi",
      width: 150,
      valueGetter: (params) => params.row.sender.senderPhone,
    },
    {
      field: "receiverName",
      headerName: "Người nhận",
      width: 150,
      valueGetter: (params) => params.row.receiver.receiverName,
    },
    {
      field: "receiverPhone",
      headerName: "SĐT Người nhận",
      width: 180,
      valueGetter: (params) => params.row.receiver.receiverPhone,
    },

    {
      field: "receiverAdd",
      headerName: "Địa chỉ nhận",
      width: 400,
      valueGetter: (params) => params.row.receiver.receiverAdd,
    },
    {
      field: "productName",
      headerName: "Bưu Gửi",
      width: 150,
      valueGetter: (params) => params.row.package.productName,
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
    setTitle("CHUYỂN HÀNG THÀNH CÔNG");
    setCategory(1);
  }
  function handleClickRight() {
    setTitle("CHUYỂN HÀNG KHÔNG THÀNH CÔNG");
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
          label1={"THÀNH CÔNG"}
          label2={"KHÔNG THÀNH CÔNG"}
          function1={handleClickLeft}
          function2={handleClickRight}
        />
        <Paper
          sx={{
            p: 4,
            background: "#faf6ed",
            width: "100%",
          }}
        >
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
