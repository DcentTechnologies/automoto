import React from "react";
import Navbar from "./Navbar";
import "./home.css"

const Home = () => {
  return (
    <div>
      <Navbar />
      <header className="home-header">
        <h1>Welcome to AutoMoto</h1>
        <p>Your one-stop destination to buy and sell used bikes and cars!</p>
        <a href="/bikes"><button className="browse-btn">Browse Vehicles</button></a>
      </header>
    </div>
  );
};

export default Home;
