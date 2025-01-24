import React from "react";
import Navbar from "../components/Navbar";
import Herosection from "../components/Herosection";
import Aboutus from "../components/Aboutus";
import  Footer from '../components/Footer'
const Home = () => {
  return (
    <div>
      <Navbar /> {/* Correct way to render the Navbar component */}
      <Herosection />
      <Aboutus /> {/* Correct way to render the Aboutus component */}
      <Footer/>
    </div>
  );
};

export default Home;
