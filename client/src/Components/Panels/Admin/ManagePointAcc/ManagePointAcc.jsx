import CreatePointAdmin from "./CreatePointAdmin.jsx";
import ListPointAcc from "./ListPointAcc.jsx";
import Divider from "@mui/material/Divider";

export default function ManagePointAcc() {
  return (
    <>
      <CreatePointAdmin />
      <Divider sx={{ mb: 6, mt: 3 }} />
      <ListPointAcc />
    </>
  );
}
