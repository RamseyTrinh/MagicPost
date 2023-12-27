import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import useMediaQuery from "@mui/material/useMediaQuery";
import TextField from "@mui/material/TextField";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import SelectTransaction from "../../../Funtions/SelectArea/SelectTransaction.jsx";
import { useForm } from "react-hook-form";
import { useAuthUser } from "react-auth-kit";

import "../../../../Assets/Styles/Gather/Gather.css";

import React from "react";

export default function Gather() {
  const auth = useAuthUser();
  const user = auth()?.data;

  const match = useMediaQuery("(max-width:800px)");

  type FormValues = {
    from: {
      gatherPoint: string;
      gatherStaffID: string;
      packageID: string;
    };

    to: {
      finalTransactionPoint: string;
      note: string;
    };
  };

  const { register, handleSubmit } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <form className="background" onSubmit={handleSubmit(onSubmit)}>
      <Paper
        sx={{
          p: 3,
          backgroundColor: "#faf6ed",
          width: "100%",
          minHeight: "30vh",
        }}
      >
        <Stack>
          <Typography
            sx={{
              textAlign: "center",
              fontSize: "45px",
              fontWeight: "bold",
              mb: 5,
              color: "#003e29",
            }}
          >
            ĐIỂM GIAO DỊCH ĐÍCH
          </Typography>

          <Stack
            spacing={3}
            direction={`${match ? "column" : "row"}`}
            id="GatherMain"
          >
            <Paper id="paper" style={{ width: "45%" }} elevation={3}>
              <Stack spacing={3} direction="column">
                <TextField
                  fullWidth
                  inputProps={{ readOnly: true }}
                  id="outlined-basic"
                  label="Điểm tập kết"
                  variant="outlined"
                  value={user.location}
                  required
                  {...register("from.gatherPoint")}
                ></TextField>
                <TextField
                  fullWidth
                  inputProps={{ readOnly: true }}
                  id="outlined-basic"
                  label="Mã nhân viên"
                  variant="outlined"
                  value={user.userId}
                  required
                  {...register("from.gatherStaffID")}
                ></TextField>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="Mã bưu gửi"
                  variant="outlined"
                  required
                  {...register("from.packageID")}
                ></TextField>
              </Stack>
            </Paper>
            {match ? (
              <KeyboardDoubleArrowDownIcon
                sx={{ fontSize: "120px", color: "#003e29" }}
              />
            ) : (
              <KeyboardDoubleArrowRightIcon
                sx={{ fontSize: "120px", color: "#003e29" }}
              />
            )}
            <Paper id="paper" style={{ width: "45%" }} elevation={3}>
              <Stack spacing={2} direction="column">
                <SelectTransaction
                  refs={{ ...register("to.finalTransactionPoint") }}
                />
                <TextField
                  fullWidth
                  multiline
                  rows={5}
                  id="outlined-basic"
                  label="Ghi chú"
                  variant="outlined"
                  {...register("to.note")}
                ></TextField>
              </Stack>
            </Paper>
          </Stack>
          <Button
            variant="contained"
            type="submit"
            id="GatherSubmit"
            sx={{
              marginLeft: "auto",
              marginRight: "auto",
              mt: 7,
              width: "20%",
            }}
            style={{ fontWeight: "bold", background: "#003e29" }}
          >
            XÁC NHẬN
          </Button>
        </Stack>
      </Paper>
    </form>
  );
}
