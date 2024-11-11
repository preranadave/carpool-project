import { easeInOut, motion } from "framer-motion";
import React from "react";
import howitwork1 from "../../../assets/images/howitwork1.webp";

import howitwork2 from "../../../assets/images/howitwork2.webp";

import howitwork3 from "../../../assets/images/howitwork3.webp";
function HowItWorks() {
  const SlideLeft = (delay) => {
    return {
      hidden: { opacity: 0, x: 80 },
      visible: { opacity: 1, x: 0, transition: { duration: 1, delay: delay } },
    };
  };
  const SlideYUp = (delay) => {
    return {
      hidden: { opacity: 0, y: 100 },
      visible: { opacity: 1, y: 0, transition: { duration: 1, delay: delay } },
    };
  };
  const SlideRight = (delay) => {
    return {
      hidden: { opacity: 0, x: 100 },
      visible: { opacity: 1, x: 0, transition: { duration: 1, delay: delay } },
    };
  };
  const HowItWorksCard = [
    {
      id: 1,
      title: "Search and Create Your Journey",
      description:
        "Search your using form at the top of this page or join us as driver and start journey with people on same route. ",
      image: howitwork1,
      reverse: false,
      delay: 0.3,
    },
    {
      id: 2,
      title: "Book Your Ride",
      description:
        "Reserve your ride using by confirming detials. Your Driver will be notified and ride will be booked.",
      image: howitwork2,
      reverse: true,
      delay: 0.3,
    },
    {
      id: 3,
      title: "Enjoy Your Ride",
      description:
        "The driver will escort you to the car, help you with luggage and offer tips about your stay. You can relax and enjoy the ride",
      image: howitwork3,
      reverse: false,
      delay: 0.3,
    },
  ];
  return (
    <motion.div
      variants={SlideYUp(0.1)}
      initial="hidden"
      whileInView="visible"
      className="container overflow-hidden py-10 bg-white shadow-[0_0_22px_rgba(0,0,0,0.15)] md:w-[98%] w-[96%] my-10  mx-auto rounded-2xl"
    >
      <div className="space-y-2 p-2 text-center max-w-[890px] mx-auto ">
        <h1 className="uppercase font-semibold text-adminprimary text-lg">
          How it works?
        </h1>
      </div>
      {/* Cards */}
      <div className="grid grid-cols-1 gap-2">
        {HowItWorksCard.map((item, index) => {
          return (
            <div className="grid grid-cols-1 md:grid-cols-2 space-y-6 md:space-y-0">
              {/* how it work images */}
              <div className={`flex justify-start items-center`}>
                <motion.img
                  variants={SlideLeft(0.4)}
                  initial="hidden"
                  whileInView="visible"
                  src={item.image}
                  className="w-[350px] h-full object-cover rounded-2xl"
                ></motion.img>
              </div>
              {/* description */}
              <div className="flex flex-col justify-center text-center md:text-left space-y-4 lg:max-w-[full]">
                <motion.p
                  variants={SlideYUp(0.4)}
                  initial="hidden"
                  whileInView="visible"
                  className="font-semibold text-xl lg:text-2xl text-adminprimary capitalize"
                >
                  {item.title}
                </motion.p>
                <motion.p
                  variants={SlideYUp(0.5)}
                  initial="hidden"
                  whileInView="visible"
                >
                  {item.description}
                </motion.p>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

export default HowItWorks;
