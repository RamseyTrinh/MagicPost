import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import LINK from "@mui/material/Link";
import Divider from "@mui/material/Divider";
import { Link } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import React from "react";

export default function Login() {
  return (
    <CssBaseline>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          backgroundColor: "#f1f2ec",
        }}
      >
        <Paper
          sx={{
            width: "400px",
            textAlign: "center",
            padding: 2,
            backgroundColor: "#faf6ed",
          }}
        >
          <i
            style={{
              fontFamily: "arial",
              fontWeight: "bold",
              fontSize: "45px",
              color: "#003e29",
            }}
          >
            MAGICPOST
          </i>
          <Typography variant="h5" sx={{ mb: 3, mt: 4 }}>
            Đăng nhập
          </Typography>
          <form style={{ marginBottom: "12px" }}>
            <TextField
              fullWidth
              label="Tên tài khoản"
              sx={{
                mb: 3,
                ".MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor: "#467061",
                  },
                ".css-1jy569b-MuiFormLabel-root-MuiInputLabel-root.Mui-focused":
                  {
                    color: "#003e29",
                  },
              }}
            ></TextField>
            <TextField
              fullWidth
              label="Mật khẩu đăng nhập"
              sx={{
                mb: 3,
                ".MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor: "#467061",
                  },
                ".css-1jy569b-MuiFormLabel-root-MuiInputLabel-root.Mui-focused":
                  {
                    color: "#003e29",
                  },
              }}
            ></TextField>
            <Link to="/Menu">
              <Button
                variant="contained"
                fullWidth
                sx={{
                  backgroundColor: "#003e29",
                  color: "#fdfdfd",
                  ":hover": { backgroundColor: "#467061", color: "#bcbcbc" },
                  fontWeight: "bold",
                }}
              >
                Đăng nhập
              </Button>
            </Link>
          </form>
          <Typography sx={{ mb: 3 }}>
            <LINK href="#">Quên mật khẩu</LINK>
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Typography sx={{ fontSize: 12 }}>
            Mọi vấn đề thắc mắc xin liên hệ SĐT: 1900.8686 - Email:
            ttcs@magicpost.com.vn
          </Typography>
        </Paper>
      </Box>
    </CssBaseline>
  );
}
