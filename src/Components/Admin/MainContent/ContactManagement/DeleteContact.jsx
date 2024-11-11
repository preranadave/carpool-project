import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function DeleteContact(props) {
    
  const { id } = useParams();
  const [Message, SetMessage] = useState(false);

  useEffect(() => {
    axios.delete(`http://localhost:8000/Contacts/${id}`).then(() => {
      SetMessage(true);
      if (Message == false) {
        setTimeout(() => {
          SetMessage(false);

          props.onHide();
          props.onLoad();
        }, 2000);
      }
    });
  });
  return (
    <div
      {...props}
      className={`bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative ${
        Message ? "opacity-100" : "opacity-0"
      } duration-700 transition-all`}
      role="alert"
    >
      <strong className="font-bold">Deleted</strong>
      <span className="block sm:inline mx-2">Contact Succesfully!</span>
    </div>
  );
}

export default DeleteContact;
