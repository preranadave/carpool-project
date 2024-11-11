import React, { useEffect, useRef, useState } from "react";
import { useUserAuth } from "../../Context/UserAuthContext";
import { Link, useNavigate, NavLink } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import { motion } from "framer-motion";
import { FaUser } from "react-icons/fa6";
import { MdOutlineSecurity } from "react-icons/md";
import UpdatePersonalInfo from "./UpdatePersonalInfo";
import UpdateEmailPass from "./UpdateEmailPass";
import axios from "axios";
import FetchUserData from "./Data/FetchUserData";
function ManageUserProfile() {
  const PositionLeftXOpacity = {
    hidden: { opacity: 0, x: -150 },
    visible: { opacity: 1, x: 0 },
  };
  const PositionRightXOpacity = {
    hidden: { opacity: 0, x: 150 },
    visible: { opacity: 1, x: 0 },
  };
  const PositionDownUpYOpacity = {
    hidden: { opacity: 0, y: 150 },
    visible: { opacity: 1, y: 0 },
  };
  const [selectedItem, setSelectedItem] = useState("Personal");
  // const [UserData, setUserData] = useState();
  const [UserInfo, SetUserInfo] = useState();
  const { user } = useUserAuth();
  const { data } = FetchUserData();
  //  useEffect(()=>{  console.log("a"UserData)},[UserData])

  const handleMenuClick = (item) => {
    setSelectedItem(item);
  };

  const renderComponent = () => {
    switch (selectedItem) {
      case "Personal":
        return <UpdatePersonalInfo />;
      case "EmailPass":
        return <UpdateEmailPass userdata={data[0]} />;
      default:
        return <UpdatePersonalInfo />;
    }
  };

  return (
    <>
      <Navbar></Navbar>
      
        <div>
          <div className=" md:mt-12 mt-5 md:w-[90%] w-[95%] flex items-center  bg-white  mx-auto rounded-2xl ">
            <div className="min-h-[600px] md:min-h-[200px] rounded">
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 items-center gap-5">
                  {/* Left Side */}
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={PositionLeftXOpacity}
                    transition={{ duration: 0.5 }}
                    className="md:block md:w-72 h-full p-20 rounded-tl-[16px] rounded-tr-[16px]  md:rounded-tr-[0px] md:rounded-tl-[16px] md:rounded-bl-[16px]"
                  >
                    <ul className="space-y-5 text-md w-52">
                      <li
                        className={`flex space-x-2 items-center justify-start p-2 rounded font-bold ${
                          selectedItem == "Personal" && "bg-slate-200"
                        }`}
                        onClick={() => handleMenuClick("Personal")}
                      >
                        <FaUser size={20} />
                        <NavLink>Personal Info</NavLink>
                      </li>
                      <li
                        className={`flex space-x-2 items-center justify-start p-2 rounded  font-bold ${
                          selectedItem == "EmailPass" && "bg-slate-200"
                        }`}
                        onClick={() => handleMenuClick("EmailPass")}
                      >
                        <MdOutlineSecurity size={20} />
                        <NavLink>Email & Password</NavLink>
                      </li>
                    </ul>
                  </motion.div>
                  {/*Update Up Form componets*/}
                  <div style={{ flex: 1 }}>{renderComponent()}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      
    </>
  );
}

export default ManageUserProfile;
