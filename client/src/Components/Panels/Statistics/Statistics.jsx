import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import { DataGrid } from "@mui/x-data-grid";
import Stack from "@mui/material/Stack";
import Navigator from "../../Funtions/Navigator/Navigator";
import Typography from "@mui/material/Typography";

export default function DataTable() {
  const [rows, setRows] = useState([]);
  const [category, setCategory] = useState(0);
  const [title, setTitle] = useState("THỐNG KÊ");

  const fetchData = () => {
    if (category === 1) {
      fetch("https://jsonplaceholder.typicode.com/users")
        .then((response) => {
          return response.json();
        })

        .then((data) => {
          setRows(data);
        });
    }
    if (category === 2) {
      fetch("https://jsonplaceholder.typicode.com/comments")
        .then((response) => {
          return response.json();
        })

        .then((data) => {
          setRows(data);
        });
    }
  };

  useEffect(() => {
    fetchData();
  });

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 150 },
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
