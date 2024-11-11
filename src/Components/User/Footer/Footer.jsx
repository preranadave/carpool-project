import React from "react";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
function Footer() {
  return (
    <>
      <div className="bg-primary px-10 py-20 mt-5">
        {/* <div className="social">
          <ul className="list-none flex space-x-2">
            <li>
              <FaFacebook size={30}/>
            </li>
            <li>
              <FaTwitter size={30}/>
            </li>
            <li>
              <FaSquareInstagram size={30}/>
            </li>
            <li>
              <FaLinkedin size={30}/>
            </li>
          </ul>
        </div> */}
        <div className="credit">
          <h1 className="text-center">© 2024. CarPool. All rights Reserved.</h1>
        </div>
      </div>
    </>
  );
}

export default Footer;
