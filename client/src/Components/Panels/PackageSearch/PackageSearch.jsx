import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "../../../Assets/Styles/Table/Table.css";
import { Link, useSearchParams } from "react-router-dom";
import WestIcon from "@mui/icons-material/West";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function PackageSearch() {
  const [rows, setRows] = useState([]);
  const match = useMediaQuery("(max-width:800px)");
  const [searchParam] = useSearchParams();

  const pkgId = searchParam.get("packagesId");

  function PackageLabel({ label, content }) {
    return (
      <Box sx={{ display: "flex", alignItems: "baseline" }}>
        <Typography sx={{ mr: 1, color: "#003e29", fontSize: "20px" }}>
          {label}
        </Typography>
        <Typography sx={{ fontSize: "20px" }}>{content}</Typography>
      </Box>
    );
  }

  useEffect(() => {
    const fetchData = () => {
      fetch(`http://localhost:3005/api/v1/packages/${pkgId}`)
        .then((response) => {
          console.log(response);
          return response.json();
        })

        .then((data) => {
          console.log(data);
          setRows(data);
        });
    };
    fetchData();
  }, [pkgId]);

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

  return (
    <div
      style={{
        background: "#f1f2ec",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        width: "100%",
        flexDirection: "column",
        padding: "5px",
      }}
    >
      <Paper
        sx={{
          background: "#fdfdfd",
          width: "90%",
          minheight: "810px",
          padding: 2,
          borderRadius: "15px",
        }}
      >
        <Stack direction="column" sx={{ width: "100%" }}>
          <div style={{ marginBottom: "10px" }}>
            <Stack direction="row" spacing={1}>
              <WestIcon sx={{ fontSize: "20px" }} />
              <Typography>
                <Link to="/" style={{ textDecoration: "none", color: "black" }}>
                  Quay về trang chủ
                </Link>
              </Typography>
            </Stack>
          </div>
          <div
            style={{
              mb: 4,
              //   backgroundColor: "#003e29",
              width: "100%",
              //   borderRadius: "20px",
              textAlign: "",
            }}
          >
            <i
              style={{
                fontFamily: "arial",
                fontWeight: "bold",
                fontSize: "50px",
                color: "#003e29",
              }}
            >
              MAGICPOST
            </i>
          </div>
          <div
            style={{
              width: "100%",
              padding: "20px",
              backgroundColor: "transparent",
            }}
          >
            <Stack direction="column" spacing={2}>
              <PackageLabel
                label={"Số hiệu bưu gửi:"}
                content={rows.packages?.packagesId}
              />
              <Stack
                direction={`${match ? "column" : "row"}`}
                spacing={match ? 2 : 8}
              >
                <PackageLabel
                  label={"Nơi gửi:"}
                  content={
                    rows.packages?.sender.senderAddr +
                    " " +
                    rows.packages?.sender.senderAdd
                  }
                />
                <PackageLabel
                  label={"Nơi nhận:"}
                  content={
                    rows.packages?.receiver.receiverAddr +
                    " " +
                    rows.packages?.receiver.receiverAdd
                  }
                />
              </Stack>
              <Stack
                direction={`${match ? "column" : "row"}`}
                spacing={match ? 2 : 50}
              >
                <PackageLabel
                  label={"Tên bưu gửi:"}
                  content={rows.packages?.package.productName}
                />
                <PackageLabel
                  label={"Loại hàng:"}
                  content={
                    rows.packages?.package.productType === "parcel"
                      ? "Bưu kiện"
                      : "Tài liệu"
                  }
                />
              </Stack>
              <PackageLabel label={"Trạng thái hiện tại:"} />
            </Stack>
          </div>
          <Paper sx={{ background: "#faf6ed", padding: 2 }}>
            <Typography
              sx={{
                textAlign: "center",
                fontFamily: "arial",
                fontWeight: "bold",
                fontSize: "30px",
                color: "#003e29",
                mb: 2,
              }}
            >
              THÔNG TIN PHÁT
            </Typography>
            <DataGrid
              id="confirmationTable"
              sx={{
                mb: 2,
                width: "100%",
                background: "#fxfxfx",
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
          </Paper>
        </Stack>
      </Paper>
    </div>
  );
}
