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
import TransactionAdminStatistics from "./Components/Panels/TransactionAdmin/Statistics/Statistics.jsx";
import GatherCreateAcc from "./Components/Panels/GatherAdmin/GatherCreateAcc.jsx";
import GatherStatistics from "./Components/Panels/GatherAdmin/GatherStatistics.jsx";
import GatherManage from "./Components/Panels/GatherAdmin/GatherManage.jsx";
import AdminStatistics from "./Components/Panels/Admin/AdminStatistics.jsx";
import ManagePoint from "./Components/Panels/Admin/ManagePoint/MangePoint.jsx";
import ManagePointAcc from "./Components/Panels/Admin/ManagePointAcc/ManagePointAcc.jsx";
import AccountInfo from "./Components/Panels/AcountInfo/AccountInfo.jsx";
import Unauthorized from "./Components/Panels/Unauthorized/Unauthorized.jsx";
import PackageSearch from "./Components/Panels/PackageSearch/PackageSearch.jsx";
import { useAuthUser } from "react-auth-kit";
import NotFound from "./Components/Panels/PackageSearch/notFound.jsx";

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
      <Route path="/search" element={<PackageSearch />}>
        <Route path="404notfound" element={<notFound />}></Route>
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/menu" element={<PrivateRoute />}>
        <Route index element={role && <AccountInfo />} />
        <Route path="transaction">
          {(role === "transactionStaff" || role === "transactionAdmin") && (
            <>
              <Route
                path="create"
                element={
                  role === "transactionStaff" ? <Form /> : <Unauthorized />
                }
              />
              <Route
                path="transfer"
                element={
                  role === "transactionStaff" ? <Transfer /> : <Unauthorized />
                }
              />
              <Route
                path="confirmation"
                element={
                  role === "transactionStaff" ? (
                    <Confirmation />
                  ) : (
                    <Unauthorized />
                  )
                }
              />
              <Route
                path="statistics"
                element={
                  role === "transactionStaff" ? (
                    <Statistics />
                  ) : role === "transactionAdmin" ? (
                    <TransactionAdminStatistics />
                  ) : (
                    <Unauthorized />
                  )
                }
              />
              <Route
                path="createAccount"
                element={
                  role === "transactionAdmin" ? (
                    <TransactionCreateAcc />
                  ) : (
                    <Unauthorized />
                  )
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
                element={
                  role === "warehouseStaff" ? (
                    <GatherTransfer />
                  ) : (
                    <Unauthorized />
                  )
                }
              />
              <Route
                path="confirmation"
                element={
                  role === "warehouseStaff" ? (
                    <GatherConfirmation />
                  ) : (
                    <Unauthorized />
                  )
                }
              />
              <Route
                path="createAccount"
                element={
                  role === "warehouseAdmin" ? (
                    <GatherCreateAcc />
                  ) : (
                    <Unauthorized />
                  )
                }
              />
              <Route
                path="manage"
                element={
                  role === "warehouseAdmin" ? (
                    <GatherManage />
                  ) : (
                    <Unauthorized />
                  )
                }
              />
              <Route
                path="statistics"
                element={
                  role === "warehouseAdmin" ? (
                    <GatherStatistics />
                  ) : (
                    <Unauthorized />
                  )
                }
              />
            </>
          )}
        </Route>
        <Route path="admin">
          {role === "admin" && (
            <>
              <Route
                path="managePoint"
                element={role === "admin" ? <ManagePoint /> : <Unauthorized />}
              />
              <Route
                path="manageAccount"
                element={
                  role === "admin" ? <ManagePointAcc /> : <Unauthorized />
                }
              />
              <Route
                path="statistics"
                element={
                  role === "admin" ? <AdminStatistics /> : <Unauthorized />
                }
              />
            </>
          )}
        </Route>
      </Route>
    </Routes>
  );
}
