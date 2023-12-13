import Menu from "./Components/Menu/Menu.js";
import Login from "./Components/Login/Login.jsx";
import Landing from "./Components/Landing/Landing.jsx";
import { Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <Routes>
      <Route path="/Menu" element={<Menu />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/" element={<Landing />} />
    </Routes>
  );
}
