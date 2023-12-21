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
import TransactionCreateAcc from "./Components/Panels/TransactionAdmin/TransactionCreateAcc.jsx";
import PackageStatistics from "./Components/Panels/TransactionAdmin/PackageStatistics.jsx";
import GatherCreateAcc from "./Components/Panels/GatherAdmin/GatherCreateAcc.jsx";
import GatherStatistics from "./Components/Panels/GatherAdmin/GatherStatistics.jsx";
import GatherManage from "./Components/Panels/GatherAdmin/GatherManage.jsx";
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
        <Route path="transaction">
          {(role === "transactionStaff" || role === "transactionAdmin") && (
            <>
              <Route
                path="create"
                element={role === "transactionStaff" ? <Form /> : null}
              />
              <Route
                path="transfer"
                element={role === "transactionStaff" ? <Transfer /> : null}
              />
              <Route
                path="confirmation"
                element={role === "transactionStaff" ? <Confirmation /> : null}
              />
              <Route
                path="statistics"
                element={
                  role === "transactionStaff" ? (
                    <Statistics />
                  ) : role === "transactionAdmin" ? (
                    <PackageStatistics />
                  ) : null
                }
              />
              <Route
                path="createAccount"
                element={
                  role === "transactionAdmin" ? <TransactionCreateAcc /> : null
                }
              />
            </>
          )}
        </Route>
        <Route path="warehouse">
          {(role === "warehouseStaff" || role === "warehouseAdmin") && (
            <>
              <Route
                path="transfer"
                element={role === "warehouseStaff" ? <GatherTransfer /> : null}
              />
              <Route
                path="confirmation"
                element={
                  role === "warehouseStaff" ? <GatherConfirmation /> : null
                }
              />
              <Route
                path="createAccount"
                element={role === "warehouseAdmin" ? <GatherCreateAcc /> : null}
              />
              <Route
                path="manage"
                element={role === "warehouseAdmin" ? <GatherManage /> : null}
              />
              <Route
                path="statistics"
                element={
                  role === "warehouseAdmin" ? <GatherStatistics /> : null
                }
              />
            </>
          )}
        </Route>
      </Route>
    </Routes>
  );
}
