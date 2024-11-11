import React, { useEffect, useRef, useState } from "react";

import { useUserAuth } from "../../../Context/UserAuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
//import Components
import Navbar from "../Navbar/Navbar";

//images
import DriverBg from "../../../assets/images/carpool-header.png";
function CreateDriverAccount() {
  //other object destructuring
  const [Message, SetMessage] = useState(false);
  const Navigate = useNavigate();
  const { user } = useUserAuth();
  //destructuring User Object
  const [UserData, setUserData] = useState();
  //destructuring form objects
  const Drivinglicence = useRef("");
  const BankAccount = useRef("");

  //function
  useEffect(() => {
    const fetchUserData = async () => {
      // console.log(user)
      if (user) {
        // Fetch user details from  User API
        const response = await axios.get(`http://localhost:8000/Users`);
        setUserData(response.data.filter((e) => e.UID == user.uid));
        //console.log(UserData);
      }
    };

    fetchUserData();
  }, [UserData]);

  //add driver details
  const AddDriver = async (e) => {
    e.preventDefault();
    var DriverDetails = {
      Drivinglicence: Drivinglicence.current.value,
      BankAccount: BankAccount.current.value,
      UserUID: UserData[0].UID,
      DriverName: UserData[0].UserName,
      DriverProfile: UserData[0].ProfileImage,
    };
    axios
      .post(`http://localhost:8000/DriverDetails`, DriverDetails)
      .then((response) => {
        console.log(response)
        UpdateUser();
      });
  };
  const UpdateUser=()=>{
    
    UserData[0].IsDriver = true;
     axios
      .put(`http://localhost:8000/Users/${UserData[0].id}`, UserData[0])
      .then(() => {
        SetMessage(true);
        if (Message == false) {
          setTimeout(() => {
            SetMessage(false);
            Navigate("/create-ride");
          }, 3000);
        }
        e.target.reset();
      });
  }
  return (
    <>
      <Navbar></Navbar>
      <div className="md:mt-5 mt-2 md:w-[95%] w-[95%] bg-white mx-auto rounded-2xl">
        <div className="min-h-[600px] md:min-h-[200px] rounded-2xl ">
          <div className="w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 items-center  text-white">
              {/* Driver Left Side */}
              <div className=" bg-adminprimary flex flex-col  items-center p-6 h-[230px] md:h-full  rounded-tl-[16px] rounded-tr-[16px] md:rounded-tr-[0px] md:rounded-tl-[16px] md:rounded-bl-[16px] text-center lg:items-start lg:text-left lg:max-w-[100%]">
                <div>
                  {" "}
                  <h1 className="text-3xl lg:text-7xl w-[70%] mx-auto font-bold text-primary">
                    Create a Ride and Share your Journey.
                  </h1>
                </div>
                <div>
                  <img
                    src={DriverBg}
                    className="h-[180px] md:h-[400px] -translate-y-3"
                  ></img>
                </div>
              </div>
              {/* Driver  Account Form */}

              <div className="flex-col">
                <div
                  className={`px-5 w-[80%] mx-auto my-5 text-center bg-yellow-100 border border-primary text-adminprimary rounded-md p-2 ${
                    Message ? "opacity-100" : "opacity-0"
                  } duration-700 transition-all`}
                >
                  <div className="">Thank You! For Joing As Driver.</div>
                </div>
                <div className="w-[90%] md:w-[80%] mx-auto  bg-white text-black  rounded-2xl shadow-2xl lg:max-w-[100%]">
                  <div className="p-4">
                    <h1 className="text-3xl text-center font-bold mb-5">
                      Create Driver Account
                    </h1>
                    <form action="" onSubmit={AddDriver}>
                      <div className="space-y-6">
                        <input
                          type="text"
                          name="Licence"
                          id="Licence"
                          className="py-2 px-4 rounded-lg w-full bg-black/10 placeholder-black placeholder:font-bold outline-none border-none"
                          placeholder="Driving Licence Number"
                          ref={Drivinglicence}
                        />

                        <input
                          type="text"
                          name="Account"
                          id="Account"
                          className="py-2 px-4 rounded-lg w-full bg-black/10 placeholder-black placeholder:font-bold  outline-none border-none"
                          placeholder="Bank Account"
                          ref={BankAccount}
                        />
                        <button type="submit" className="btn-primary w-full">
                          Driver Register
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateDriverAccount;
