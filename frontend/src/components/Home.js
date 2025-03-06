import React from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import "./home.css"

const Home = () => {
  return (
    <div>
      <Navbar />
      <header className="home-header">
        <h1>Welcome to AutoMoto</h1>
        <p>Your one-stop destination to buy and sell used bikes and cars!</p>
        <Link to="/bikes"><button className="browse-btn">Browse Vehicles</button></Link>
      </header>
    </div>
  );
};

export default Home;
