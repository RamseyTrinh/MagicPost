import Stack from "@mui/material/Stack";
import useMediaQuery from "@mui/material/useMediaQuery";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import PropTypes from "prop-types";

const Navigator = (props) => {
  const match = useMediaQuery("(max-width:1000px)");

  return (
    <>
      {props.type === 2 ? (
        <Stack
          spacing={2}
          sx={{ mt: 0, mb: 4, width: "70%", justifyContent: "center" }}
          direction={`${match ? "column" : "row"}`}
        >
          <Button
            variant="contained"
            id="GatherButton"
            onClick={props.function1}
          >
            {props.label1}
          </Button>
          {match ? (
            <Divider />
          ) : (
            <div style={{ border: "1px solid black" }}></div>
          )}
          <Button
            variant="contained"
            id="GatherButton"
            onClick={props.function2}
          >
            {props.label2}
          </Button>
        </Stack>
      ) : (
        <Stack
          spacing={2}
          sx={{ mt: -1, mb: 7, width: "70%", justifyContent: "center" }}
          direction={`${match ? "column" : "row"}`}
        >
          <Button
            variant="contained"
            id="GatherButton"
            onClick={props.funtion1}
          >
            {props.label1}
          </Button>
          {match ? (
            <Divider />
          ) : (
            <div style={{ border: "1px solid black" }}></div>
          )}
          <Button
            variant="contained"
            id="GatherButton"
            onClick={props.funtion2}
          >
            {props.label2}
          </Button>
          {match ? (
            <Divider />
          ) : (
            <div style={{ border: "1px solid black" }}></div>
          )}
          <Button
            variant="contained"
            id="GatherButton"
            onClick={props.funtion3}
          >
            {props.label3}
          </Button>
        </Stack>
      )}
    </>
  );
};

Navigator.prototype = {
  type: PropTypes.number,
};

export default Navigator;
