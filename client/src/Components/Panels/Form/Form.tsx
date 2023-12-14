import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import FormHelperText from "@mui/material/FormHelperText";
import useMediaQuery from "@mui/material/useMediaQuery";
import "../../../Assets/Styles/Form/Form.css";
import { useForm } from "react-hook-form";
import React from "react";
import SelectAdd from "../../Funtions/SelectAdd/SelectAdd.js";

export default function Form() {
  const match = useMediaQuery("(max-width:800px)");

  type FormValues = {
    sender: string;
    senderPhone: string;
    senderAddr: string;
    receiver: string;
    receiverPhone: string;
    receiverAddr: string;
    type: string;
    product: string;
    goods: string;
    payment: string;
  };

  const { register, handleSubmit } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3} direction={`${match ? "column" : "row"}`}>
          <Paper id="paper" style={{ width: "40%" }} elevation={3}>
            <div className="LABEL">NGƯỜI GỬI</div>
            <Divider sx={{ marginBottom: 4 }} />
            <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
              <TextField
                id="outlined-basic"
                label="Họ tên"
                variant="outlined"
                fullWidth
                required
                // name="sender"
                {...register("sender")}
              />
              <TextField
                id="outlined-basic"
                label="Điện thoại"
                variant="outlined"
                fullWidth
                required
                // name="senderPhone"
                {...register("senderPhone")}
              />
            </Stack>
            <SelectAdd />
            <TextField
              id="outlined-basic"
              label="Địa chỉ"
              variant="outlined"
              fullWidth
              required
              sx={{ mb: 6 }}
              // name="senderAddr"
              {...register("senderAddr")}
            />
            <div className="LABEL">NGƯỜI NHẬN</div>
            <Divider sx={{ marginBottom: 4 }} />
            <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
              <TextField
                id="outlined-basic"
                label="Họ tên"
                variant="outlined"
                fullWidth
                required
                // name="receiver"
                {...register("receiver")}
              />
              <TextField
                id="outlined-basic"
                label="Điện thoại"
                variant="outlined"
                fullWidth
                required
                // name="receiverPhone"
                {...register("receiverPhone")}
              />
            </Stack>
            <SelectAdd />
            <TextField
              id="outlined-basic"
              label="Địa chỉ"
              variant="outlined"
              fullWidth
              required
              sx={{ mb: 6 }}
              // name="receiverAddr"
              {...register("receiverAddr")}
            />
          </Paper>
          <Paper id="paper" style={{ width: "35%" }} elevation={3}>
            <div className="LABEL">THÔNG TIN BƯU GỬI</div>
            <Divider sx={{ marginBottom: 4 }} />
            <div
              style={{ marginBottom: 4, fontFamily: "arial", fontSize: "18px" }}
            >
              Loại Hàng
            </div>
            <RadioGroup row sx={{ mb: 4 }}>
              <FormControlLabel
                value="parcel"
                control={<Radio />}
                label="Bưu kiện"
                sx={{ marginLeft: "15%" }}
                {...register("type")}
              />
              <FormControlLabel
                value="document"
                control={<Radio />}
                label="Tài liệu"
                sx={{ marginLeft: "15%" }}
                {...register("type")}
              />
            </RadioGroup>
            <Divider sx={{ mb: 4 }} />
            <TextField
              id="outlined-basic"
              label="Tên sản phẩm"
              variant="outlined"
              fullWidth
              required
              sx={{ mb: 4 }}
              // name="product"
              {...register("product")}
            />
            <Stack spacing={1} direction="row" sx={{ marginBottom: 4 }}>
              <TextField
                id="outlined-basic"
                label="Giá trị "
                variant="outlined"
                fullWidth
                // required
                sx={{ mb: 4 }}
              />
              <TextField
                id="outlined-basic"
                label="K.lượng"
                variant="outlined"
                fullWidth
                // required
                sx={{ mb: 4 }}
              />
              <TextField
                id="outlined-basic"
                label="S.lượng"
                variant="outlined"
                fullWidth
                // required
                sx={{ mb: 4 }}
              />
            </Stack>
            <Divider sx={{ mb: 4 }} />
            <div
              style={{
                marginBottom: "15px",
                fontFamily: "arial",
                fontSize: "18px",
              }}
            >
              Kích thước
            </div>
            <Stack spacing={1} direction="row" sx={{ marginBottom: 4 }}>
              <TextField
                id="outlined-basic"
                label="Dài"
                variant="outlined"
                fullWidth
                // required
                sx={{ mb: 4 }}
              />
              <TextField
                id="outlined-basic"
                label="Rộng"
                variant="outlined"
                fullWidth
                // required
                sx={{ mb: 4 }}
              />
              <TextField
                id="outlined-basic"
                label="Cao"
                variant="outlined"
                fullWidth
                // required
                sx={{ mb: 4 }}
              />
            </Stack>
            <Divider sx={{ mb: 4 }} />
            <div
              style={{
                marginBottom: "15px",
                fontFamily: "arial",
                fontSize: "18px",
              }}
            >
              Tính chất hàng hóa đặc biệt
            </div>
            <FormGroup row>
              <FormControlLabel
                control={<Checkbox value="fragile" {...register("goods")} />}
                label="Dễ vỡ"
              />
              <FormControlLabel
                control={<Checkbox value="liquid" {...register("goods")} />}
                label="Chất lỏng"
                sx={{ ml: 4 }}
              />
              <FormControlLabel
                control={<Checkbox value="magnetic" {...register("goods")} />}
                label="Từ tính, Pin"
                sx={{ ml: 4 }}
              />
            </FormGroup>
          </Paper>
          <Paper id="paper" style={{ width: "25%" }} elevation={3}>
            <div className="LABEL">BƯU GỬI</div>
            <Divider sx={{ mb: 4 }} />
            <div
              style={{
                fontFamily: "arial",
                fontSize: "18px",
              }}
            >
              Tiền thu hộ
            </div>
            <FormHelperText style={{ margin: "0px" }}>
              Hình Thức thanh toán tiền COD
            </FormHelperText>
            <FormControlLabel
              control={<Checkbox />}
              label="Thu hộ bằng tiền hàng"
            />
            <TextField placeholder="0" fullWidth sx={{ mb: 4 }} />
            <div
              style={{
                marginBottom: 4,
                fontFamily: "arial",
                fontSize: "18px",
                marginLeft: "5%",
              }}
            >
              Người trả cước
            </div>
            <RadioGroup row sx={{ mb: 4 }}>
              <FormControlLabel
                value="sender"
                control={<Radio />}
                label="Người gửi"
                sx={{
                  marginLeft: "5%",
                  "&.Mui-checked": {
                    color: "#003e29",
                  },
                }}
                required
                {...register("payment")}
              />
              <FormControlLabel
                value="receiver"
                control={<Radio />}
                label="Người nhận"
                sx={{ marginLeft: "5%" }}
                {...register("payment")}
                required
              />
            </RadioGroup>
            <TextField
              fullWidth
              multiline
              rows={5}
              label="Ghi chú"
              sx={{ mb: 4 }}
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Đồng ý với Điều khoản quy định"
              required
            />
            <Button
              variant="contained"
              type="submit"
              fullWidth
              style={{ fontWeight: "bold", background: "#003e29" }}
            >
              Tạo bưu gửi
            </Button>
          </Paper>
        </Stack>
      </form>
    </div>
  );
}
