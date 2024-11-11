import React from "react";

//icons
import { CiSearch } from "react-icons/ci";
import { FaBell } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
//userimage
import AdminProfile from "../../../assets/images/user.png"
function Header() {
  return (
    <>
      <div>
        <div className="container bg-white w-[96%] md:w-[98%] p-3 rounded-lg m-2 flex items-center justify-between">
          {/* title */}
          <div>
            <h1 className="text-2xl  font-bold">Dashboard</h1>
          </div>
          {/* Search */}
          <div>
            {/* <div className="flex">
              <input
                type="text"
                className="rounded bg-gray-300/20  w-[27    0px] p-2 outline-none border-none placeholder:text-[14px]"
                placeholder="Search"
              ></input>
              <div
                className="rounded-tr-[5px] rounded-br-[5px] bg-adminprimary px-[14px] flex items-center
               justify-center cursor-pointer text-white"
              >
                <CiSearch color="white" />
              </div>
            </div> */}
          </div>
          {/* Notification and Profile */}
          <div className="flex items-center gap-8 ">
            <div className="flex items-center border-r-[1px] border-black pr-[25px] gap-8">
              <FaBell className="cursor-pointer" />
            </div>

            <div  className="flex items-center gap-8">
                <p>Prerna Dave</p>
                <div className="h-[50px] w-[50px] rounded-full flex items-center cursor-pointer justify-center relative">
                    <img src={AdminProfile} alt="" />
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
