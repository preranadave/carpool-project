import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { ModalBody, Modal, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { IoIosCloseCircleOutline } from "react-icons/io";

function EditLocation(props) {
  const [SuucessMessage, setSuucessMessage] = useState(false);

  const City = props.City;
  const Address = props.Address;
  const id = props.LocationID;
  

  useEffect(() => {
    (async () => {
    //   try {
    //     await axios
    //       .get(`http://localhost:8000/Locations/${id}`)
    //       .then((response) => {
    //         City.current.value = response.data.City;
    //         Address.current.value = response.data.Address;
    //       });
    //   } catch (error) {
    //     console.error(error.response.data);
    //   }
    })();
  }, []);

  const UpdateLocation = (e) => {
    e.preventDefault();
    var SendData = {
      City: City.current.value,

      Address: Address.current.value,
    };
    axios.put(`http://localhost:8000/Locations/${id}`, SendData).then(() => {
      setSuucessMessage(true);
      if (SuucessMessage == false) {
        setTimeout(() => {
          setSuucessMessage(false);
          
        }, 3000);
      }
    });
  };

  return (
    <>
      <div
        {...props}
        className={`fixed top-80 bg-yellow-50 shadow-lg p-4 mx-72  flex-col  ${
          props.isOpen
            ? "z-[1000] opacity-100 duration-1000"
            : "-z-[1000]  opacity-0 duration-1000"
        } transition-all duration-1000`}
      >
        <div
          className={`w-[full] mx-auto mb-3 text-center bg-blue-400 border border-adminprimary text-white rounded-md p-1 ${
            SuucessMessage ? "opacity-100" : "opacity-0"
          } duration-700 transition-all`}
        >
          Location Updated Successfully!
        </div>
        <IoIosCloseCircleOutline
                    size={30}
                    className="cursor-pointer fixed right-[340px] top-[320px]  mx-3"
                    onClick={props.onHide}
                  />
        <form action="" onSubmit={UpdateLocation}>
          <div className="flex justify-center">
            <input
              type="text"
              name="city"
              id="city"
              className="py-2 px-4 rounded-lg mx-2 bg-black/10 placeholder-black placeholder:font-bold outline-none border-none"
              placeholder="City"
              ref={City}
            />
            <input
              type="text"
              name="address"
              id="address"
              className="py-2 px-4 rounded-lg mx-2 bg-black/10 placeholder-black placeholder:font-bold outline-none border-none"
              placeholder="Address"
              ref={Address}
            />
            <button type="submit" className="a-btn-primary">
              Update Location
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default EditLocation;
