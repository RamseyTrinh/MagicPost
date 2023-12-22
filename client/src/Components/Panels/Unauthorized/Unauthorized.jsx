import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

export default function Unauthorized() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/menu");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80vh",
        width: "100%",
      }}
    >
      <Paper
        sx={{
          width: "900px",
          textAlign: "center",
          height: "600px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div>
          <Typography variant="h1" sx={{ mb: 4 }}>
            401 - Unauthorized
          </Typography>
          <Divider variant="middle" sx={{ mb: 4 }} />
          <Typography variant="h5" sx={{ mb: 4 }}>
            Không được phép truy cập
          </Typography>
          <Button
            variant="contained"
            style={{
              fontWeight: "bold",
              background: "#003e29",
              fontSize: "20px",
            }}
            sx={{ mb: 4 }}
            onClick={handleClick}
          >
            ⬅︎ Quay về
          </Button>
        </div>
      </Paper>
    </div>
  );
}
