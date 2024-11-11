import React, { useRef, useState } from "react";
import { Modal } from "react-modal";
//import navbar
import Navbar from "./Navbar/Navbar";

import { Link, useNavigate } from "react-router-dom";
import SignUpImage from "../../assets/images/sign-up.jpg";
import Image from "../../assets/images/user.png";
import axios from "axios";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useUserAuth } from "../../Context/UserAuthContext";
import { motion } from "framer-motion";
function LogIn() {
  const [Message, SetMessage] = useState(false);

  const Email = useRef("");
  const Password = useRef("");

  const Navigate = useNavigate();
  const { logIn } = useUserAuth();
  const [error, setError] = useState("");
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

  const LoginUser = async (event) => {
    event.preventDefault();
    setError("");
    SetMessage(true);
    setError("");
    try {
      await logIn(Email.current.value, Password.current.value);
      Navigate("/home");
      // if (Message == false) {
      //   setTimeout(() => {
      //     SetMessage(false);

      //     Navigate("/home");

      //     //props.onHide();
      //   }, 1000);
      // }
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <>
      <div>
        {/* <div
        {...props}
        className={`absolute backdrop-blur-lg pt-24${
          props.isOpen
            ? "top-0 opacity-100 z-[1030] duration-700"
            : "-top-[100%] opacity-0 -z-[1030] duration-700"
        } transition-all duration-700`}
      > */}
        <div className=" mt-12   md:w-[70%] w-[95%] flex items-center  bg-white md:mx-56 mx-auto rounded-2xl ">
          <div className="min-h-[600px] md:min-h-[200px] rounded">
            <div className="w-full">
              <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-5">
                {/* Left Side */}
                <motion.div
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={PositionLeftXOpacity}
                  transition={{ duration: 0.5 }}
                  className="bg-primary h-full p-20 rounded-tl-[16px] rounded-tr-[16px] md:rounded-tr-[0px] md:rounded-tl-[16px] md:rounded-bl-[16px]"
                >
                  <div className=" px-3 lg:items-start lg:text-left lg:max-w-[450px] ">
                    <h1 className="text-5xl lg:text-7xl font-bold text-adminprimary">
                    Drive Smarter, Share the Ride.
                    </h1>
                    <p className="hidden md:block">
                    Welcome back! Log in to continue your journey towards smarter, more sustainable commuting. By carpooling with others, you're not just saving money—you're also helping reduce traffic and your environmental impact. Whether you're commuting to work, heading to an event, or just need a ride, our platform makes it easy to connect with fellow travelers. Ready to hit the road again? Log in and start carpooling today!
                    </p>
                  </div>
                </motion.div>
                {/*Sign Up Form */}
                <motion.div
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={PositionRightXOpacity}
                  transition={{ duration: 0.5 }}
                >
                  {/* absolute -translate-y-6 w-[30%] mx-5 */}

                  {/* <div
                    className={`px-5 w-[80%] mx-auto text-center bg-yellow-100 border border-primary text-adminprimary rounded-md p-2 my-2 ${
                      Message ? "opacity-100" : "opacity-0"
                    } duration-700 transition-all`}
                  >
                    <div className="">You Are Logged In Successfully!</div>
                  </div> */}
                  {error && (

                      <div className="">{error}</div>
                    
                  )}
                  {/* <IoIosCloseCircleOutline
                    size={30}
                    className="cursor-pointer md:-translate-y-[30px] -translate-y-[300px] translate-x-[630px] md:translate-x-[490px] "
                    onClick={props.onHide}
                  /> */}
                  <div className="w-[90%] md:w-[full] md:mx-4 mx-auto p-4 bg-white/60 mb-10 md:mt-5  text-black rounded-2xl shadow-2xl">
                    <div>
                      <h1 className="text-4xl text-center font-semibold mb-5 text-adminprimary">
                        Log-In
                      </h1>
                      <form action="" onSubmit={LoginUser}>
                        <div className="space-y-6 flex-col justify-center items-center">
                          <input
                            type="email"
                            name="email"
                            id="email"
                            className="py-2 px-4 rounded-lg w-full bg-gray-400/30 placeholder-black outline-none border-none"
                            placeholder="Email"
                            ref={Email}
                          />
                          <input
                            type="password"
                            name="password"
                            id="password"
                            className="py-2 px-4 rounded-lg w-full bg-gray-400/30 placeholder-black outline-none"
                            placeholder="Password"
                            ref={Password}
                          />
                          <div className="flex justify-center">
                            <button
                              type="submit"
                              className="btn-primary w-[50%]"
                            >
                              Log-In
                            </button>
                          </div>
                          <div className="text-center">
                            <span className="">
                              Don't Have Account?
                              <span
                                className="text-xl ms-2 text-primary cursor-pointer"
                                onClick={() => Navigate("/signup")}
                              >
                                Sign-Up
                              </span>
                            </span>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LogIn;
