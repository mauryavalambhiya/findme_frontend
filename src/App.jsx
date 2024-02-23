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
import Missing from "./pages/Missing/Missing.jsx";

function App() {
  const [theme, setTheam] = useState("DARK")
  const location = useLocation()
  useEffect( () =>  {
    if(location.pathname == "/"){
      setTheam("DARK")
    }else{
      setTheam("LIGHT")
    }
  }, [theme])
  console.log(theme)

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
        {/* <Route path="search" element={<Home/>} /> */}
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* we want to protect these routes */}
        <Route path="addproduct" element={<AddProduct/>} />
      </Route>


      <Route path="*" element={<Missing />} />

    </Routes>
    </>
  );
}

export default App;
