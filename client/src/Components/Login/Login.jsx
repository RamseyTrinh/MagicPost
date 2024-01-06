import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import CssBaseline from "@mui/material/CssBaseline";
import { Alert, Stack } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import WestIcon from "@mui/icons-material/West";

//Hoang
import React from "react";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSignIn } from "react-auth-kit";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const signIn = useSignIn();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3005/api/v1/users/login", { email, password })
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
          setError("");
        }
      })
      .catch((err) => {
        setError(err.response.data.message);
        console.log(err.response.data.message);
      });
  };
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
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
            <FormControl sx={{ mb: 3 }} variant="outlined" fullWidth>
              <InputLabel htmlFor="outlined-adornment-password">
                Mật khẩu
              </InputLabel>
              <OutlinedInput
                onChange={(e) => setPassword(e.target.value)}
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
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
          <Stack
            direction="row"
            spacing={1}
            sx={{
              mb: 3,
              mt: 3,
              justifyContent: "center",
              ml: -3,
              alignItems: "center",
            }}
          >
            <WestIcon sx={{ fontSize: "20px" }} />
            <Typography>
              <Link to="/" style={{ textDecoration: "none", color: "black" }}>
                Quay về trang chủ
              </Link>
            </Typography>
          </Stack>
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
