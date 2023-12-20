import Menu from "./Components/Menu/Menu";
import Login from "./Components/Login/Login";
import Landing from "./Components/Landing/Landing";
import { Route, Routes, Navigate } from "react-router-dom";
import { useIsAuthenticated } from "react-auth-kit";
import Form from "./Components/Panels/TransactionStaff/Form/Form.tsx";
import Transfer from "./Components/Panels/TransactionStaff/Transfer/Transfer.jsx";
import Confirmation from "./Components/Panels/TransactionStaff/Confirmation/Confirmation.jsx";
import Statistics from "./Components/Panels/TransactionStaff/Statistics/Statistics.jsx";
import GatherTransfer from "./Components/Panels/GatherStaff/Transfer/GatherTransfer.jsx";
import GatherConfirmation from "./Components/Panels/GatherStaff/Confirmation/GatherConfirmation.jsx";
import CreateAcc from "./Components/Panels/TransactionAdmin/CreateAcc.tsx";
import PackageStatistics from "./Components/Panels/TransactionAdmin/PackageStatistics.jsx";
import { useAuthUser } from "react-auth-kit";

export default function App() {
  const auth = useAuthUser();
  const role = auth()?.data.role;
  const PrivateRoute = () => {
    const isAuthenticated = useIsAuthenticated();
    const auth = isAuthenticated();
    // console.log(auth);
    return auth ? <Menu /> : <Navigate to="/login" />;
  };

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/menu" element={<PrivateRoute />}>
        <Route index element={role && <div>{role}</div>} />
        <Route path="transactionStaff/create" element={<Form />} />
        <Route path="transactionStaff/transfer" element={<Transfer />} />
        <Route
          path="transactionStaff/confirmation"
          element={<Confirmation />}
        />
        <Route path="transactionStaff/statistics" element={<Statistics />} />
        <Route path="warehouseStaff/transfer" element={<GatherTransfer />} />
        <Route
          path="warehouseStaff/confirmation"
          element={<GatherConfirmation />}
        />
        <Route path="transactionAdmin/createAccount" element={<CreateAcc />} />
        <Route
          path="transactionAdmin/statistics"
          element={<PackageStatistics />}
        />
      </Route>
    </Routes>
  );
}
