import React, { useEffect, useRef, useState } from "react";

import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

//import Components
import Navbar from "../Navbar/Navbar";
import SearchRide from "./SearchRide";
import RideCards from "./RideCards";
import SearchedRideList from "./SearchedRideList";
import { motion } from "framer-motion";
import PushNotification from "./PushNotification";
import Footer from "../Footer/Footer";

//images

function ViewRides() {
  const PositionLeftXOpacity = {
    hidden: { opacity: 0, x: -150 },
    visible: { opacity: 1, x: 0 },
  };
  const PositionRightXOpacity = {
    hidden: { opacity: 0, x: 150 },
    visible: { opacity: 1, x: 0 },
  };
  const PositionYOpacity = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 },
  };

  const today = new Date().toISOString().split("T")[0];

  const [RideDetails, setRideDetails] = useState([]);

  const [filteredRides, setFilteredRides] = useState(RideDetails);
  const location = useLocation();
  const { fromloaction, tolocation, date, Seats } = location.state || {
    fromloaction: "",
    tolocation: "",
    date: new Date(),
    Seats: "",
  };
  const GetRides = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/Rides`);
      setRideDetails(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    GetRides();
  }, [RideDetails]);
  // useEffect(() => {
  //   handleSearch(fromloaction, tolocation, date, Seats);
  // },[location.state]);
  const handleSearch = (fromloaction, tolocation, date, Seats) => {
    //alert(date.toLocaleDateString())
    const results = RideDetails.filter((ride) => {
      const matchesOrigin = ride.Origin.toLowerCase().includes(
        fromloaction.toLowerCase()
      );

      const matchesDestination = ride.Destination.toLowerCase().includes(
        tolocation.toLowerCase()
      );

      const matchesDate = date && ride.RideDate === date.toLocaleDateString(); // If no date is provided, match all

      // const matchesTIme = time ? ride.RideTime == time : true; // If no date is provided, match all
      const matchesSeats = ride.AvailableSeats == Seats; // If no date is provided, match all
      const matchStatus=ride.Status=="Available";
      return matchesOrigin && matchesDestination && matchesDate && matchesSeats && matchStatus;
    });

    setFilteredRides(results);
  };

  return (
    <>
      <Navbar></Navbar>
      <div className="md:mt-5 mt-2 md:max-w-[95%] w-[95%] mx-auto rounded-2xl">
        <div className="min-h-[600px] md:min-h-[200px] rounded-2xl ">
          <div className="grid grid-cols-1 lg:grid-cols-2  text-white">
            {/* Search Ride form */}
            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={PositionLeftXOpacity}
              transition={{ duration: 0.5 }}
              className="h-[400px] md:h-full rounded-tl-[16px] rounded-tr-[16px] md:rounded-tr-[0px] md:rounded-tl-[16px] md:rounded-bl-[16px] text-center  lg:text-left lg:max-w-[66%]"
            >
              <SearchRide
                onSearch={handleSearch}
                defaultValues={{ fromloaction, tolocation, date, Seats }}
              />
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={PositionRightXOpacity}
              transition={{ duration: 0.5 }}
              className="md:h-[660px] md:max-w-[98%] lg:w-[98%] w-[98%] overflow-y-auto scroll-smooth"
            >
              {/* {RideDetails.map((ride)=>(
                
              <div className="grid grid-cols-1 lg:grid-cols-2">

              </div>
              ))} */}
              {/* List of rides */}
              <SearchedRideList rides={filteredRides}></SearchedRideList>
            </motion.div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}

export default ViewRides;
