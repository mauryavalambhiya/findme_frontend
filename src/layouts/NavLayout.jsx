// /* eslint-disable react/prop-types */
// import NavLayoutContent from './NavLayoutContent';

// const NavLayout = (props) => {
//   // const [theme, setTheam] = useState(props.theme)
//   var theme = props.theme

//   return (
//     <>
//      {
//       (theme == "DARK")
//       ?
//        <div className=" h-screen bg-gradient-to-b from-primary-purple-dark to-primary-purple-light">
//         <NavLayoutContent theme={theme}></NavLayoutContent>
//       </div> 
//       :
//        <div className=" h-screen bg-white">
//         <NavLayoutContent theme={theme}></NavLayoutContent>
//       </div>
//     }
//     </>

   
// )}

// export default NavLayout




/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from "react";
import addIcon from "../assets/icon-park-outline_add.svg";
// import bgLineImg from "../assets/bg-Line.svg";
import OrangeBtn from "../components/OrangeBtn.jsx";
import menuIcon from "../assets/icon-menu.svg";
import addIconLight from "../assets/icon-park-outline_add_light.svg";
import { Outlet } from "react-router-dom";

const NavLayout = (props) => {
  const [isSideDrawerOpen, setIsSideDrawerOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const theam = props.theme;
  const sideDrawerRef = useRef(null);

  const toggleSideDrawer = () => {
    setIsSideDrawerOpen(!isSideDrawerOpen);
  };
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleOutsideClick = (event) => {
    if (
      sideDrawerRef.current &&
      !sideDrawerRef.current.contains(event.target)
    ) {
      setIsSideDrawerOpen(false);
    }
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {})

  return (
    <>
    <div 
    className={ theam === 'DARK' 
    ?" h-screen bg-gradient-to-b from-primary-purple-dark to-primary-purple-light"
    : "h-screen bg-white"
  }>

      <div className="relative">
        {/* Wrapper for the entire content area */}
        {(isDropdownOpen || isSideDrawerOpen) && (
          <div
            className="fixed inset-0 z-40"
            onClick={handleOutsideClick}
          ></div>
        )}
        <div className="w-lvh h-fit flex flex-row justify-between px-3 py-3 relative z-50 bg-transparent  border-b-white  border-b-2">
        
          {/* <div className="">
          <p className="inline text-txt-white font-logo-font text-4xl">find</p>
          <p className="inline text-orange font-logo-font text-4xl underline">
            Me
          </p>
        </div> */}
          <div className="">
            {theam == "DARK" ? (
              <p className="inline text-txt-white font-logo-font text-4xl">
                find
              </p>
            ) : (
              <p className="inline text-black font-logo-font text-4xl">find</p>
            )}
            <p className="inline text-orange font-logo-font text-4xl underline">
              Me
            </p>
          </div>
          <div className="flex flex-row justify-evenly space-x-5 md:invalid">
            {theam == "DARK" ? (
              <div className="hidden md:flex items-center justify-center w-fit hover:bg-white hover:bg-opacity-20 p-2 hover:rounded-lg duration-150 ">
                <p className="text-txt-white text-xl font-primary-font my-auto">
                  Home
                </p>
              </div>
            ) : (
              <div className="hidden md:flex items-center justify-center w-fit hover:bg-primary-purple-light hover:bg-opacity-20 p-2 hover:rounded-lg duration-150 ">
                <p className=" text-black text-xl font-primary-font my-auto">
                  Home
                </p>
              </div>
            )}

            <div className="hidden  md:relative md:flex justify-center">
              {theam == "DARK" ? (
                <button
                  className="flex items-center justify-center w-fit hover:bg-white hover:bg-opacity-20 p-2 hover:rounded-lg duration-150"
                  onClick={toggleDropdown}
                >
                  <img src={addIcon} className="w-7" alt="Free Listing" />
                  <p className="text-txt-white text-xl font-primary-font my-auto ">
                    Free Listing
                  </p>
                </button>
              ) : (
                <button
                  className="flex items-center justify-center w-fit hover:bg-primary-purple-light hover:bg-opacity-20 p-2 hover:rounded-lg duration-150"
                  onClick={toggleDropdown}
                >
                  <img src={addIconLight} className="w-7" alt="Free Listing" />
                  <p className="text-black text-xl font-primary-font my-auto ">
                    Free Listing
                  </p>
                </button>
              )}

              {/* Dropdown menu */}
              {isDropdownOpen && (
                <div className="absolute top-full right-0 z-50 bg-primary-purple-light w-48 py-2 shadow-lg rounded-lg">
                  <p className="text-txt-white text-xl font-primary-font my-auto hover:bg-white hover:bg-opacity-50 px-4 py-2 mx-2 rounded-lg">
                    Option 1
                  </p>
                  <p className="text-txt-white text-xl font-primary-font my-auto hover:bg-white hover:bg-opacity-50 px-4 py-2 mx-2 rounded-lg">
                    Option 2
                  </p>
                  <p className="text-txt-white text-xl font-primary-font my-auto hover:bg-white hover:bg-opacity-50 px-4 py-2 mx-2 rounded-lg">
                    Option 3
                  </p>
                </div>
              )}
            </div>

            <div className="hidden md:flex items-center justify-center w-fit">
              <OrangeBtn
                btnName="Login/Signup"
                onClickFunc={() => {
                  console.log("Clicked");
                }}
              ></OrangeBtn>
            </div>

            {/* Button for smaller screens */}
            <div className="md:hidden flex items-center justify-center w-fit">
              <button
                className="bg-orange w-8 h-8 rounded-sm p-2"
                onClick={toggleSideDrawer}
              >
                <img src={menuIcon} alt="" />
              </button>
            </div>
          </div>
          {/* Side drawer */}
          <div
            ref={sideDrawerRef}
            className={`md:hidden fixed inset-y-0 right-0 z-50 bg-primary-purple-dark w-1/2 max-w-sm transform transition-transform ${
              isSideDrawerOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            {/* Side drawer content */}
            <div className="p-4">
              <p className="text-txt-white text-xl font-primary-font my-auto">
                Drawer Content
              </p>
              {/* Close button */}
              <button className="text-txt-white" onClick={toggleSideDrawer}>
                Close
              </button>
            </div>
          </div>
        </div>
        <div>
          <Outlet />
        </div>
      </div>
    </div>
      {/* BG-DARK CODE */}
      {/* <div className=" h-screen bg-gradient-to-b from-primary-purple-dark to-primary-purple-light ">
        <NavLayout></NavLayout>
        <Home></Home>
      </div> */}

      {/* BG-Light CODE */}
      {/* <div className=" h-screen bg-white">
        <NavLayout></NavLayout>
        <Home></Home>
      </div> */}
      {/* <Login></Login> */}
    </>
  );
};

export default NavLayout;
