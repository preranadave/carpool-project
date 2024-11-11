import React, { useEffect, useRef, useState } from "react";
import { useUserAuth } from "../../Context/UserAuthContext";
import { motion } from "framer-motion";
import { BiShow } from "react-icons/bi";
import { BiSolidHide } from "react-icons/bi";
import axios from "axios";
import {
  updateEmail,
  updatePassword,
  verifyBeforeUpdateEmail,
} from "firebase/auth";

function UpdateEmailPass({ userdata }) {
  const PositionRightXOpacity = {
    hidden: { opacity: 0, x: 150 },
    visible: { opacity: 1, x: 0 },
  };
  const PositionDownUpYOpacity = {
    hidden: { opacity: 0, y: 150 },
    visible: { opacity: 1, y: 0 },
  };
  const Email = useRef("");
  const Password = useRef("");
  const NewPassword = useRef("");

  const OldPassword = useRef("");
  const [EmailValue, SetEmailValue] = useState(userdata ? userdata.Email : "");
  const [PasswordValue, SetPasswordValue] = useState();

  const [NewPasswordValue, SetNewPasswordValue] = useState();
  const [Message, SetMessage] = useState(false);

  const [error, setError] = useState("");

  const [Passworderror, setPasswordError] = useState(false);
  const { editEmail, editPassword, user, reauthenticate, verifyBeforeEmail } =
    useUserAuth();

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const checkPassword = () => {
    OldPassword.current.value != userdata.Password
      ? setPasswordError(true)
      : setPasswordError(false);
  };
  const handleEmailChange = (event) => {
    SetEmailValue(event.target.value);
  };
  const handlePasswordChange = (event) => {
    SetNewPasswordValue(event.target.value);
  };
  const handleOldPasswordChange = (event) => {
    SetPasswordValue(event.target.value);
  };
  const UpdateEmailPassFirebase = async () => {
    setError("");

    try {
      //signup api data

      await reauthenticate(Password.current.value).then(async () => {
        const Promises = [];
        if (Email.current.value !== user.email) {
          await verifyBeforeUpdateEmail(user, Email.current.value);

          Promises.push(updateEmail(user, Email.current.value));
        }
        if (NewPassword.current.value) {
          Promises.push(updatePassword(user, NewPassword.current.value));
        }
        await Promise.all(Promises).then(async () => {
          SetMessage(true);
          if (Message == false) {
            setTimeout(() => {
              SetMessage(false);
            }, 8000);
          }
        });
      });
    } catch (err) {
      setError(err.message);
    }
  };
  const UpdateDbuser = async () => {
    (userdata.Email = Email.current.value),
      (userdata.Password = NewPassword.current.value),
      await axios
        .put(`http://localhost:8000/Users/${userdata.id}`, userdata)
        .then((response) => {
          SetMessage(true);
          if (Message == false) {
            setTimeout(() => {
              SetMessage(false);
            }, 8000);
          }
        });
  };

  const HandleSubmit = async (event) => {
    event.preventDefault();
    if (Passworderror != true) {
      await UpdateEmailPassFirebase();
      await UpdateDbuser();
    }
  };
  return (
    <>
      <motion.div
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={PositionRightXOpacity}
        transition={{ duration: 0.5 }}
        className="md:w-[550px]"
      >
        <h1 className="text-4xl text-center font-semibold mt-5 text-adminprimary">
          Email & Password
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
          <form action="" onSubmit={HandleSubmit}>
            <div className="space-y-6 flex-col justify-center items-center">
              <input
                type="email"
                name="email"
                id="email"
                className="py-2 px-4 rounded-lg w-full bg-gray-400/30 placeholder-black outline-none border-none"
                placeholder="Email"
                ref={Email}
                value={EmailValue}
                onChange={handleEmailChange}
              />

              <div className="flex-col flex">
                {Passworderror && (
                  <h1 className="text-xs text-red-500">
                    Old Password Doesn't Match!
                  </h1>
                )}
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  className="py-2 px-4 rounded-lg w-full bg-gray-400/30 placeholder-black outline-none"
                  placeholder="Enter Old Password"
                  ref={OldPassword}
                  onChange={handleOldPasswordChange}
                  onBlur={checkPassword}
                  value={PasswordValue}
                />
              </div>
              <div className="flex">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  className="py-2 px-4 rounded-lg w-full bg-gray-400/30 placeholder-black outline-none"
                  placeholder="Enter New Password"
                  ref={NewPassword}
                  onChange={handlePasswordChange}
                  value={NewPasswordValue}
                />
                <button
                  type="button"
                  className="absolute md:right-[390px] right-14 mt-3"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <BiSolidHide size={20} />
                  ) : (
                    <BiShow size={20} />
                  )}
                </button>
              </div>
              <div className="flex justify-center">
                <button type="submit" className="btn-primary w-[50%]">
                  Update
                </button>
              </div>
            </div>
          </form>
        </div>
      </motion.div>
    </>
  );
}

export default UpdateEmailPass;
