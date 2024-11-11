import React, { useEffect, useState } from "react";
// Hero Images
import HeroImage from "../../../assets/images/hero-image1.jpg";
import { CiCirclePlus } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
//components
import SearchRide from "../Ride/SearchRide";
import axios from "axios";
import { motion } from "framer-motion";
import { useUserAuth } from "../../../Context/UserAuthContext";
import WhyCarPool from "../Content/WhyCarPool";
import HowItWorks from "../Content/HowItWorks";
function HeroSection() {
  const PositionLeftXOpacity = {
    hidden: { opacity: 0, x: -50 },
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

  //declarations
  const HeroBgStyle = {
    backgroundImage: `url(${HeroImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    width: "98%",
    position: "relative",
  };

  const Navigate = useNavigate();
  const [RideDetails, setRideDetails] = useState([]);
  const [UserData, setUserData] = useState();
  const { user } = useUserAuth();
  //fetch logged in user detials
  useEffect(() => {
    const fetchUserData = async () => {
      // const user = auth.currentUser;
     // console.log(user);
      if (user) {
        // Fetch user details from  User API
        const response = await axios.get(`http://localhost:8000/Users`);
        setUserData(response.data.filter((e) => e.UID == user.uid));
        
      }
    };

    fetchUserData();
  }, [UserData]);
  const IsUserDriver = () => {
    if (UserData[0].IsDriver == true) {
      Navigate("/create-ride");
    } else {
      Navigate("/create-driver-account");
    }
  };
  //fetch ride details
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

  const [filteredRides, setFilteredRides] = useState(RideDetails);
  const handleSearch = (fromloaction, tolocation, date, Seats) => {
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

      return matchesOrigin && matchesDestination && matchesDate && matchesSeats;
    });

    setFilteredRides(results);
  };

  return (
    <>
      <motion.div
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={PositionDownUpYOpacity}
        transition={{ duration: 0.5 }}
        style={HeroBgStyle}
        className="md:mt-5 mt-2 md:w-[80%]  mx-auto rounded-2xl"
      >
        <div className="min-h-[600px] md:min-h-[200px] rounded-2xl pb-10 md:pt-10 bg-gradient-to-tl from-black/100 via-black-500/50 to-primary/50">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 items-center md:gap-48  gap-5 text-white">
              {/* Hero Left Side */}
              <motion.div
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={PositionLeftXOpacity}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center mt-5 text-center md:gap-5 gap-5 px-3 lg:items-start lg:text-left lg:max-w-[450px]"
              >
                <h1 className="text-5xl lg:text-7xl font-bold">
                  Join us, As a Driver.
                </h1>
                <p className="hidden md:block">
                Simplify your commute, save money, and help the planet with our easy-to-use carpool platform. Connect with others heading your way, share the ride, and reduce your carbon footprint—all while enjoying a more efficient and affordable travel experience. Join our community today and make every journey smarter, greener, and more fun!
                </p>
                <button
                  className="btn-primary text-xl flex gap-2"
                  onClick={IsUserDriver}
                >
                  <span>
                    <CiCirclePlus size={26} />
                  </span>
                  Publish A Ride
                </button>
              </motion.div>
              {/* Hero Passenger Ride */}
              <motion.div
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={PositionRightXOpacity}
                transition={{ duration: 0.5 }}
              >
                <SearchRide onSearch={handleSearch}></SearchRide>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    
    </>
  );
}

export default HeroSection;
