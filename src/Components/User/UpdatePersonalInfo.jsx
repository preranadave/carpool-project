import React, { useEffect, useRef, useState } from "react";
import { useUserAuth } from "../../Context/UserAuthContext";
import { Link, useNavigate } from "react-router-dom";

import Image from "../../assets/images/user.png";
import axios from "axios";
import { motion } from "framer-motion";

function UpdatePersonalInfo() {
  const PositionRightXOpacity = {
    hidden: { opacity: 0, x: 150 },
    visible: { opacity: 1, x: 0 },
  };
  const PositionDownUpYOpacity = {
    hidden: { opacity: 0, y: 150 },
    visible: { opacity: 1, y: 0 },
  };
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const { user } = useUserAuth();
  
  const [UserImage, setUserImage] = useState();

  const [UserNamevalue, setUserNamevalue] = useState();

  
  useEffect(() => {
    const fetchData = () => {
      try {
        axios.get(`http://localhost:8000/Users`).then( (response) => {
          const current =  response.data.find((e) => e.UID === user.uid);
          setData(current);
          setUserImage(current.ProfileImage)
          setUserNamevalue(current.UserName)
          setLoading(false);
        });
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  });

  const [error, setError] = useState("");

  const [Message, SetMessage] = useState(false);

  //form input object destructuring

  //functions
  const ChangeProfilePic = (event) => {
    setUserImage(event.target.value);
  };
  const ChangeUserName = (event) => {
    setUserNamevalue(event.target.value);
  };
  const UpdateUser = async (event) => {
    event.preventDefault();
    data[0].UserName = UserNamevalue;
    data[0].ProfileImage = UserImage;
    
    await axios.put(`http://localhost:8000/Users/${data[0].id}`, data[0]).then(() => {
      SetMessage(true);
      if (Message == false) {
        setTimeout(() => {
          SetMessage(false);

          // Navigate("/login");
        }, 2000);
      }
      event.target.reset();
    });
  };
  return (
    <>
      {loading ? (
        <div className="text-center">Loading…</div>
      ) : (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={PositionRightXOpacity}
          transition={{ duration: 0.5 }}
          className="md:w-[550px]"
        >
          <h1 className="text-4xl text-center font-semibold mt-5 text-adminprimary">
            Personal Information
          </h1>
          {/* absolute -translate-y-6 w-[30%] mx-5 */}

          <div
            className={`px-5 w-[80%] mx-auto text-center bg-yellow-100 border border-primary text-adminprimary rounded-md p-2 my-1 ${
              Message ? "opacity-100 h-10 " : "opacity-0 h-0"
            } duration-700 transition-all`}
          >
            <div className="">Your Details Updated Successfully!</div>
          </div>
          {error && (
            <div className="px-5 w-[80%] mx-auto text-center bg-red-300 border border-red-700 text-black rounded-md p-2 my-2">
              {error}
            </div>
          )}
          <div className="w-[90%] md:w-[90%]  mx-auto p-4 bg-white/60 mb-10 md:mt-2  text-black">
            <form action="" onSubmit={UpdateUser}>
              <div className="space-y-6 flex-col justify-center items-center">
                {/* user Image Upload  */}
                <div
                  // onClick={handleImageClick}
                  className="flex-col justify-center items-center mx-auto"
                >
                  <img
                    alt="User Profile Image"
                    src={UserImage}
                    className="w-20 h-20 rounded-full mx-auto my-2"
                  ></img>
                  {/* <input
                    id="profileimage"
                    type="url"
                    className="py-2 px-4 rounded-lg w-full bg-gray-400/30 placeholder-black outline-none border-none"
                    // ref={ProfileImage}
                    value={UserImage}
                    placeholder="Image URL"
                    onChange={ChangeProfilePic}
                  /> */}
                </div>

                <div className="text-center flex justify-center">{UserNamevalue}</div>

              </div>
            </form>
          </div>
        </motion.div>
      )}
    </>
  );
}

export default UpdatePersonalInfo;
