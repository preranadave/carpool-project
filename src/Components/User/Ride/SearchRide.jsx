import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
//import Components
import Navbar from "../Navbar/Navbar";

//images
import RideBg from "../../../assets/images/ride-bg.png";
import axios from "axios";
import ViewRides from "./ViewRides";
function SearchRide({ defaultValues, onSearch }) {
  //declarations
  const Origin = useRef();
  const Destination = useRef();
  const AvailableSeats = useRef();
  //ustate variables
  const history = useNavigate();

  const [availableSeatsvalue, steavailableSeatsvalue] = useState(
    defaultValues ? defaultValues.Seats : ""
  );
  const [SelectedDate, SetSelectedDate] = useState(
    defaultValues ? defaultValues.date : new Date()
  );
  const [originvalue, setOriginvalue] = useState(
    defaultValues ? defaultValues.fromloaction : ""
  );
  const [destinationvalue, setDestinationnvalue] = useState(
    defaultValues ? defaultValues.tolocation : ""
  );

  //date variables

  //api data store variables

  const [LocationData, SetLocationData] = useState();

  //functions

  useEffect(() => {
    axios.get(`http://localhost:8000/Locations`).then((response) => {
      SetLocationData(response.data);
    });
  });

  useEffect(() => {
    // setOriginvalue( defaultValues ?defaultValues.fromloaction : "");
    // setDestinationnvalue( defaultValues ? defaultValues.tolocation : "");
    // steavailableSeatsvalue( defaultValues ? defaultValues.Seats : "");

    // SetSelectedDate( defaultValues ? defaultValues.date : new Date());
    onSearch(originvalue, destinationvalue, SelectedDate, availableSeatsvalue);
  }, [defaultValues]);

  const handleoriginChange = (event) => {
    const value = event.target.value;

    setOriginvalue(value);

   // defaultValues.fromloaction = value;
  };
  const handleDestinationChange = (event) => {
    setDestinationnvalue(event.target.value);
  };
  const handleSeatChange = (event) => {
    steavailableSeatsvalue(event.target.value);
  };
  const handleDateChange = (date) => {
    SetSelectedDate(date);
  };
  const handleSearch = (e) => {
    e.preventDefault();
    let date = SelectedDate;
    let fromloaction = Origin.current.value;
    let tolocation = Destination.current.value;
    let Seats = AvailableSeats.current.value;
    //to filter rides

    onSearch(fromloaction, tolocation, date, Seats);

    history("/view-rides", {
      state: { fromloaction, tolocation, date, Seats },
    });
  };

  useEffect(() => {
    // Function to clear local storage
    const clearLocalStorage = () => {
      localStorage.removeItem("Origin");

      localStorage.removeItem("Destination");

      localStorage.removeItem("SelectedDate");

      localStorage.removeItem("AvailableSeats");
    };

    // Set up the beforeunload event listener
    window.addEventListener("beforeunload", clearLocalStorage);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("beforeunload", clearLocalStorage);
    };
  }, []);
  return (
    <>
      <div className="w-[90%] md:w-[480px] mx-auto p-4 bg-white/60  text-black  rounded-2xl shadow-md">
        <div>
          <h1 className="text-3xl text-center font-bold mb-5">
            Look For A Ride
          </h1>
          <form action="" onSubmit={handleSearch}>
            <div className="space-y-6">
              <div>
                <select
                  name="origin"
                  id="origin"
                  ref={Origin}
                  value={originvalue}
                  onChange={handleoriginChange}
                  className="py-2 px-4 rounded-lg w-full bg-black/10 placeholder-black placeholder:font-bold outline-none border-none"
                >
                 
                 <option className="text-gray-500" value="" selected disabled>Select Origin</option>
                  {LocationData &&
                    LocationData.map((item) => {
                      return (
                        <>
                          <option className="absolute md:w-[445px] flex w-[330px] md:h-[350px] h-[330px] shadow-2xl rounded-md  overflow-y-scroll scroll-smooth bg-yellow-100  p-2">
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
                  value={destinationvalue}
                  onChange={handleDestinationChange}
                  className="py-2 px-4 rounded-lg w-full bg-black/10 placeholder-black placeholder:font-bold outline-none border-none"
                >
                  
                  <option className="text-gray-500" value="" selected disabled>Select Destination</option>
                  {LocationData &&
                    LocationData.map((item) => {
                      return (
                        <>
                          <option className="absolute md:w-[445px] flex w-[330px] md:h-[350px] h-[330px] shadow-2xl rounded-md  overflow-y-scroll scroll-smooth bg-yellow-100  p-2">
                            <span>{item.Address},</span>

                            <span>{item.City}</span>
                          </option>
                        </>
                      );
                    })}
                </select>
              </div>
              <div className="flex space-x-2">
                <DatePicker
                  showIcon
                  dateFormat="dd/MM/yyyy"
                  selected={SelectedDate}
                  onChange={(date) => {
                    handleDateChange(date);
                  }}
                  minDate={new Date()}
                  className="h-[40px] px-4 rounded-lg w-full bg-black/10 placeholder-black placeholder:font-bold  outline-none border-none"
                ></DatePicker>

                <div className="flex space-x-2">
                  <input
                    type="number"
                    name="availableSeats"
                    id="availableSeats"
                    ref={AvailableSeats}
                    value={availableSeatsvalue}
                    onChange={handleSeatChange}
                    className="py-2 px-4 rounded-lg w-full bg-black/10 placeholder-black placeholder:font-bold  outline-none border-none"
                    placeholder="Available Seats"
                    min={1}
                  />
                </div>
              </div>
              <button type="submit" className="btn-primary w-full">
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default SearchRide;
