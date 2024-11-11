import axios from "axios";
import React, { useRef, useState } from "react";

function AddLocation() {
  //declarations

  const [Message, setMessage] = useState(false);
  const City = useRef("");
  const Address = useRef("");
  //functions
  const AddLocation = (e) => {
    e.preventDefault();
    var LocationDetails = {
      City: City.current.value,
      Address: Address.current.value,
    };
    axios.post(`http://localhost:8000/Locations`, LocationDetails).then(() => {
      setMessage(true);
      if (Message == false) {
        setTimeout(() => {
          setMessage(false);
        }, 3000);
      }
      
    e.target.reset();
    });

  };
  return (
    <>
      <div
        className={`px-5 w-[full] mx-auto mb-3 text-center bg-blue-400 border border-adminprimary text-white rounded-md p-1 ${
          Message ? "opacity-100" : "opacity-0"
        } duration-700 transition-all`}
      >
        Location Added Successfully!
      </div>
      <form action="" onSubmit={AddLocation}>
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
            Add Location
          </button>
        </div>
      </form>
    </>
  );
}

export default AddLocation;
