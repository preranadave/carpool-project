import React, { useEffect, useRef, useState } from "react";
//import components
import AddLocation from "./AddLocation";
import EditLocation from "./EditLocation";
import DataTable from "react-data-table-component";
import axios from "axios";
import LocationDelete from "./LocationDelete";
//icons import
import { MdDelete } from "react-icons/md";
import { FaPencilAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
function LocationManagement() {
  const Navigate = useNavigate();

  const [DeleteMessage, setDeleteMessage] = useState(false);
  const [ShowAddLocation, setShowAddLocation] = useState(false);
  const [LocationID, setLocationID] = useState();
  const [ShowUpdateLocation, setShowUpdateLocation] = useState(false);
  
  const City = useRef("");
  const Address = useRef("");
  const coulumns = [
    {
      name: "City",
      selector: (row) => row.City,
      sortable: true,
    },
    {
      name: "Address",
      selector: (row) => row.Address,
      sortable: true,
    },

    {
      name: "Action",
      cell: (row) => (
        <span>
          <button
            className="bg-blue-400 text-white p-2 rounded"
            onClick={() => HandleUpdate(row.id)}
          >
            <span>
              <FaPencilAlt />
            </span>
          </button>
          <button
            className="bg-red-500 text-white p-2 rounded mx-2"
            onClick={() => {
              Navigate(
                `/admin/dashboard/manage-locations/delete-location/${row.id}`
              );
            }}
          >
            <span>
              <MdDelete />
            </span>
          </button>
        </span>
      ),
    },
  ];

  //location data object destructring
  const [LocationData, SetLocationData] = useState();
  //functions
  const GetLocations = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/Locations`);
      SetLocationData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetLocations();
  }, [LocationData]);

  const HandleUpdate = (e) => {
    setShowUpdateLocation(true);
   setLocationID(e);
    try {
       axios
        .get(`http://localhost:8000/Locations/${e}`)
        .then((response) => {
          City.current.value = response.data.City;
          Address.current.value = response.data.Address;
        });
    } catch (error) {
      console.error(error.response.data);
    }

  };
  return (
    <>
      <div className="flex justify-between items-center pe-8">
        <h1 className="text-xl font-bold p-4">Location Management</h1>
        <button className="bg-adminprimary border-none outline-none p-2 text-white rounded-md">
          Add Location
        </button>
      </div>

      <div className="flex-col gap-3">
        <div className=" bg-white  p-4 m-2 shadow-lg">
          <AddLocation
            isOpen={ShowAddLocation}
            onHide={() => {
              setShowAddLocation(false);
            }}
          ></AddLocation>
        </div>

        <div className=" bg-white  p-4 m-2 shadow-lg">
          <LocationDelete
            isOpen={DeleteMessage}
            onHide={() => {
              setDeleteMessage(false);
            }}
          ></LocationDelete>

          <DataTable
            columns={coulumns}
            data={LocationData}
            pagination
            fixedHeader
            highlightOnHover
            fixedHeaderScrollHeight="380px"
          />
        </div>
      </div>
      
      <EditLocation
          isOpen={ShowUpdateLocation}
          onHide={() => {
            setShowUpdateLocation(false);
          }}
          City={City}
          Address={Address}
          LocationID={LocationID}
        ></EditLocation>
    </>
  );
}

export default LocationManagement;
