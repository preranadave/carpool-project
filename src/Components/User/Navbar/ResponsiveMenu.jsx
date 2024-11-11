import React, { useState } from "react";

import { useUserAuth } from "../../../Context/UserAuthContext";
import { Link, useNavigate } from "react-router-dom";
//icons
import { FaCaretRight } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
//componets
import SignUp from "../SignUp";
const ResponsiveMenu = ({ showMenu }) => {
  const [SignUpModalShow, setSignUpModalShow] = useState(false);

  const [showSubMenu, setShowSubMenu] = useState(false);
  const Navigate = useNavigate();
  const { logOut, user } = useUserAuth();

  const toggleSubMenu = () => {
    setShowSubMenu(!showSubMenu);
  };
  const toggleSignUp = () => {
    setSignUpModalShow(true);
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
      <div
        className={`fixed top-0 -z-50
        ${showMenu ? "left-1" : "-left-[100%]"}
        h-screen w-[98%]  bg-[#ecebeb] z-50  transition-all duration-1000 pt-24 px-8 flex flex-col justify-between items-center md-hidden`}
      >
        {/* Navbar menu */}
        <div>
          <nav>
            <ul className="space-y-5 text-xl">
              <li>
                <div className="flex-col  justify-center">
                  <div className=" group cursor-pointer flex-col justify-center items-center space-x-3">
                    <img
                      src="https://img.freepik.com/free-photo/portrait-man-laughing_23-2148859448.jpg"
                      className="mx-auto w-14 h-14 rounded-full object-cover"
                    />
                    <div className="flex mt-2 items-center">
                      <div className="text-base text-slate-900 font-semibold dark:text-slate-200">
                        Prerna Dave
                      </div>
                      <FaCaretRight
                        className={`${
                          showSubMenu
                            ? "rotate-90 duration-300 ease-in-out mt-1"
                            : "-rotate-0 duration-300 ease-in-out mt-1"
                        }`}
                        onClick={toggleSubMenu}
                      />
                    </div>
                    <div>
                      {showSubMenu && (
                        <ul className="flex-col  text-lg space-y-1 p-2 text-center text-black rounded-md">
                          <li className="p-2 px-5 hover:bg-white rounded-lg duration-700 ease-in-out transition-all">
                            {" "}
                            <Link to={"/manage-profile"}>Manage Profile</Link>
                          </li>
                          <li className="p-2 px-5 hover:bg-white rounded-lg duration-700 ease-in-out transition-all">
                            {" "}
                            <Link to={"/user-rides"}>Your Rides</Link>
                          </li>

                          <li
                            className="p-2 hover:bg-white px-5 rounded-lg duration-700 ease-in-out transition-all"
                            onClick={handleLogout}
                          >
                            {" "}
                            Log-Out
                          </li>
                        </ul>
                      ) }
                    </div>
                  </div>
                </div>
              </li>
              <li className="flex justify-center hover:bg-white">
                <Link to={"/home"}>Home</Link>
              </li>
              <li className="flex justify-center hover:bg-white">
                {" "}
                <Link to="/view-rides">Search Ride</Link>
              </li>

              <li className="group relative cursor-pointer flex justify-center">
                <Link
                  to={"/contact-us"}
                  className="flex justify-center gap-[2px]"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        {/* navbar footer */}
        <div>
          <p>@2024 </p>
        </div>
      </div>
      {/* <SignUp
        isOpen={SignUpModalShow}
        onHide={() => setSignUpModalShow(false)}
      />   */}
    </>
  );
};

export default ResponsiveMenu;
