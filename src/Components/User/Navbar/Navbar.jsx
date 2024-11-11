import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useUserAuth } from "../../../Context/UserAuthContext";
import { FaBell } from "react-icons/fa";

//icons
import { HiMenu } from "react-icons/hi";
import { HiMenuAlt1 } from "react-icons/hi";
import { HiMenuAlt3 } from "react-icons/hi";
import { FaUserCircle } from "react-icons/fa";
import { FaCaretDown } from "react-icons/fa";
import { FaCaretRight } from "react-icons/fa";
import Logo from "../../../assets/images/carpool.png";
//components
import ResponsiveMenu from "./ResponsiveMenu";
import SignUp from "../SignUp";
import Modal from "react-modal";
import axios from "axios";
import { motion } from "framer-motion";
function Navbar() {
  const PositionYOpacity = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 },
  };
  const PositionUpDownYOpacity = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 },
  };
  //destrcutring of menu variable
  const [MobileShowMenu, setMobileShowMenu] = useState(false);
  const [UserData, setUserData] = useState();
  const [NotificationCount, SetNotificationCount] = useState(0);

  const [NotificationList, SetNotificationList] = useState();
  const { logOut, user } = useUserAuth();
  const Navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8000/RideNotification`).then((response) => {
      SetNotificationList(
        response.data.filter(
          (e) => e.UserUID == user.uid && e.Status == "Unread"
        )
      );
      SetNotificationCount(
        response.data.filter(
          (e) => e.UserUID == user.uid && e.Status == "Unread"
        ).length
      );
    });
  }, [NotificationList]);
  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const response = await axios.get(`http://localhost:8000/Users`);
        setUserData(response.data.filter((e) => e.UID == user.uid));
      }
    };

    fetchUserData();
  }, [UserData]);
  //function to show menu
  const ToggleMenu = () => {
    setMobileShowMenu(!MobileShowMenu);
  };
  const handleLogout = async () => {
    try {
      await logOut();
      Navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      <motion.nav
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={PositionUpDownYOpacity}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r w-[98%] bg-white mt-2 rounded-lg mx-auto py-2 px-3 relative z-[1050]"
      >
        <div>
          <div className="flex justify-between   items-center">
            {/* Logo Section */}
            <div className="text-3xl md:text-3xl  uppercase">
              <Link to={"/home"} className="flex items-center ">
                <span className="">Car</span>
                <span className="inline-block font-bold text-primary">P</span>
                <span>
                  <img
                    src={Logo}
                    className="w-[50px] md:w[70px] --translate-y-10"
                  ></img>
                </span>
                <span className="inline-block font-bold text-primary">L</span>
              </Link>
            </div>
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center">
              <ul className="list-none flex flex-row items-center gap-8 font-bold -translate-x-16">
                <li className="hover:text-adminprimary active:text-primary">
                  <Link to={"/home"}>Home</Link>
                </li>
                <li className="hover:text-adminprimary active:text-primary">
                  {" "}
                  <Link to="/view-rides">Search Ride</Link>
                </li>
                <li className="group relative cursor-pointer hover:text-adminprimary active:text-primary">
                  <Link
                    to={"/contact-us"}
                    className="flex items-center gap-[2px]"
                  >
                    Contact Us{" "}
                  </Link>
                </li>
              </ul>
              <button
                type="button"
                onClick={() => {
                  Navigate("/ride-notifications");
                }}
                className="hidden gap-[2px] md:inline-flex items-center px-5 py-2.5 text-sm font-medium text-center rounded-lg focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <FaBell />
                <span className="inline-flex items-center justify-center w-4 h-4 ms-1 -translate-y-2 -translate-x-3 text-xs font-semibold text-blue-800 bg-blue-200 rounded-full">
                  {NotificationCount}
                </span>
              </button>
              <div>
                <span className="mx-4 hidden md:flex items-center gap-[2px]">
                  {UserData && UserData[0] && UserData[0].UserName}
                </span>
              </div>

              <div className="group cursor-pointer ">
                <span className="hidden md:flex items-center gap-[2px]">
                  {UserData && UserData[0] && (
                    <img
                      src={UserData[0].ProfileImage}
                      className="w-10 h-10 rounded-full"
                    ></img>
                  )}

                  <span>
                    <FaCaretRight className="group-hover:rotate-90 transition-all ease-in-out duration-300" />
                  </span>
                </span>
                <div className="hidden md:flex lg:flex">
                  <div className="md:absolute opacity-0 group-hover:opacity-100 transition-all ease-in-out duration-1000 z-50">
                    <ul className="w-28 text-[14px] space-y-1 bg-primary -translate-x-10 p-2 shadow-md text-black rounded-md group-hover:-translate-y-2 mt-3 translate-y-3 duration-700  transition-all ease-in-out">
                      <Link to={"/manage-profile"}>
                        {" "}
                        <li className="p-2 hover:bg-white rounded-lg duration-700 ease-in-out transition-all">
                          {" "}
                          Profile
                        </li>
                      </Link>
                      <Link to={"/user-rides"}>
                        {" "}
                        <li className="p-2 hover:bg-white rounded-lg duration-700 ease-in-out transition-all">
                          {" "}
                          Your Rides
                        </li>
                      </Link>
                      <li
                        className="p-2 hover:bg-white rounded-lg duration-700 ease-in-out transition-all"
                        onClick={handleLogout}
                      >
                        {" "}
                        Log-Out
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Menu */}
            <div className="md:hidden">
              {MobileShowMenu ? (
                <HiMenuAlt1
                  onClick={ToggleMenu}
                  className="cursor-pointer transition-all duration-1000 ease-in-out"
                  size={30}
                />
              ) : (
                <HiMenuAlt3
                  onClick={ToggleMenu}
                  className="cursor-pointer transition-all duration-1000 ease-in-out"
                  size={30}
                />
              )}
            </div>
          </div>
        </div>
      </motion.nav>
      {/* mobile menu components */}
      <ResponsiveMenu showMenu={MobileShowMenu} />
      {/* <SignUp
        isOpen={SignUpModalShow}
        onHide={() => setSignUpModalShow(false)}
      /> */}
    </>
  );
}

export default Navbar;
