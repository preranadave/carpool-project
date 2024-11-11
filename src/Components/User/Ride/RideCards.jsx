import React from "react";

//iocns
import { FaLocationDot } from "react-icons/fa6";
import { FaRupeeSign } from "react-icons/fa";
import { FaCalendarDays } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa";
import { GrStatusInfo } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
function RideCards(props) {
  const PositionYOpacity = {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0 },
  };

  const Navigate = useNavigate();
  return (
    <>
      <motion.div
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={PositionYOpacity}
        transition={{ duration: 0.5 }}
        className="text-sm leading-6  my-3"
      >
        <figure className="flex flex-col-reverse bg-white hover:bg-blue-100 rounded-xl shadow-xl my-2 mx-2 p-6 max-w-[98%]  w-[98%] lg:max-w-[98%]  dark:bg-slate-800 dark:highlight-white/5">
          <div className="mt-2 text-slate-700 dark:text-slate-300  ">
            <div className="text-gray-700 text-base flex ">
              <FaLocationDot size={20} />
              <span className="font-bold">From:</span>
              <span>{props.from}</span>
            </div>
            <div className="text-gray-700 text-base my-2 flex">
              <FaLocationDot size={20} />
              <span className="font-bold">To:</span>
              <span>{props.to}</span>
            </div>
            <div className="text-gray-700 text-base my-2 flex items-center">
              <FaCalendarDays />
              <span className="mx-1">
                {props.ridedate},{props.ridetime}
              </span>
            </div>
            <div className="text-gray-700 text-base my-2 flex items-center">
              <FaUsers />
              <span className="mx-1">{props.availableseats}</span>
            </div>
            <div className="text-gray-700 text-base my-2 flex items-center">
              <GrStatusInfo />
              <span className="mx-1 font-bold">{props.status}</span>
            </div>

            <button
              onClick={() => Navigate(`/book-ride/${props.id}`)}
              className="btn-primary w-[95%] text-sm mx-auto"
            >
              Book
            </button>
          </div>
          <figcaption className="flex items-center space-x-4">
            <img
              src={props.driverprofile}
              alt=""
              className="flex-none w-14 h-14 rounded-full object-cover"
              loading="lazy"
              decoding="async"
            />
            <div className="flex-auto justify-between items-center">
              <div className="text-base text-slate-900 font-semibold dark:text-slate-200">
                {props.drivername}
              </div>
              {/* <div className="mt-0.5 dark:text-slate-300">
                Web Developer
            </div> */}
            </div>
            <div className="text-gray-700 text-base flex ">
              <FaRupeeSign size={25} />
              <span className="text-xl"> {props.price}</span>
            </div>
          </figcaption>
        </figure>
      </motion.div>
    </>
  );
}

export default RideCards;
