import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import LINK from "@mui/material/Link";
import Divider from "@mui/material/Divider";
import CssBaseline from "@mui/material/CssBaseline";
import { Alert } from "@mui/material";

//Hoang
import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSignIn } from "react-auth-kit";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const signIn = useSignIn();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/api/v1/users/login", { email, password })
      .then((result) => {
        // console.log(result);
        if (result.status === 200) {
          if (
            signIn({
              token: result.data.token,
              expiresIn: 480,
              tokenType: "Bearer",
              authState: {
                data: result.data.user,
              },
            })
          ) {
            navigate("/menu");
          }
          // console.log(result.data.role);
          setError("");
        }
      })
      .catch((err) => {
        setError(err.response.data.message);
        console.log(err.response.data.message);
      });
  };
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
          <form style={{ marginBottom: "12px" }} onSubmit={handleSubmit}>
            <TextField
              fullWidth
              onChange={(e) => setEmail(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              label="Mật khẩu"
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
            {error && <Alert severity="error">{error}</Alert>}

            <Button
              variant="contained"
              fullWidth
              type="submit"
              sx={{
                backgroundColor: "#003e29",
                color: "#fdfdfd",
                ":hover": { backgroundColor: "#467061", color: "#bcbcbc" },
                fontWeight: "bold",
              }}
            >
              Đăng nhập
            </Button>
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
