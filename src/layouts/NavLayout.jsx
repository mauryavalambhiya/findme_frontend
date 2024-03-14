/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from "react";
import addIcon from "../assets/icon-park-outline_add.svg";
// import bgLineImg from "../assets/bg-Line.svg";
import OrangeBtn from "../components/OrangeBtn.jsx";
import menuIcon from "../assets/icon-menu.svg";
import addIconLight from "../assets/icon-park-outline_add_light.svg";
import genaralUserIcon from "../assets/genarul_icon_user.png";
import { Link, Outlet, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth.jsx";
import useLogout from "../hooks/useLogout.jsx";
import { axiosPrivate } from "../services/backen_api/axios.js";

const NavLayout = (props) => {
  const [isSideDrawerOpen, setIsSideDrawerOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isUserInfoOpen, setIsUserInfoOpen] = useState(false);
  const theam = props.theme;
  const sideDrawerRef = useRef(null);
  const navigate = useNavigate();
  const {auth} = useAuth()
  const logout = useLogout()
  const [users, setUsers] = useState(null);


  const toggleSideDrawer = () => {
    setIsSideDrawerOpen(!isSideDrawerOpen);
  };
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const toggleUserInfoDropdown = () => {
    setIsUserInfoOpen(!isUserInfoOpen);
  };

  const handleOutsideClick = (event) => {
    if (
      sideDrawerRef.current &&
      !sideDrawerRef.current.contains(event.target)
    ) {
      setIsSideDrawerOpen(false);
    }
    setIsDropdownOpen(!isDropdownOpen);
    setIsUserInfoOpen(isUserInfoOpen==true? !isUserInfoOpen:isUserInfoOpen);
    // toggleDropdown()
    // toggleUserInfoDropdown()
  };

  const loginNevigate = () => {
    navigate(`/login`, {
      replace: false,
    });
  }

  const signOut = async () => {
    await logout();
    navigate('/');
  }

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUsers = async () => {
        try {
            const response = await axiosPrivate.get('/v1/user', {
                signal: controller.signal,
                headers: {
                    'origin_private': 'x03467235737',
                }
            });
            console.log(response.data.message);
            setUsers(response.data.message)
            isMounted && setUsers(response.data.message);
        } catch (err) {
            console.error(err);
            // navigate('/login', { state: { from: location }, replace: true });
        }
    }

    getUsers();

    return () => {
        isMounted = false;
        controller.abort();
    }
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [auth])

  // useEffect(() => {
  //   console.log("FROM NEVIGATION :---- " + JSON.stringify(auth.auth.user))
  // }, [auth])

  return (
    <>
      <div
        className={
          theam === "DARK"
            ? " h-full bg-gradient-to-b from-primary-purple-dark to-primary-purple-light"
            : " h-full bg-white"
        }
      >
        <div className="relative">
          {/* Wrapper for the entire content area */}
          {(isDropdownOpen || isSideDrawerOpen) && (
            <div
              className="fixed inset-0 z-40"
              onClick={handleOutsideClick}
            ></div>
          )}
          {/* <div className={`w-lvh h-fit flex flex-row justify-between px-3 py-3 relative z-50 bg-transparent ${ theam == `DARK` : `border-b-white`? `` }   border-b-2`}> */}
          <div className={`w-lvh h-fit flex flex-row justify-between px-3 py-3 relative z-50 bg-transparent ${theam == 'DARK' ? 'border-b-white border-b-2' : ''} `}>

            {/* <div className="">
          <p className="inline text-txt-white font-logo-font text-4xl">find</p>
          <p className="inline text-orange font-logo-font text-4xl underline">
            Me
          </p>
        </div> */}
            <div className="">
              {theam == "DARK" ? (
                <Link
                  to="/"
                  className="inline text-txt-white font-logo-font text-4xl"
                >
                  find
                </Link>
              ) : (
                <Link
                  to="/"
                  className="inline text-black font-logo-font text-4xl"
                >
                  find
                </Link>
              )}
              <Link
                to="/"
                className="inline text-orange font-logo-font text-4xl underline"
              >
                Me
              </Link>
            </div>
            <div className="flex flex-row justify-evenly space-x-5 md:invalid">
              {theam == "DARK" ? (
                <div className="hidden md:flex items-center justify-center w-fit hover:bg-white hover:bg-opacity-20 p-2 hover:rounded-lg duration-150 ">
                  <Link
                    to="/"
                    className="text-txt-white block text-xl font-primary-font my-auto"
                  >
                    Home
                  </Link>
                </div>
              ) : (
                <div className="hidden md:flex items-center justify-center w-fit hover:bg-primary-purple-light hover:bg-opacity-20 p-2 hover:rounded-lg duration-150 ">
                  <Link
                    to="/"
                    className=" text-black block text-xl font-primary-font my-auto"
                  >
                    Home
                  </Link>
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
                    <img
                      src={addIconLight}
                      className="w-7"
                      alt="Free Listing"
                    />
                    <p className="text-black text-xl font-primary-font my-auto ">
                      Free Listing
                    </p>
                  </button>
                )}

                {/* Dropdown menu */}
                {isDropdownOpen && (
                  <div className="absolute top-full right-0 z-50 bg-primary-purple-light w-48 py-2 shadow-lg rounded-lg">
                    {/* <p className="text-txt-white text-xl font-primary-font my-auto hover:bg-white hover:bg-opacity-50 px-4 py-2 mx-2 rounded-lg">
                    Option 1
                  </p> */}
                    <Link
                      className="text-txt-white block text-xl font-primary-font my-auto hover:bg-white hover:bg-opacity-50 px-4 py-2 mx-2 rounded-lg"
                      to="/addproduct"
                    >
                      Add product
                    </Link>
                    <Link className="text-txt-white block text-xl font-primary-font my-auto hover:bg-white hover:bg-opacity-50 px-4 py-2 mx-2 rounded-lg"
                      to="/listitem"
                    >
                      List item
                    </Link>
                    <Link className="text-txt-white block text-xl font-primary-font my-auto hover:bg-white hover:bg-opacity-50 pl-4 pr-2 py-2 mx-2 rounded-lg"
                      to="/manageprofile"
                    >
                      Manage profile
                    </Link>
                  </div>
                )}
              </div>

              {/* <div className="hidden md:flex items-center justify-center w-fit">
              {
                auth?.accessToken == null
                ?<OrangeBtn
                btnName="Login/Signup"
                onClickFunc={() => {
                  loginNevigate()
                }}
              ></OrangeBtn>
                :<OrangeBtn
                btnName="Logout"
                onClickFunc={() => {
                  signOut()
                }}
              ></OrangeBtn>
              }
              
              
            </div> */}

              {/* ======================================================== */}
              {auth?.accessToken == null 
              ? (
                <OrangeBtn
                  btnName="Login/Signup"
                  onClickFunc={() => {
                    loginNevigate();
                  }}
                ></OrangeBtn>
              ) 
              : (
                <>
                  <div className="hidden  md:relative md:flex justify-center">
                    {theam == "DARK" ? (
                      <button
                        className="flex items-center justify-center w-fit hover:bg-white hover:bg-opacity-20 p-2 hover:rounded-lg duration-150"
                        onClick={toggleUserInfoDropdown}
                      >
                      {users == null ? (
                          <>
                            <img
                              src={genaralUserIcon}
                              className="w-10 mr-2"
                              alt="Free Listing"
                            />
                            <p className="text-white text-xl font-primary-font my-auto ">
                              UserName
                            </p>
                          </>
                        ) : (
                          <>
                          {users.profile_image !== undefined && users.profile_image !== null ? (
                            <img
                              src={users.profile_image}
                              className="w-12 rounded-3xl mr-2"
                              alt="Free Listing"
                            />
                          ) : (
                            <img
                              src={genaralUserIcon}
                              className=" w-12  "
                              alt="Free Listing"
                            />
                          )}
                          <p className="text-white text-xl font-primary-font my-auto ">
                            {users?.phone_number}
                          </p>
                        </>
                        
                        )}
                      </button>
                    ) : (
                      <button
                        className="flex items-center justify-center w-fit hover:bg-primary-purple-light hover:bg-opacity-20 p-2 hover:rounded-lg duration-150"
                        onClick={toggleUserInfoDropdown}
                      >
                        {users == null ? (
                          <>
                            <img
                              src={genaralUserIcon}
                              className="w-10"
                              alt="Free Listing"
                            />
                            <p className="text-black text-xl font-primary-font my-auto ">
                              UserName
                            </p>
                          </>
                        ) : (
                          <>
                          {users.profile_image !== undefined && users.profile_image !== null ? (
                            <img
                              src={users.profile_image}
                              className="w-12 rounded-3xl"
                              alt="Free Listing"
                            />
                          ) : (
                            <img
                              src={genaralUserIcon}
                              className=" w-12  "
                              alt="Free Listing"
                            />
                          )}
                          <p className="text-black text-xl font-primary-font my-auto ">
                            {users?.phone_number}
                          </p>
                        </>
                        
                        )}
                      </button>
                    )}

                    {/* Dropdown menu */}
                    {isUserInfoOpen && (
                      <div className="absolute top-full right-0 z-50 bg-primary-purple-light w-48 py-1 shadow-lg rounded-lg">
                        {/* <p className="text-txt-white text-xl font-primary-font my-auto hover:bg-white hover:bg-opacity-50 px-4 py-2 mx-2 rounded-lg">
                    Option 1
                  </p> */}
                        {/* <Link
                      className="text-txt-white block text-xl font-primary-font my-auto hover:bg-white hover:bg-opacity-50 px-4 py-2 mx-2 rounded-lg"
                      to="/register"
                    >
                      Add product
                    </Link>
                    <p className="text-txt-white text-xl font-primary-font my-auto hover:bg-white hover:bg-opacity-50 px-4 py-2 mx-2 rounded-lg">
                      Option 2
                    </p> */}
                        <p className="text-txt-white text-xl font-primary-font my-auto hover:bg-opacity-50 pl-1 py-1 mx-1 rounded-lg">
                          <OrangeBtn
                            btnName="Logout"
                            onClickFunc={() => {
                              signOut();
                            }}
                          ></OrangeBtn>
                        </p>
                      </div>
                    )}
                  </div>
                </>
              )}

              {/* ======================================================== */}

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
