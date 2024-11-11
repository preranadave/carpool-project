import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
//component  imports
import Header from "../../Header/AdminHeader";
import AdminSideBar from "../../Sidebar/AdminSideBar";
import DeleteUsers from "./DeleteUsers";
//icons import
import { MdDelete } from "react-icons/md";
import { FaPencilAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function UserManagement() {
  const Navigate=useNavigate();
  //users data object destructring
  const [UserData, setUserData] = useState();
  
  const [DeleteMessage,setDeleteMessage]=useState(false)
  //datatable variables
  const [Search, setSearch] = useState();
  const coulumns = [
    {
      name: "User Name",
      selector: (row) => row.UserName,
      sortable: true,
      wrap:true
    },
    {
      name: "Email",
      selector: (row) => row.Email,
      sortable: true,
      wrap:true
    },
    {
      name: "Profile Image",
      selector: (row) => (<img src={row.ProfileImage} className="w-16 h-16"></img>),
      sortable: true,
    },
    {
      name: "Role",
      selector: (row) => row.Role,
      sortable: true,
      wrap:true
    },
    {
      name: "IsDriver",
      selector: (row) => row.IsDriver,
    },
    {
      name: "Action",
      cell: (row) => (
        <span>
          {/* <button className="bg-blue-400 text-white p-2 rounded"><span><FaPencilAlt/></span></button> */}
          <button className="bg-red-500 text-white p-2 rounded mx-2" onClick={()=>{Navigate(`/admin/dashboard/manage-users/${row.id}`)}}>
          <span><MdDelete/></span>
          </button>
        </span>
      ),
    },
  ];
  //fetch user details
  const GetUsers = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/Users`);
      setUserData(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    GetUsers();
  }, [UserData]);
  useEffect(()=>{

  },[Search])
  return (
    <>
      <h1 className="text-xl font-bold p-4">User Management</h1>
      <div className=" bg-white  p-4 m-2 shadow-lg">
      <DeleteUsers isOpen={DeleteMessage} onHide={()=>{setDeleteMessage(false)}}></DeleteUsers>

        <DataTable
          columns={coulumns}
          data={UserData}
          pagination
          fixedHeader
          highlightOnHover
          fixedHeaderScrollHeight="450px"
          subHeader
          // subHeaderComponent={
          //   <div>
          //     <input
          //       type="text"
          //       className="rounded bg-gray-300/20  w-[270px] p-2 outline-none border-none placeholder:text-[14px]"
          //       placeholder="Filter"
          //       value={Search}
          //       onChange={() => {setSearch(e.target.val)}}
          //     ></input>
          //     <div
          //       className="rounded-tr-[5px] rounded-br-[5px] bg-adminprimary px-[14px] flex items-center
          //      justify-center cursor-pointer text-white"
          //     ></div>
          //   </div>
          // }
        />
      </div>
    </>
  );
}

export default UserManagement;
