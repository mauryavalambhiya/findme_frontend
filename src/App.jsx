/* eslint-disable no-unused-vars */
import "./App.css";
import { Routes, Route } from 'react-router-dom';
import { Login } from "./pages/Login/Login";
import NavLayout from "./layouts/NavLayout";
import { useLocation } from "react-router-dom";
import Home from "./pages/Home/Home";
import AddProduct from "./pages/Home/FreeListing/AddProduct";
import { useState } from "react";
import { useEffect } from "react";
import Unauthorized from "./pages/Unauthorized/Unauthorized.jsx";
import RequireAuth from "./components/RequireAuth.jsx";
import Missing from "./pages/Missing/Missing.jsx";
import SuperAdmin from "./pages/superAdmin/SuperAdmin.jsx";
import Users from "./pages/Home/Users.jsx";
import Search from "./pages/Search/Search.jsx";

function App() {
  // const [theme, setTheam] = useState("DARK")
  const [theme, setTheme] = useState('DARK');
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/') {
      setTheme('DARK');
    } else {
      setTheme('LIGHT');
    }
  }, [location.pathname]);

  console.log(theme);
  const ROLES = {
    'User': '0x01',
    'Admin': '0x88'
  }

  return (
    <>
    <Routes>
      <Route path="/login">
        <Route path="" element={<Login/>} />
      </Route>

      <Route path="/" element={<NavLayout theme={theme}/>}>

        <Route path="" element={<Home/>} />
        <Route path="/search" element={<Search/>} />
        
        {/* <Route path="search" element={<Home/>} /> */}
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* we want to protect these routes */}
        <Route  element={<RequireAuth allowedRoles={['0x01']}/>}>
          <Route path="addproduct" element={<AddProduct/>} />
          <Route path="user" element={<Users/>} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
          <Route path="superadmin" element={<SuperAdmin/>} />
        </Route>
      </Route>

      <Route path="*" element={<Missing />} />

    </Routes>
    </>
  );
}

export default App;
