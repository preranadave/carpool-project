import React from "react";
//import Components
import Navbar from "../Navbar/Navbar";

//images
import RideBg from "../../../assets/images/ride-bg.png";
function CreateRide() {
    //declaration
    const today = new Date().toISOString().split('T')[0];
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
              <div className="w-[90%] md:w-[80%] mx-auto  bg-white text-black  rounded-2xl shadow-2xl lg:max-w-[100%]">
                <div className="p-4">
                  <h1 className="text-3xl text-center font-bold mb-5">
                    Create Ride
                  </h1>
                  <div className="space-y-6">
                    <input
                      type="text"
                      name="origin"
                      id="origin"
                      className="py-2 px-4 rounded-lg w-full bg-black/10 placeholder-black placeholder:font-bold outline-none border-none"
                      placeholder="Origin"
                    />
                    <input
                      type="text"
                      name="destination"
                      id="destination"
                      className="py-2 px-4 rounded-lg w-full bg-black/10 placeholder-black placeholder:font-bold  outline-none border-none"
                      placeholder="Destination"
                    />
                    <div className="flex gap-1">
                      <input
                        type="date"
                        name="ridedate"
                        id="ridedate"
                        min={today}
                        className="py-2 px-4 rounded-lg w-full bg-black/10 placeholder-black placeholder:font-bold  outline-none"
                      />
                      <input
                        type="time"
                        name="ridetime"
                        id="ridedate"
                        className="py-2 px-4 rounded-lg w-full bg-black/10 placeholder-black placeholder:font-bold  outline-none"
                      />
                    </div>

                    <input
                      type="number"
                      name="availableSeats"
                      id="availableSeats"
                      className="py-2 px-4 rounded-lg w-full bg-black/10 placeholder-black placeholder:font-bold  outline-none border-none"
                      placeholder="Available Seats"
                      min={1}
                      max={5}
                    />
                    <input
                      type="text"
                      name="price"
                      id="price"
                      className="py-2 px-4 rounded-lg w-full bg-black/10 placeholder-black placeholder:font-bold  outline-none border-none"
                      placeholder="Price"
                    />
                    <button className="btn-primary w-full">
                      Post Ride
                    </button>
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
