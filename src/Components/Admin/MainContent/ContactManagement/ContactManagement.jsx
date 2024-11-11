import React, { useEffect, useState } from "react";

import DataTable from "react-data-table-component";
import axios from "axios";
//icons import
import { MdDelete } from "react-icons/md";
import { FaPencilAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import DeleteContact from "./DeleteContact";

function ContactManagement() {
  const Navigate = useNavigate();

  const [DeleteMessage, setDeleteMessage] = useState(false);
  const [loaddelete, setLoadDelete] = useState(false);
  const HandleDelete = (contact) => {
    setLoadDelete(true);
    Navigate(`/admin/dashboard/manage-contacts/delete-contact/${contact.id}`);
  };
  //datatable variables
  const coulumns = [
    {
      name: "Contact Name",
      selector: (row) => row.Name,
      sortable: true,
    },
    {
      name: "Contact Email",
      selector: (row) => row.Email,
      sortable: true,
    },
    {
      name: "Phone",
      selector: (row) => row.Phone,
    },
    {
      name: "Message",
      selector: (row) => row.Message,
    },
    {
      name: "Action",
      cell: (row) => (
        <span>
          {/* <button className="bg-blue-400 text-white p-2 rounded">
            <span>
              <FaPencilAlt />
            </span>
          </button> */}
          <button
            className="bg-red-500 text-white p-2 rounded mx-2"
            onClick={()=>{HandleDelete(row)}}
          >
            <span>
              <MdDelete />
            </span>
          </button>
        </span>
      ),
    },
  ];
  const [ContactData, SetContactData] = useState();
  //functions
  const GetContact = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/Contacts`);
      SetContactData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetContact();
  }, [ContactData]);
  return (
    <>
      <h1 className="text-xl font-bold p-4">Contact Management</h1>
      <div className=" bg-white  p-4 m-2 shadow-lg">
        {loaddelete && (
          <DeleteContact
            isOpen={DeleteMessage}
            onHide={() => {
              setDeleteMessage(false);
            }}
            onLoad={()=>{setLoadDelete(false)}}
          ></DeleteContact>
        )}

        <DataTable
          columns={coulumns}
          data={ContactData}
          pagination
          fixedHeader
          highlightOnHover
          fixedHeaderScrollHeight="450px"
        />
      </div>
    </>
  );
}

export default ContactManagement;
