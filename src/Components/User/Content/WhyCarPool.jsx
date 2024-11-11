import { delay, motion } from "framer-motion";
import React from "react";
import { TbTrees } from "react-icons/tb";
import { FaCarOn } from "react-icons/fa6";
import { GiThreeFriends } from "react-icons/gi";
function WhyCarPool() {
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
  const WhyCarpoolCard = [
    {
      id: 1,
      title: "Save Enviroment",
      icon: <TbTrees />,
      bgColor: "ffee6f",
      delay: 0.3,
    },
    {
      id: 2,
      title: "Reduce Traffic",
      icon: <FaCarOn />,
      bgColor: "ffee6f",
      delay: 0.6,
    },
    {
      id: 3,
      title: "Make Friends",
      icon: <GiThreeFriends />,
      bgColor: "ffee6f",
      delay: 0.9,
    },
  ];
  return (
    <>
      <motion.div
        variants={SlideYUp(0.1)}
        initial="hidden"
        whileInView="visible"
        className="container py-10 overflow-hidden bg-white shadow-[0_0_22px_rgba(0,0,0,0.15)] md:w-[98%] w-[96%] my-10  mx-auto rounded-2xl"
      >
        {/* Header */}
        <motion.div
         
          className="space-y-4 p-6 text-center max-w-[890px] mx-auto mb-5 "
        >
          <h1 className="uppercase font-semibold text-adminprimary text-lg">
            Why Should We Carpool?
          </h1>
          <p className="text-xl">
          Carpooling isn’t just about sharing a ride—it’s about making a positive impact on your wallet, your time, and the environment. By carpooling, you reduce your travel costs, cut down on traffic congestion, and lower your carbon footprint. It’s a simple, effective way to contribute to a cleaner planet while enjoying a more efficient commute. Plus, with fewer cars on the road, everyone benefits from quicker, stress-free travel. Start carpooling today and make a difference!
          </p>
        </motion.div>
        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-10 ">
          {WhyCarpoolCard.map((item, index) => {
            return (
              <motion.div
                variants={SlideLeft(item.delay)}
                initial="hidden"
                whileInView="visible"
                className="flex items-center text-3xl space-x-8 rounded-xl  p-4"
              >
                {/* icon */}
                <div className="bg-adminprimary rounded-full p-6 text-primary text-5xl">
                  {item.icon}
                </div>

                <div>{item.title}</div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </>
  );
}

export default WhyCarPool;
