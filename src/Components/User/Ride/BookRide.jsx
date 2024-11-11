import axios from "axios";
import React, { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
//icons import

import { FaLocationDot } from "react-icons/fa6";
import { FaRupeeSign } from "react-icons/fa";
import { FaCalendarDays } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa";
import { GrStatusInfo } from "react-icons/gr";
import { FaArrowRight } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaPencilAlt } from "react-icons/fa";
import { RxDividerVertical } from "react-icons/rx";
import { FaChevronDown } from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa";
import { FaArrowsAltV } from "react-icons/fa";
//import Components
import Navbar from "../Navbar/Navbar";
import { useUserAuth } from "../../../Context/UserAuthContext";
function BookRide() {
  const { id } = useParams();
  const [RideData, SetRideData] = useState();
  const Navigate = useNavigate();
  const { user } = useUserAuth();
  //destructuring User Object
  const [UserData, setUserData] = useState();
  const [isExpanded, setExpanded] = useState(true);
  const [Message, SetMessage] = useState(false);
  const PositionYOpacity = {
    hidden: { opacity: 0, y: 300 },
    visible: { opacity: 1, y: 130 },
  };
  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        // Fetch user details from  User API
        const response = await axios.get(`http://localhost:8000/Users`);
        setUserData(response.data.filter((e) => e.UID == user.uid));
        // console.log(UserData);
      }
    };

    fetchUserData();
  }, [UserData]);

  useEffect(() => {
    axios.get(`http://localhost:8000/Rides/${id}`).then((response) => {
      SetRideData(response.data);
      //console.log(RideData)
    });
  }, []);

  const UpdateRideStatus = () => {
    RideData.BookedByUID = UserData[0].UID;
    RideData.PassengernName = UserData[0].UserName;
    RideData.Status = "Booked";
    axios.put(`http://localhost:8000/Rides/${id}`, RideData).then(() => {
      SendRideNotification();
    });
  };
  const SendRideNotification = () => {
    var Notification = {
      UserName: UserData[0].UserName,
      timestamp: new Date().toLocaleString(),
      RideID: RideData.id,
      UserUID: RideData.CreatedByUID,
      Status: "Unread",
      RideStatus: "Booked",
    };
    axios
      .post(`http://localhost:8000/RideNotification`, Notification)
      .then(() => {
        SetMessage(true);
        if (Message == false) {
          setTimeout(() => {
            SetMessage(false);
            Navigate("/user-rides")
          }, 3000);
        }
      });
  };
  const toggleExpand = () => {
    isExpanded ? setExpanded(false) : setExpanded(true);
  };

  return (
    <>
      <Navbar></Navbar>
      {RideData && (
        <div className="scroll-smooth mt-5 md:max-w-[98%] lg:max-w-[50%]  mx-auto overflow-hidden">
          <div className="grid md:grid-cols-1 sm:grid-cols-1 p-2  ">
            <div
              className={`bg-adminprimary w-[97%] hidden md:flex items-center justify-between  p-2  text-sm cursor-pointer mx-auto rounded-md text-white px-5 overflow-hidden transition-all duration-500`}
              onClick={toggleExpand}
            >
              <div className="mx-1 basis-1/4">
                {RideData.RideDate},{RideData.RideTime}
              </div>

              <div className="ms-5 basis-1/2">
                <div className="flex items-center w-[450px] mx-auto">
                  {RideData.Origin}
                  <FaArrowRight className="mx-2" />
                  {RideData.Destination}
                </div>
              </div>
              <div>
                <FaChevronDown
                  className={`transition-all duration-500 w-full basis-1/12${
                    isExpanded ? "rotate-180" : ""
                  }`}
                />
              </div>
            </div>
            <div
              className={`text-sm leading-6 mx-3 my-3 transition-all duration-500 ${
                isExpanded
                  ? "opacity-100 max-h-[280px]"
                  : "opacity-0 max-h-[0px]"
              }`}
            >
              <figure className="relative flex flex-col-reverse bg-slate-100 rounded-lg p-6 dark:bg-slate-800 dark:highlight-white/5">
                <div className="mt-2 text-slate-700 dark:text-slate-300  ">
                  <div className="text-gray-700 text-base flex ">
                    <FaLocationDot size={20} />
                    <span className="font-bold">From:</span>
                    <span>{RideData.Origin}</span>
                  </div>
                  <div className="text-gray-700 text-base my-2 flex">
                    <FaLocationDot size={20} />
                    <span className="font-bold">To:</span>
                    <span>{RideData.Destination}</span>
                  </div>
                  <div className="text-gray-700 text-base my-2 flex items-center">
                    <FaCalendarDays />
                    <span className="mx-1">
                      {RideData.RideDate},{RideData.RideTime}
                    </span>
                  </div>
                  <div className="text-gray-700 text-base my-2 flex items-center">
                    <FaUsers />
                    <span className="mx-1">{RideData.AvailableSeats}</span>
                  </div>
                  <div className="text-gray-700 text-base my-2 flex items-center">
                    <GrStatusInfo />
                    <span className="mx-1 font-bold">{RideData.Status}</span>
                  </div>

                  <div className="text-gray-700 text-base my-2 flex items-center">
                    <FaRupeeSign size={25} />
                    <span className="text-xl"> {RideData.Price}</span>
                  </div>
                </div>
                <figcaption className="flex items-center space-x-4">
                  <img
                    src={RideData.DriverProfile}
                    alt=""
                    className="flex-none w-14 h-14 rounded-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="flex-auto justify-between items-center">
                    <div className="text-base text-slate-900 font-semibold dark:text-slate-200">
                      {RideData.DriverName}
                    </div>
                  </div>
                </figcaption>
              </figure>
            </div>
          </div>
          <div className="w-[50%] md:w-[90%] mx-auto lg:w-[50%]">
            <button
              onClick={UpdateRideStatus}
              className="btn-primary w-full text-sm mx-auto mt-5"
            >
              Confirm
            </button>
          </div>
        </div>
      )}

      {Message && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={PositionYOpacity}
          transition={{ duration: 0.3 }}
          className={`px-5 w-[80%] mx-auto py-2 my-2 mt-50 text-center bg-yellow-100 border border-primary text-adminprimary rounded-md `}
        >
          <div className="">
            Your Ride Has Been Booked. Your Journey will start soon!
          </div>
        </motion.div>
      )}
    </>
  );
}

export default BookRide;
