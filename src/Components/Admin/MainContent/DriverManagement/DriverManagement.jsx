import React, { useEffect, useState } from "react";

import DataTable from "react-data-table-component";
import axios from "axios";
import DeleteDriver from "./DeleteDriver";
//icons import
import { MdDelete } from "react-icons/md";
import { FaPencilAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


function DriverManagement() {
  //declations
  const Navigate=useNavigate();
  
  const [DeleteMessage,setDeleteMessage]=useState(false)
  //datatable variables
  const [Search, setSearch] = useState();
  const coulumns = [
    {
      name: "DriverLicence",
      selector: (row) => row.Drivinglicence,
      sortable: true,
    },
    {
      name: "Bank-Account",
      selector: (row) => row.BankAccount,
      sortable: true,
    },
    {
      name: "UserID",
      selector: (row) => row.UserID,
    },
    {
      name: "Action",
      cell: (row) => (
        <span>
          {/* <button className="bg-blue-400 text-white p-2 rounded"><span><FaPencilAlt/></span></button> */}
          <button className="bg-red-500 text-white p-2 rounded mx-2" onClick={()=>{Navigate(`/admin/dashboard/manage-drivers/delete-driver/${row.id}`)}}>
            <span><MdDelete/></span>
          </button>
        </span>
      ),
    },
  ];
  //driver data object destructring
  const [DriversData, SetDriversData] = useState();
  //functions
  const GetDrivers = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/DriverDetails`);
      SetDriversData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetDrivers();
  }, [DriversData]);
  return <>
  
  <h1 className="text-xl font-bold p-4">Drivers Management</h1>
      <div className=" bg-white  p-4 m-2 shadow-lg">
      <DeleteDriver isOpen={DeleteMessage} onHide={()=>{setDeleteMessage(false)}}></DeleteDriver>

      <DataTable
          columns={coulumns}
          data={DriversData}
          pagination
          fixedHeader
          highlightOnHover
          fixedHeaderScrollHeight="450px"
          
        />
      </div>
  </>;
}

export default DriverManagement;
