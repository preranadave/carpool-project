import React, { useEffect, useState } from "react";

import DataTable from "react-data-table-component";
import axios from "axios";
//icons import
import { MdDelete } from "react-icons/md";
import { FaPencilAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import DeleteRide from "./DeleteRide";

function RidesManagement() {
    
  const [RidesData, setRideData] = useState();
  
  const [DeleteMessage,setDeleteMessage]=useState(false)
  const Navigate=useNavigate();
  const coulumns = [
    {
      name: "Origin",
      selector: (row) => row.Origin,
      sortable: true,
      wrap: true
    },
    {
      name: "Destination",
      selector: (row) => row.Destination,
      sortable: true,
      wrap: true
    },
    {
      name: "Ride Date",
      selector: (row) => row.RideDate,
      sortable: true,
    },
    {
        name: "Ride Time",
        selector: (row) => row.RideTime,
        sortable: true,
      },
      {
        name: "Driver Profile",
        selector: (row) =>(<img src={row.DriverProfile} className="w-16 h-16"></img>),
        sortable: true,
      },
      {
        name: "Driver Name",
        selector: (row) => row.DriverName,
        sortable: true,
        wrap: true
      },
    {
      name: "Available Seats",
      selector: (row) => row.AvailableSeats,
    },
    {
        name: "Price",
        selector: (row) => row.Price,
      },
      {
        name: "Status",
        selector: (row) => row.Status,
      },
      {
        name: "CreatedBy",
        selector: (row) => row.CreatedBy,
      },
    {
      name: "Action",
      cell: (row) => (
        <span>
          {/* <button className="bg-blue-400 text-white p-2 rounded"><span><FaPencilAlt/></span></button> */}
          <button className="bg-red-500 text-white p-2 rounded mx-2" onClick={()=>{Navigate(`/admin/dashboard/manage-rides/delete-ride/${row.id}`)}}>
          <span><MdDelete/></span>
          </button>
        </span>
      ),
    },
  ];
    
  //fetch ride details
  const GetRides = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/Rides`);
      setRideData(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    GetRides();
  }, [RidesData]);
  return (
    <>
      <h1 className="text-xl font-bold p-4">Rides Management</h1>
      <div className=" bg-white  p-4 m-2 shadow-lg">
        <DeleteRide isOpen={DeleteMessage} onHide={()=>{setDeleteMessage(false)}}></DeleteRide>

      <DataTable
          columns={coulumns}
          data={RidesData}
          pagination
          fixedHeader
          highlightOnHover
          fixedHeaderScrollHeight="450px"
          
        />

      </div>
    </>
  );
}

export default RidesManagement;
