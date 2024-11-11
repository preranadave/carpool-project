//library import
import React from "react";
import { Link, useNavigate } from "react-router-dom";

//icon imports
import { FaCarOn } from "react-icons/fa6";
import { FaCarTunnel } from "react-icons/fa6";
import { GiSteeringWheel } from "react-icons/gi";
import { FaUsers } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { IoLocation } from "react-icons/io5";
import { BiSolidContact } from "react-icons/bi";
import { useUserAuth } from "../../../Context/UserAuthContext";
function AdminSideBar() {
  const { logOut, user } = useUserAuth();
  const Navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      Navigate("/admin-login");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      <div>
        <div className="">
          <div className="hidden md:block  w-[full] h-screen bg-adminprimary text-white px-10 py-5">
            {/* Heading */}
            <h1 className="text-3xl font-bold">Admin Panel</h1>
            {/* Side Navigation Menu */}
            <div>
              <ul className="list-none flex-col gap-10 mt-12 text-md ">
                <Link to="/admin/dashboard">
                  <li className="rounded-md p-2 my-5 transition-all duration-300 ease-in-out hover:bg-white/45 flex gap-5 items-center">
                    <span>
                      <FaHome size={25} />
                    </span>
                    Home
                  </li>
                </Link>
                <Link to={"/admin/dashboard/manage-users"}>
                  <li className="rounded-md p-2 my-5 transition-all duration-300 ease-in-out hover:bg-white/45 flex gap-5  items-center">
                    <span>
                      <FaUsers size={25} />
                    </span>
                    Users
                  </li>
                </Link>
                <Link to="/admin/dashboard/manage-drivers">
                  {" "}
                  <li className="rounded-md p-2 my-5 transition-all duration-300 ease-in-out hover:bg-white/45 flex gap-5  items-center">
                    <span>
                      <GiSteeringWheel size={25} />
                    </span>
                    Drivers
                  </li>
                </Link>
                <Link to={"/admin/dashboard/manage-rides"}>
                  {" "}
                  <li className="rounded-md p-2 my-5 transition-all duration-300 ease-in-out hover:bg-white/45 flex gap-5  items-center">
                    <span>
                      <FaCarTunnel size={25} />
                    </span>
                    Rides
                  </li>
                </Link>
                <Link to={"/admin/dashboard/manage-locations"}>
                  {" "}
                  <li className="rounded-md p-2 my-5 transition-all duration-300 ease-in-out hover:bg-white/45 flex gap-5  items-center">
                    <span>
                      <IoLocation size={25} />
                    </span>
                    Locations
                  </li>
                </Link>
                <Link to={"/admin/dashboard/manage-contacts"}>
                  {" "}
                  <li className="rounded-md p-2 my-5 transition-all duration-300 ease-in-out hover:bg-white/45 flex gap-5  items-center">
                    <span>
                      <BiSolidContact size={25} />
                    </span>
                    Contacts
                  </li>
                </Link>

                <Link>
                  {" "}
                  <li className="rounded-md p-2 transition-all duration-300 ease-in-out hover:bg-red-400/45 absolute bottom-11 text-xl font-bold flex gap-2 items-center"  onClick={handleLogout}>
                    <span>
                      <CiLogout size={30} />
                    </span>
                    Log-Out
                  </li>
                </Link>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminSideBar;
