import React, { useEffect, useRef, useState } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";
//import Components
import Navbar from "../Navbar/Navbar";
import SearchRide from "./SearchRide";
import RideCards from "./RideCards";
import PushNotification from "./PushNotification";
//icons import

import { FaLocationDot } from "react-icons/fa6";
import { FaRupeeSign } from "react-icons/fa";
import { FaCalendarDays } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa";
import { GrStatusInfo } from "react-icons/gr";

import { MdDelete } from "react-icons/md";
import { FaPencilAlt } from "react-icons/fa";
import { useUserAuth } from "../../../Context/UserAuthContext";
//images
function UserRides() {
  const [RideDetails, setRideDetails] = useState([]);

  const [CurrentUserID, SetCurrentUsserID] = useState();
  const { user } = useUserAuth();
  //destructuring User Object
  const [UserData, setUserData] = useState();
  //fetch current user logged in  details
  useEffect(() => {
    const fetchUserData = async () => {
      // console.log(user)
      if (user) {
        // Fetch user details from  User API
        const response = await axios.get(`http://localhost:8000/Users`);
        setUserData(response.data.filter((e) => e.UID == user.uid));
      }
    };

    fetchUserData();
  }, [UserData]);
  //fetch ride details
  // const GetRides = async () => {
  //   try {
  //     const response = await axios.get(`http://localhost:8000/Rides`);
  //     const Rides=response.data
  //     setRideDetails(Rides.filter((e) => {
  //         e.CreatedByUID == user.uid || e.BookedByUID == user.uid;
  //       })
  //     );
  //    // console.log(user.uid);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  useEffect(() => {
    axios.get("http://localhost:8000/Rides").then((response) => {
      setRideDetails(
        response.data.filter(
          (e) =>
            e.BookedByUID.toLowerCase().includes(user.uid.toLowerCase()) ||
            e.CreatedByUID.toLowerCase().includes(user.uid.toLowerCase())
        )
      );
    });
  });
  const CancelRide = (ride) => {
    ride.Status = "Cancel";
    var Notification = {
      UserName: UserData[0].UserName,
      timestamp: new Date().toLocaleString(),
      RideID: ride.id,
      UserUID:
        ride.CreatedByUID == user.uid ? ride.BookedByUID : ride.CreatedByUID,
      Status: "Unread",

      RideStatus: "Cancel",
    };
    axios.put(`http://localhost:8000/Rides/${ride.id}`, ride).then(() => {
      axios.post(`http://localhost:8000/RideNotification`, Notification);
    });
  };
  return (
    <>
      <Navbar></Navbar>

      <PushNotification></PushNotification>
      <div className="overflow-y-auto scroll-smooth">
        <div className="grid md:grid-cols-3 sm:grid-cols-1 p-2 md:max-w-[98%] lg:max-w-[98%] mx-auto">
          {RideDetails ? (
             RideDetails.map((ride) => {
              return (
                <>
                    <div className="text-sm leading-6 mx-3 my-3">
                      <figure
                        className={`relative flex flex-col-reverse ${
                          ride.Status == "Cancel"
                            ? "bg-red-500/55"
                            : "bg-slate-100"
                        }  rounded-lg p-6 dark:bg-slate-800 dark:highlight-white/5`}
                      >
                        <div className="mt-2 text-slate-700 dark:text-slate-300  ">
                          <div className="text-gray-700 text-base flex ">
                            <FaLocationDot size={20} />
                            <span className="font-bold">From:</span>
                            <span>{ride.Origin}</span>
                          </div>
                          <div className="text-gray-700 text-base my-2 flex">
                            <FaLocationDot size={20} />
                            <span className="font-bold">To:</span>
                            <span>{ride.Destination}</span>
                          </div>
                          <div className="text-gray-700 text-base my-2 flex items-center">
                            <FaCalendarDays />
                            <span className="mx-1">
                              {ride.RideDate},{ride.RideTime}
                            </span>
                          </div>
                          <div className="text-gray-700 text-base my-2 flex items-center">
                            <FaUsers />
                            <span className="mx-1">{ride.AvailableSeats}</span>
                          </div>
                          <div className="text-gray-700 text-base my-2 flex items-center">
                            <GrStatusInfo />
                            <span className="mx-1 font-bold">
                              {ride.Status}
                            </span>
                          </div>

                          <div className="text-gray-700 text-base my-2 flex items-center">
                            <FaRupeeSign size={25} />
                            <span className="text-xl"> {ride.Price}</span>
                          </div>
                        </div>
                        <figcaption className="flex items-center space-x-4">
                          <img
                            src={ride.DriverProfile}
                            alt=""
                            className="flex-none w-14 h-14 rounded-full object-cover"
                            loading="lazy"
                            decoding="async"
                          />
                          <div className="flex-auto justify-between items-center">
                            <div className="text-base text-slate-900 font-semibold dark:text-slate-200">
                              {ride.DriverName}
                            </div>
                            {/* <div className="mt-0.5 dark:text-slate-300">
                                Web Developer
                            </div> */}
                          </div>

                          {ride.Status != "Cancel" && (
                            <div className="text-gray-700 text-base flex space-x-3">
                              <button
                                className="a-btn-primary hover:bg-red-600  text-sm mx-auto"
                                onClick={() => {
                                  CancelRide(ride);
                                }}
                              >
                                Cancel
                              </button>
                            </div>
                          )}
                        </figcaption>
                      </figure>
                    </div>
                  
                </>
              );
            })
          ) : (
           
            <div className="text-center w-30 mx-auto mt-5">
              No Ride to Display
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default UserRides;
