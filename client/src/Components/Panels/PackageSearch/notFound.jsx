import React from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";

export default function Error() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Container maxWidth="md">
        <Grid container spacing={2}>
          <Grid xs={6}>
            <Typography variant="h1">404</Typography>
            <Typography variant="h6">
              Đơn hàng bạn tìm không tồn tại, hãy thử lại!
            </Typography>
            <Link to="/" style={{ textDecoration: "none" }}>
              <Button
                variant="contained"
                sx={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  backgroundColor: "#003e29",
                  color: "white",
                }}
              >
                Quay về trang chủ
              </Button>
            </Link>
          </Grid>
          <Grid xs={6}>
            <img
              src="https://cdn.pixabay.com/photo/2017/03/09/12/31/error-2129569__340.jpg"
              alt=""
              width={500}
              height={250}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
