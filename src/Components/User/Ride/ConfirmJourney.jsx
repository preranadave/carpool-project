import axios from "axios";
import React, { useEffect, useState } from "react";

import Navbar from "../Navbar/Navbar";
import { FaLocationDot } from "react-icons/fa6";
import { FaRupeeSign } from "react-icons/fa";
import { FaCalendarDays } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa";
import { GrStatusInfo } from "react-icons/gr";
import { useNavigate, useParams } from "react-router-dom";

function ConfirmJourney() {
  const { id } = useParams();
  const [RideData, SetRideData] = useState();
  const Navigate=useNavigate();
  useEffect(() => {
    axios.get(`http://localhost:8000/Rides/${id}`).then((response) => {
      SetRideData(response.data);

      //console.log(RideData)
    });
  }, [RideData]);
  const AcceptJourney = () => {};
  return (
    <>
      <Navbar></Navbar>

      <div className="grid md:grid-cols-1 sm:grid-cols-1 w-[97%]  md:max-w-[40%] lg:max-w-[40%] mx-auto">
        <div className="text-sm my-5">
          <figure className="relative flex flex-reverse justify-between  bg-white rounded-lg p-4 dark:bg-slate-800 dark:highlight-white/5">
            <div className=" text-slate-700 dark:text-slate-300">
              <div className="text-gray-700 text-base flex ">
                <FaLocationDot size={20} />
                <span className="font-bold">From:</span>
                <span>{RideData && RideData.Origin}</span>
              </div>
              <div className="text-gray-700 text-base my-2 flex">
                <FaLocationDot size={20} />
                <span className="font-bold">To:</span>
                <span>{RideData && RideData.Destination}</span>
              </div>
              <div className="text-gray-700 text-base my-2 flex items-center">
                <FaCalendarDays />
                <span className="mx-1">
                  {RideData && RideData.RideDate},
                  {RideData && RideData.RideTime}
                </span>
              </div>
              <div className="text-gray-700 text-base my-2 flex items-center">
                <FaUsers />
                <span className="mx-1">
                  {RideData && RideData.AvailableSeats}
                </span>
              </div>
              <div className="text-gray-700 text-base my-2 flex items-center">
                <GrStatusInfo />
                <span className="mx-1 font-bold">
                  {RideData && RideData.Status}
                </span>
              </div>

              <div className="text-gray-700 text-base mt-2 flex items-center">
                <FaRupeeSign size={25} />
                <span className="text-xl"> {RideData && RideData.Price}</span>
              </div>
            </div>

            <div>
              {/* <button className="a-btn-primary   text-sm" onClick={AcceptJourney}>
                  Accept 
                </button>
                
              <button className="a-btn-primary  text-sm ms-2">
                Decline
              </button> */}
            </div>
          </figure>
        </div>
      </div>
      <div className="w-[50%] md:w-[40%] mx-auto lg:w-[20%]">
        <button onClick={()=>{Navigate("/ride-notifications")}}
          className="btn-primary w-full text-sm mx-auto mt-5"
        >
          Go Back
        </button>
      </div>
    </>
  );
}

export default ConfirmJourney;
