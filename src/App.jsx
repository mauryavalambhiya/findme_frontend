/* eslint-disable no-unused-vars */
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login/Login";
import NavLayout from "./layouts/NavLayout";
import { useLocation } from "react-router-dom";
import Home from "./pages/Home/Home";
import AddProduct from "./pages/Admin/AddProduct.jsx";
import { useState } from "react";
import { useEffect } from "react";
import Unauthorized from "./pages/Unauthorized/Unauthorized.jsx";
import RequireAuth from "./components/RequireAuth.jsx";
import Missing from "./pages/Missing/Missing.jsx";
import SuperAdmin from "./pages/superAdmin/SuperAdmin.jsx";
import Users from "./pages/Home/Users.jsx";
import Search from "./pages/Search/Search.jsx";
import RegisterForm from "./pages/Admin/AddProfile.jsx";
import Education from "./pages/Cetegory/Education.jsx";
import Dailyneed from "./pages/Cetegory/Dailyneed.jsx";
import Resturants from "./pages/Cetegory/Resturants.jsx";
import Hospitals from "./pages/Cetegory/Hospitals.jsx";
import PersistLogin from "./components/PersistLogin.jsx";
import FreeListingLayout from "./layouts/FreeListingLayout.jsx";
import ListItem from "./pages/Admin/ListItem.jsx";
import ManageProfile from "./pages/Admin/ManageProfile.jsx";
import AddProfile from "./pages/Admin/AddProfile.jsx";
import EditProfile from "./pages/Admin/EditProfile.jsx";
import EditProduct from "./pages/Admin/EditProduct.jsx";
// import { IKContext, IKImage } from 'imagekitio-react';

function App() {
  // const [theme, setTheam] = useState("DARK")
  const [theme, setTheme] = useState("DARK");
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      setTheme("DARK");
    } else {
      setTheme("LIGHT");
    }
  }, [location.pathname]);

  console.log(theme);
  const ROLES = {
    User: "0x01",
    Admin: "0x88",
  };

  return (
    <>
      <Routes>
        {/* <Route path="/login">
          <Route path="" element={<Login />} />
        </Route> */}

        <Route path="/" element={<NavLayout theme={theme} />}>
          <Route element={<PersistLogin />}>
            <Route path="" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="/search" element={<Search />} />
            <Route path="/register" element={<AddProduct />} />


            <Route path="/education" element={<Education />} />
            <Route path="/hospitals" element={<Hospitals />} />
            <Route path="/resturants" element={<Resturants />} />
            <Route path="/dailyneed" element={<Dailyneed />} />

            {/* <Route path="search" element={<Home/>} /> */}
            <Route path="unauthorized" element={<Unauthorized />} />

            {/* we want to protect these routes */}
            <Route element={<RequireAuth allowedRoles={["0x01"]} />}>
                <Route path="user" element={<Users />} />
              <Route element={<FreeListingLayout/>}>
                <Route path="addproduct" element={<AddProduct />} />
                <Route path="editproduct/:productId" element={<EditProduct />} />
                <Route path="listitem" element={<ListItem />} />
                <Route path="manageprofile" element={<ManageProfile />} />
                <Route path="manageprofile/edit/:profileId" element={<EditProfile />} />
                <Route path="manageprofile/add" element={<AddProfile />} />
              </Route>
            </Route>
            <Route element={<RequireAuth allowedRoles={["0x88"]} />}>
              <Route path="superadmin" element={<SuperAdmin />} />
            </Route>
          </Route>
        </Route>
        <Route path="*" element={<Missing />} />
      </Routes>
    </>
  );
}

export default App;
