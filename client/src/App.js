import Menu from "./Components/Menu/Menu";
import Login from "./Components/Login/Login";
import Landing from "./Components/Landing/Landing";
import { Route, Routes, Navigate } from "react-router-dom";
import { useIsAuthenticated } from "react-auth-kit";
import Form from "./Components/Panels/Form/Form.tsx";
import Transfer from "./Components/Panels/Transfer/Transfer";
import { useAuthUser } from "react-auth-kit";

export default function App() {
  const auth = useAuthUser();
  const role = auth()?.data.role;
  const PrivateRoute = () => {
    const isAuthenticated = useIsAuthenticated();
    const auth = isAuthenticated();
    console.log(auth);
    return auth ? <Menu /> : <Navigate to="/login" />;
  };

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/menu" element={<PrivateRoute />}>
        <Route index element={<div>{role}</div>} />
        <Route path="taodonhang" element={<Form />} />
        <Route path="chuyenhang" element={<Transfer />} />
        {/* <Route path="xacnhan" element={<Confi />} /> */}
        {/* <Route path="thongke" element={<Form />} /> */}
      </Route>
    </Routes>
  );
}
