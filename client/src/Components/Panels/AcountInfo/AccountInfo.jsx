import { useAuthUser } from "react-auth-kit";
import PersonIcon from "@mui/icons-material/Person";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import BadgeIcon from "@mui/icons-material/Badge";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PlaceIcon from "@mui/icons-material/Place";
import { Button } from "@mui/material";
import React from "react";

export default function AccountInfo() {
  const auth = useAuthUser();
  const user = auth().data;

  console.log(user);

  function DisplayInfo({ value, Icon }) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-end",
          width: "350px",
          mb: 4,
        }}
      >
        <Icon sx={{ mr: 2, my: 0.5 }} />
        <TextField
          sx={{
            ".css-l4u8b9-MuiInputBase-root-MuiInput-root:after": {
              borderColor: "green",
            },
          }}
          defaultValue={value}
          id="input-with-sx"
          variant="standard"
          fullWidth
          inputProps={{ readOnly: true }}
        />
      </Box>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80vh",
        width: "100%",
        flexDirection: "column",
      }}
    >
      <i
        style={{
          fontFamily: "arial",
          fontWeight: "bold",
          fontSize: "60px",
          color: "#003e29",
          marginBottom: "20px",
        }}
      >
        MAGICPOST
      </i>
      <Paper sx={{ padding: 1, width: "400px" }}>
        <Stack sx={{ alignItems: "center" }} direction="column">
          <PersonIcon sx={{ color: "action.active", fontSize: "250px" }} />
          <DisplayInfo value={user.name} Icon={AccountCircle} />
          <DisplayInfo value={user.userId} Icon={BadgeIcon} />
          <DisplayInfo
            value={
              user.role === "admin"
                ? "Lãnh đạo"
                : user.role === "transactionAdmin"
                ? "Trưởng điểm giao dịch"
                : user.role === "warehouseAdmin"
                ? "Trưởng điểm tập kết"
                : user.role === "transactionStaff"
                ? "Giao dịch viên"
                : user.role === "warehouseStaff"
                ? "Nhân viên tập kết"
                : ""
            }
            Icon={AssignmentIcon}
          />
          <DisplayInfo value={user.location} Icon={PlaceIcon} />
        </Stack>
      </Paper>
    </div>
  );
}
