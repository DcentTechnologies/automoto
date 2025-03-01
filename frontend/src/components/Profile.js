import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./profile.css"; // Import the CSS file
import Navbar from "./Navbar";

const Profile = () => {
  const { user } = useSelector((state) => state.user);

  if (!user) {
    return (
        <>
        <Navbar />
      <div className="profile-container">
        <h2>You are not logged in!</h2>
        <Link to="/login" className="btn">Login</Link>
      </div>
      </>
    );
  }

  return (
    <>
    <Navbar />
    <div className="profile-container">
      <h2>Welcome, {user?.name}!</h2>
      <div className="profile-card">
        <p><strong>Email:</strong> {user?.email}</p>
        {/* <p><strong>Joined:</strong> {new Date(user?.createdAt).toLocaleDateString()}</p> */}
        <Link to="/edit-profile" className="btn">Edit Profile</Link>
      </div>
    </div>
    </>
  );
};

export default Profile;