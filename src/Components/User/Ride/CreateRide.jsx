import React, { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import axios from "axios";
import { useUserAuth } from "../../../Context/UserAuthContext";
//import Components
import Navbar from "../Navbar/Navbar";

//images
import RideBg from "../../../assets/images/ride-bg.png";
function CreateRide() {
  //form object
  const Origin = useRef();
  const Destination = useRef();
  const [SelectedDate, SetSelectedDate] = useState(new Date());
  const [time, setTime] = useState("");
  const AvailableSeats = useRef();
  const Price = useRef();
  //declaration

  const { user } = useUserAuth();
  //destructuring User Object
  const [UserData, setUserData] = useState();
  const [Message, SetMessage] = useState(false);

  //price variables

  const [pricevalue, setPricevalue] = useState();
  //location variables

  const [LocationData, SetLocationData] = useState();

  const [originvalue, setOriginvalue] = useState();

  const [destinationvalue, setDestinationnvalue] = useState();
  //functions
  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        // Fetch user details from  User API
        const response = await axios.get(`http://localhost:8000/Users`);
        setUserData(response.data.filter((e) => e.UID == user.uid));
        // console.log(UserData);
      }
    };

    fetchUserData();
  }, [UserData]);

  useEffect(() => {
    axios.get(`http://localhost:8000/Locations`).then((response) => {
      SetLocationData(response.data);
    });
  });
  const handlePriceChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setPricevalue(value);
  };
  //send form data to api
  const CreateRide = (e) => {
    e.preventDefault();
    const hours = SelectedDate.getHours();
    const minutes = SelectedDate.getMinutes();
    setTime(`${hours}:${minutes}`);
    var RideDetails = {
      Origin: Origin.current.value,
      Destination: Destination.current.value,
      RideDate: SelectedDate.toLocaleDateString(),
      RideTime: `${hours}:${minutes}`,
      AvailableSeats: AvailableSeats.current.value,
      Price: Price.current.value,
      Status: "Available",
      CreatedByUID: UserData[0].UID,
      DriverProfile: UserData[0].ProfileImage,
      DriverName: UserData[0].UserName,
      BookedByUID:"",
      PassengernName:""
    };
    axios.post(`http://localhost:8000/Rides`, RideDetails).then(() => {
      SetMessage(true);
      if (Message == false) {
        setTimeout(() => {
          SetMessage(false);
        }, 3000);
      }
      e.target.reset();
      Origin.current.value.reset, Destination.current.value.reset;
      SetSelectedDate(new Date()), setPricevalue("");
    });
  };

  return (
    <>
      <Navbar></Navbar>
      <div className="md:mt-5 mt-2 md:w-[95%] w-[95%] bg-white mx-auto rounded-2xl">
        <div className="min-h-[600px] md:min-h-[200px] rounded-2xl ">
          <div className="w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-4 text-white">
              {/* Driver Left Side */}
              <div className=" bg-primary flex flex-col  items-center p-6 h-[180px] md:h-full rounded-tl-[16px] rounded-tr-[16px] md:rounded-tr-[0px] md:rounded-tl-[16px]  md:rounded-bl-[16px] text-center lg:items-start lg:text-left lg:max-w-[100%]">
                <div>
                  {" "}
                  <h1 className="text-3xl lg:text-7xl mx-auto font-bold text-adminprimary">
                    Drive. Share. Save.
                  </h1>
                </div>
                <div>
                  <img
                    src={RideBg}
                    className="h-[140px] md:h-[400px] translate-y-3"
                  ></img>
                </div>
              </div>
              {/* Driver  Ride */}

              <div className="flex-col">
                <div
                  className={`px-5 w-[80%] mx-auto my-2 text-center bg-yellow-100 border border-primary text-adminprimary rounded-md p-2 ${
                    Message ? "opacity-100" : "opacity-0"
                  } duration-700 transition-all`}
                >
                  <div className="">Your Ride Has Been Posted!</div>
                </div>
                <div className="w-[90%] md:w-[80%] mx-auto  bg-white text-black  rounded-2xl shadow-2xl lg:max-w-[100%]">
                  <div className="p-4">
                    <h1 className="text-3xl text-center font-bold mb-5">
                      Create Ride
                    </h1>
                    <form action="" onSubmit={CreateRide}>
                      <div className="space-y-6">
                        <div>
                          <select
                            name="origin"
                            id="origin"
                            ref={Origin}
                            className="py-2 px-4  rounded-lg w-full bg-black/10 placeholder-black placeholder:font-bold outline-none border-none"
                          >
                            <option selected disabled>Select Origin</option>
                            {LocationData &&
                              LocationData.map((item) => {
                                return (
                                  <>
                                    <option
                                      value={originvalue}
                                      className="absolute border-none md:w-[445px] flex w-[330px] md:h-[350px] h-[330px] shadow-2xl rounded-md  overflow-y-scroll scroll-smooth bg-yellow-100  p-2"
                                    >
                                      <span>{item.Address},</span>

                                      <span>{item.City}</span>
                                    </option>
                                  </>
                                );
                              })}
                          </select>
                        </div>
                        <div>
                          <select
                            name="Destination"
                            id="Destination"
                            ref={Destination}
                            className="py-2 px-4 rounded-lg w-full bg-black/10 placeholder-black placeholder:font-bold outline-none border-none"
                          >
                            <option selected disabled>Select Destination</option>
                            {LocationData &&
                              LocationData.map((item) => {
                                return (
                                  <>
                                    <option
                                      value={destinationvalue}
                                      className="absolute md:w-[445px] flex w-[330px] md:h-[350px] h-[330px] shadow-2xl rounded-md  overflow-y-scroll scroll-smooth bg-yellow-100  p-2"
                                    >
                                      <span>{item.Address},</span>

                                      <span>{item.City}</span>
                                    </option>
                                  </>
                                );
                              })}
                          </select>
                        </div>
                        <DatePicker
                          showTimeSelect
                          showIcon
                          dateFormat="dd/MM/yyyy h:mm aa"
                          selected={SelectedDate}
                          onChange={(date) => {
                            SetSelectedDate(date);
                          }}
                          minDate={new Date()}
                          className="form-control form-control-solid px-4 rounded-lg  md:w-[542px] sm:w-[240px] lg:w-[642px]] w-[240px] bg-black/10 outline-none"
                        ></DatePicker>
                        <div className="flex space-x-2">
                          <input
                            type="number"
                            name="availableSeats"
                            id="availableSeats"
                            ref={AvailableSeats}
                            className="py-2 px-4 rounded-lg w-full bg-black/10 placeholder-black placeholder:font-bold  outline-none border-none"
                            placeholder="Available Seats"
                            min={1}
                          />
                          <input
                            type="text"
                            name="price"
                            id="price"
                            value={pricevalue}
                            ref={Price}
                            className="py-2 px-4 rounded-lg w-full bg-black/10 placeholder-black placeholder:font-bold  outline-none border-none"
                            placeholder="Price"
                            onChange={handlePriceChange}
                          />
                        </div>
                        <button type="submit" className="btn-primary w-full">
                          Post Ride
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

export default CreateRide;
