import React, { useRef, useState } from "react";
import { useUserAuth } from "../../Context/UserAuthContext";
//import navbar
import Navbar from "./Navbar/Navbar";

import { Link, useNavigate } from "react-router-dom";
import Image from "../../assets/images/user.png";
import axios from "axios";

import { IoIosCloseCircleOutline } from "react-icons/io";
import { motion } from "framer-motion";
function SignUp(props) {
  const PositionLeftXOpacity = {
    hidden: { opacity: 0, x: -150 },
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

  const { signUp } = useUserAuth();

  const [error, setError] = useState("");

  const ProfileImage = useRef(null);
  const [UserImage, setUserImage] = useState(Image);
  const [Message, SetMessage] = useState(false);

  let Navigate = useNavigate();

  //form input object destructuring
  const UserName = useRef("");
  const Email = useRef("");
  const Password = useRef("");
  const Role = useRef("");
  const IsDriver = useRef("");
  //functions
  const ChangeProfilePic = () => {
    setUserImage(ProfileImage.current.value);
  };

  //user Registration
  const RegisterUser = async (event) => {
    event.preventDefault();
    setError("");

    try {
      //signup api data
      const { user } = await signUp(
        Email.current.value,
        Password.current.value
      );
      //storing data on firestore
      // await addDoc(collection(db, "users"), {
      //   UserName: UserName.current.value,
      //   Email: Email.current.value,
      //   Password: Password.current.value,
      //   Role: "user",
      //   IsDriver: false,
      //   ProfileImage: ProfileImage.current.value,
      //   UID: user.uid,
      // });
      //data for db.json
      var UserDetails = {
        UserName: UserName.current.value,
        Email: Email.current.value,
        Password: Password.current.value,
        Role: "user",
        IsDriver: false,
        ProfileImage: ProfileImage.current.value,
        UID: user.uid,
      };
      axios.post(`http://localhost:8000/Users`, UserDetails).then(() => {
        SetMessage(true);
        if (Message == false) {
          setTimeout(() => {
            SetMessage(false);

            Navigate("/login");
          }, 2000);
        }
        event.target.reset();
      });
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
                    <h1 className="text-5xl lg:text-6xl font-bold text-adminprimary">
                    Ride Together, Save More Fuel.
                    </h1>
                    <p className="hidden md:block">
                    Join our carpool community today and start saving time, money, and the environment! By sharing rides with others, you can reduce your commute costs, cut down on traffic, and help reduce your carbon footprint. Whether you're looking for a daily ride or a one-time trip, our platform makes it easy to connect with others going the same way. Sign up now to start carpooling smarter, safer, and more sustainably!
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

                  <div
                    className={`px-5 w-[80%] mx-auto text-center bg-yellow-100 border border-primary text-adminprimary rounded-md p-2 my-2 ${
                      Message ? "opacity-100" : "opacity-0"
                    } duration-700 transition-all`}
                  >
                    <div className="">You Are Registerd Successfully!</div>
                  </div>
                  {error && (
                    <div className="px-5 w-[80%] mx-auto text-center bg-red-300 border border-red-700 text-black rounded-md p-2 my-2">
                      {error}
                    </div>
                  )}

                  {/* {error && <div
                    className={`px-5 w-[80%] mx-auto text-center bg-red-400 border border-red-700 text-adminprimary rounded-md p-2 my-2 ${
                      Message ? "opacity-100" : "opacity-0"
                    } duration-700 transition-all`}
                  >
                    <div className="">{error}</div>
                  </div>} */}
                  {/* <IoIosCloseCircleOutline
                    size={30}
                    className="cursor-pointer md:-translate-y-[30px] -translate-y-[300px] translate-x-[630px] md:translate-x-[490px] "
                    onClick={props.onHide}
                  /> */}
                  <div className="w-[90%] md:w-[full] md:mx-4 mx-auto p-4 bg-white/60 mb-10 md:mt-5  text-black rounded-2xl shadow-2xl">
                    <div>
                      <h1 className="text-4xl text-center font-semibold mb-5 text-adminprimary">
                        Sign Up
                      </h1>
                      <form action="" onSubmit={RegisterUser}>
                        <div className="space-y-6 flex-col justify-center items-center">
                          {/* user Image Upload  */}
                          <div
                            // onClick={handleImageClick}
                            className="flex-col justify-center items-center mx-auto"
                          >
                            <img
                              src={UserImage}
                              className="w-20 h-20 rounded-full mx-auto my-2"
                            ></img>
                            <input
                              id="profileimage"
                              type="url"
                              className="py-2 px-4 rounded-lg w-full bg-gray-400/30 placeholder-black outline-none border-none"
                              ref={ProfileImage}
                              placeholder="Image URL"
                              onChange={ChangeProfilePic}
                            />
                          </div>

                          <input
                            type="text"
                            name="naame"
                            id="name"
                            className="py-2 px-4 rounded-lg w-full bg-gray-400/30 placeholder-black outline-none border-none"
                            placeholder="Name"
                            ref={UserName}
                          />
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
                              Sign-Up
                            </button>
                          </div>
                          <div className="text-center">
                            <span className="">
                              Already Have Account?
                              <span
                                className="text-xl ms-2 text-primary cursor-pointer"
                                onClick={() => Navigate("/login")}
                              >
                                Log-In
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

export default SignUp;
