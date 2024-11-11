import axios from "axios";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
function AdminDashboard() {
  const [UserCount, SetUserCount] = useState();

  const [RideCount, SetRideCount] = useState();

  const [ContactCount, SetContactCount] = useState();
  const FetchUser = () => {
    axios.get(`http://localhost:8000/Users`).then((response) => {
      SetUserCount(response.data.length);
    });
  };
  useEffect(() => {
    FetchUser();
  }, [UserCount]);
  const FetchRide = () => {
    axios.get(`http://localhost:8000/Rides`).then((response) => {
      SetRideCount(response.data.length);
    });
  };
  
  useEffect(() => {
    FetchRide();
  }, [RideCount]);
  const FetchContact = () => {
    axios.get(`http://localhost:8000/Contacts`).then((response) => {
      SetContactCount(response.data.length);
    });
  };
  
  useEffect(() => {
    FetchContact();
  }, [ContactCount]);

  return (
    <>
      <div className="w-[98%] mx-auto h-screen md:h-[20vw]">
        <h2 className="text-2xl font-bold mb-5 p-5">Dashboard Home</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-5">
          <div className="bg-yellow-300 p-5 rounded shadow-md">
            <h3 className="font-bold text-xl">Total Users</h3>
            <p className="text-3xl">{UserCount}</p>
          </div>
          <div className="bg-orange-400 p-5 rounded shadow-md">
            <h3 className="font-bold text-xl">Total Rides</h3>
            <p className="text-3xl">{RideCount}</p>
          </div>
          <div className="bg-green-400 p-5 rounded shadow-md">
            <h3 className="font-bold text-xl">Total Contacts</h3>
            <p className="text-3xl">{ContactCount}</p>
          </div>
          {/* <div className="bg-white p-5 rounded shadow-md">
          <h3 className="font-bold text-xl">Total Drivers</h3>
          <p className="text-3xl">50</p>
        </div>
        <div className="bg-white p-5 rounded shadow-md">
          <h3 className="font-bold text-xl">Total Locations</h3>
          <p className="text-3xl">10</p>
        </div> */}
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
