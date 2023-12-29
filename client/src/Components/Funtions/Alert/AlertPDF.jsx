import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

import GeneratePDF from "../GeneratePDF/GeneratePDF.jsx";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function DelayedMessage({ rows }) {
  const [open, setOpen] = React.useState(true);
  const [print, setPrint] = React.useState(false);

  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      setPrint(true);
    }, 4000);

    return () => clearTimeout(timeoutId);
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {print ? (
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{"PDF"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Bạn có muốn in giấy biên nhận ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <GeneratePDF rows={rows} />
            <Button onClick={handleClose}>Từ chối</Button>
          </DialogActions>
        </Dialog>
      ) : null}
    </>
  );
}

export default function AlertDialogSlide({ pkgId }) {
  const [rows, setRows] = React.useState([]);

  return (
    <React.Fragment>
      <Button
        variant="contained"
        fullWidth
        style={{ fontWeight: "bold", background: "#14507a" }}
        onClick={() => {
          fetch(`http://localhost:3005/api/v1/packages/${pkgId}`)
            .then((response) => {
              return response.json();
            })

            .then((data) => {
              console.log(data.packages);
              setRows(data.packages);
            });
          console.log(rows);
        }}
      >
        VIEW
      </Button>
      <DelayedMessage rows={rows} />
    </React.Fragment>
  );
}
