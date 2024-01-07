import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Link, useSearchParams } from "react-router-dom";
import WestIcon from "@mui/icons-material/West";
import useMediaQuery from "@mui/material/useMediaQuery";
import PackageRoutes from "./PackageRoutes.jsx";
import NotFound from "./notFound.jsx";

export default function PackageSearch() {
  const [rows, setRows] = useState([]);
  const [error, setError] = useState(null); // State to hold the error message
  const match = useMediaQuery("(max-width:800px)");
  const [searchParam] = useSearchParams();
  const [fetchComplete, setFetchComplete] = useState(false);
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
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3005/api/v1/packages/${pkgId}`
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }
        const data = await response.json();
        setRows(data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
        setError("Invalid packageId");
      } finally {
        setFetchComplete(true); // Set fetch completion flag
      }
    };

    fetchData();
  }, [pkgId]);

  return (
    <div>
      {error ? (
        <NotFound></NotFound>
      ) : fetchComplete ? (
        <Paper
          sx={{
            background: "#fdfdfd",
            width: "90%",
            minheight: "810px",
            padding: 2,
            borderRadius: "15px",
            margin: "auto",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Stack direction="column" sx={{ width: "100%" }}>
            <div style={{ marginBottom: "10px" }}>
              <Stack direction="row" spacing={1}>
                <WestIcon sx={{ fontSize: "20px" }} />
                <Typography>
                  <Link
                    to="/"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    Quay về trang chủ
                  </Link>
                </Typography>
              </Stack>
            </div>
            <div
              style={{
                mb: 4,
                width: "100%",
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
                    content={rows.packages?.sender.senderAdd}
                  />
                  <PackageLabel
                    label={"Nơi nhận:"}
                    content={rows.packages?.receiver.receiverAdd}
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
                <PackageLabel
                  label={"Trạng thái hiện tại:"}
                  content={rows.order?.orderStatus}
                />
              </Stack>
            </div>
            <PackageRoutes pkgId={pkgId} />
          </Stack>
        </Paper>
      ) : null}
    </div>
  );
}
