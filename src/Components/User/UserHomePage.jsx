import React from "react";
//importing user Components
import HeroSection from "./Hero/HeroSection";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import HowItWorks from "./Content/HowItWorks";
import WhyCarPool from "./Content/WhyCarPool";
function UserHomePage() {
  return (
    <>
      
        <Navbar/>
        <HeroSection/>
        <WhyCarPool></WhyCarPool>
        <HowItWorks></HowItWorks>
        <Footer></Footer>
    
    </>
  );
}

export default UserHomePage;
