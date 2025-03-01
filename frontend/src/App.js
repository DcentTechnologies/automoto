import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Contact from "./components/Contact";
import SellBike from "./components/SellBike";
import BrowseBikes from "./components/BrowseBikes";

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/sell" element={<SellBike />} />
        <Route path="/bikes" element={<BrowseBikes />} />
        </Routes>
        </Router>
  )
};

export default App;