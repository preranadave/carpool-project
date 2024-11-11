import React, { useRef, useState } from "react";
import Navbar from "../Navbar/Navbar";
import { motion } from "framer-motion";
import axios from "axios";
import Footer from "../Footer/Footer";

function ContactUs() {
  const PositionLeftXOpacity = {
    hidden: { opacity: 0, x: -150 },
    visible: { opacity: 1, x: 0 },
  };
  const PositionRightXOpacity = {
    hidden: { opacity: 0, x: 150 },
    visible: { opacity: 1, x: 0 },
  };
  const PositionDownUpYOpacity = {
    hidden: { opacity: 0, y: 150 },
    visible: { opacity: 1, y: 0 },
  };
  const UserName = useRef("");
  const Email = useRef("");
  const Phone = useRef("");
  const UserMessage = useRef("");
  const [Message, SetMessage] = useState(false);
  const AddContactDetail = (event) => {
    event.preventDefault();
    var contacts = {
      Name: UserName.current.value,
      Email: Email.current.value,
      Phone: Phone.current.value,
      Message: UserMessage.current.value,
    };
    axios.post(`http://localhost:8000/Contacts`, contacts).then(() => {
      SetMessage(true);
      if (Message == false) {
        setTimeout(() => {
          SetMessage(false);
        }, 3000);
      }
      event.target.reset();
    });
  };
  return (
    <div>
      <Navbar></Navbar>

      <div className=" mt-12 mb-12 md:w-[70%] w-[95%] flex items-center  bg-white md:mx-56 mx-auto rounded-2xl ">
        <div className="min-h-[600px] md:min-h-[200px] rounded">
          <div className="w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-5">
              {/* Left Side */}
              <motion.div
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={PositionLeftXOpacity}
                transition={{ duration: 0.5 }}
                className="bg-primary h-full  md:p-20 p-10 rounded-tl-[16px] rounded-tr-[16px] md:rounded-tr-[0px] md:rounded-tl-[16px] md:rounded-bl-[16px]"
              >
                <div className=" px-3 lg:text-left lg:max-w-[450px] ">
                  <h1 className="text-5xl lg:text-7xl font-bold text-adminprimary">
                    Get in touch with us.
                  </h1>
                  <h1 className="text-lg font-bold my-5 ">
                    Call us at
                    <span className="text-adminprimary">
                      {" "}
                      080 47091628
                    </span>{" "}
                  </h1>
                  <h1 className="text-lg font-bold ">
                    Email us at{" "}
                    <span className="text-adminprimary">
                      {" "}
                      carpool@gmail.com
                    </span>{" "}
                  </h1>
                </div>
              </motion.div>
              {/*Sign Up Form */}
              <motion.div
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={PositionRightXOpacity}
                transition={{ duration: 0.5 }}
              >
                {/* absolute -translate-y-6 w-[30%] mx-5 */}

                <div
                  className={`px-5 w-[80%] mx-auto text-center bg-yellow-100 border border-primary text-adminprimary rounded-md p-2 my-2 ${
                    Message ? "opacity-100" : "opacity-0"
                  } duration-700 transition-all`}
                >
                  <div className="">
                    Thanks for contacting us. One of our cordinator will reach
                    you soon.
                  </div>
                </div>

                <div className="w-[90%] md:w-[full] md:mx-4 mx-auto p-4 bg-white/60 mb-10 md:mt-5  text-black rounded-2xl shadow-2xl">
                  <div>
                    <h1 className="text-4xl text-center font-semibold mb-5 text-adminprimary">
                      Contact Us
                    </h1>
                    <form action="" onSubmit={AddContactDetail}>
                      <div className="space-y-6 flex-col justify-center items-center">
                        <input
                          type="text"
                          name="naame"
                          id="name"
                          className="py-2 px-4 rounded-lg w-full bg-gray-400/30 placeholder-black outline-none border-none"
                          placeholder="Name"
                          ref={UserName}
                        />
                        <input
                          type="email"
                          name="email"
                          id="email"
                          className="py-2 px-4 rounded-lg w-full bg-gray-400/30 placeholder-black outline-none border-none"
                          placeholder="Email"
                          ref={Email}
                        />
                        <input
                          type="text"
                          name="phone"
                          id="phone"
                          className="py-2 px-4 rounded-lg w-full bg-gray-400/30 placeholder-black outline-none"
                          placeholder="Phone"
                          ref={Phone}
                        />
                        <textarea
                          name="message"
                          id="message"
                          className="py-2 px-4 rounded-lg w-full bg-gray-400/30 placeholder-black outline-none"
                          placeholder="Write Your Message Here."
                          ref={UserMessage}
                        ></textarea>
                        <div className="flex justify-center">
                          <button type="submit" className="btn-primary w-[50%]">
                            Submit
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default ContactUs;
