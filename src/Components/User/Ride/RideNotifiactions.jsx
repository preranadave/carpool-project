import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Navbar/Navbar";

import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
//icons import

import { FaLocationDot } from "react-icons/fa6";
import { FaRupeeSign } from "react-icons/fa";
import { FaCalendarDays } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa";
import { GrStatusInfo } from "react-icons/gr";
import { FaArrowRight } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import { useUserAuth } from "../../../Context/UserAuthContext";
function RideNotifiactions() {
  const Navigate = useNavigate();
  const [NotificationList, SetNotificationList] = useState();

  const [UpdateNotification, SetUpdateNotification] = useState();
  const [LatestNotificationIndex, SetLatestNotificationIndex] = useState();
  const { id } = useParams();
  const { user } = useUserAuth();

  useEffect(() => {
    axios.get(`http://localhost:8000/RideNotification`).then((response) => {
      SetNotificationList(response.data.filter((e) => e.UserUID == user.uid).sort((a, b) => Date.parse( new Date(b.timestamp.split("/").reverse().join("-"))) - Date.parse( new Date(a.timestamp.split("/").reverse().join("-")))));
    
    });
  }, [NotificationList]);
  const ConfirmRide = async (notification) => {
    //await axios
      // .get(`http://localhost:8000/RideNotification/${notification}`)
      // .then((response) => {
      //   SetUpdateNotification(response.data);
      notification.Status = "Read";
        axios
          .put(
            `http://localhost:8000/RideNotification/${notification.id}`,
            notification
          )
          .then((response) => {
            console.log(response.data);
            Navigate(`/confirm-journey/${notification.RideID}`);
          });
    //  });
  };

  return (
    <>
      <Navbar></Navbar>
      <div className="scroll-smooth mt-5 md:max-w-[98%] lg:max-w-[50%]  mx-auto overflow-hidden">
        <div>
          <div className="bg-primary rounded-lg w-64 py-4 mx-auto" >
            <h1 className="text-center text-bold text-2xl">
              Notifications
            </h1>
          </div>
          <ul className="mt-5">
            {NotificationList && NotificationList.length === 0 ? (
              <li className="text-center">No new notifications</li>
            ) : (
              NotificationList &&
              NotificationList.map((notification, index) => (
                <li key={index} className="my-2">
                  <div
                    className={`${
                      notification.Status == "Unread"
                        ? "bg-green-100"
                        : "bg-white"
                    } w-[97%] md:flex items-center justify-between  p-2  text-md  mx-auto rounded-md px-5 overflow-hidden transition-all duration-500`}
                    onClick={() => {
                      ConfirmRide(notification);
                    }}
                  >
                    <div className="md:mx-1">
                   {notification.RideStatus=="Booked"?<span> New journey with</span>:<span> Your journey cancelled with</span> }  
                      <span className="font-semibold ms-2">
                        {notification.UserName}
                      </span>{" "}
                      click here for
                      <span className="font-semibold border-b-2 text-adminprimary ms-1 cursor-pointer">
                        Ride Details
                      </span>
                    </div>

                    <div className="md:ms-5">
                      <div className="flex items-centermx-auto">
                        {notification.timestamp}
                      </div>
                    </div>
                    <div>
                      {/* <FaChevronDown
                        className={`transition-all duration-500 w-full basis-1/12${
                          isExpanded ? "rotate-180" : ""
                        }`}
                      /> */}
                    </div>
                  </div>
                </li>
              ))
            )}
          </ul>
          {/* {LatestNotificationIndex && (
            <div className="bg-orange-200 w-64 p-5 rounded-lg ms-2">
              {LatestNotificationIndex && LatestNotificationIndex.timestamp}
            </div>
          )} */}
        </div>
      </div>
    </>
  );
}

export default RideNotifiactions;
