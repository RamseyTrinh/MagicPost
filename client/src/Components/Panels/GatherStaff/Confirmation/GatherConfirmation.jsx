import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import { DataGrid } from "@mui/x-data-grid";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Navigator from "../../../Funtions/Navigator/Navigator";
import Typography from "@mui/material/Typography";

export default function DataTable() {
  const [rows, setRows] = useState([]);
  const [category, setCategory] = useState(0);
  const [title, setTitle] = useState("XÁC NHẬN BƯU GỬI");

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
    setTitle("ĐIỂM GIAO DỊCH");
    setCategory(1);
  }
  function handleClickRight() {
    setTitle("ĐIỂM TẬP KẾT KHÁC");
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
          label1={"ĐIỂM GIAO DỊCH"}
          label2={"ĐIỂM TẬP KẾT KHÁC"}
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
              checkboxSelection
            />

            {category === 1 ? (
              <Button
                variant="contained"
                sx={{ width: "150px" }}
                style={{ fontWeight: "bold", background: "#003e29" }}
              >
                XÁC NHẬN
              </Button>
            ) : (
              <Button
                variant="contained"
                sx={{ width: "150px" }}
                style={{ fontWeight: "bold", background: "#003e29" }}
              >
                XÁC NHẬN
              </Button>
            )}
          </Stack>
        </Paper>
      </div>
    </div>
  );
}
