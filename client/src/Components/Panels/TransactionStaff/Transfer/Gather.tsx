import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import useMediaQuery from "@mui/material/useMediaQuery";
import TextField from "@mui/material/TextField";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import SelectTransaction from "../../../Funtions/SelectArea/SelectTransaction.jsx";
import SelectGather from "../../../Funtions/SelectArea/SelectGather.jsx";
import { GenerateCode } from "../../../Funtions/GenerateCode/GenerateCode.jsx";
import { useForm } from "react-hook-form";

import "../../../../Assets/Styles/Gather/Gather.css";

import React, { useState } from "react";

export default function Gather() {
  const match = useMediaQuery("(max-width:800px)");

  const [code, setCode] = useState(GenerateCode);

  type FormValues = {
    ID: string;
    from: {
      transactionPoint: string;
      transactionStaffID: string;
      packageID: string;
    };

    to: {
      gatherPoint: string;
      note: string;
    };
  };

  const { register, handleSubmit } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  function generateCode() {
    setCode(GenerateCode);
  }

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
            ĐIỂM TẬP KẾT
          </Typography>

          <Stack
            spacing={3}
            direction={`${match ? "column" : "row"}`}
            id="GatherMain"
          >
            <Paper id="paper" style={{ width: "45%" }} elevation={3}>
              <Stack spacing={3} direction="column">
                <SelectTransaction
                  refs={{ ...register("from.transactionPoint") }}
                />
                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="Mã nhân viên"
                  variant="outlined"
                  required
                  {...register("from.transactionStaffID")}
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
                <SelectGather refs={{ ...register("to.gatherPoint") }} />
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
            onClick={generateCode}
            value={code}
            {...register("ID")}
          >
            XÁC NHẬN
          </Button>
        </Stack>
      </Paper>
    </form>
  );
}
