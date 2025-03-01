import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addBike } from "../redux/actions/bikeActions";
import "./sellBike.css";
import Navbar from "./Navbar";

const SellBike = () => {
    const [title, setTitle] = useState("");
    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [price, setPrice] = useState(0);
    const [year, setYear] = useState(0);
    const [mileage, setMileage] = useState(0);
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);

    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    if (!user || !user?.user.isDealer) {
        return (
        <>
        <Navbar />
        <h2>You must be a dealer to sell bikes.</h2>;
        </>
        )
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setPreview(URL.createObjectURL(file));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", title);
        formData.append("brand", brand);
        formData.append("model", model);
        formData.append("price", price);
        formData.append("year", year);
        formData.append("mileage", mileage);
        formData.append("description", description);
        formData.append("image", image);

        dispatch(addBike(formData));
        navigate("/");
        
    };

    return (
        <>
        <Navbar />
      
        <div className="sell-bike-container">
            <h2>Sell Your Bike</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                <input type="text" placeholder="Brand" value={brand} onChange={(e) => setBrand(e.target.value)} required />
                <input type="text" placeholder="Model" value={model} onChange={(e) => setModel(e.target.value)} required />
                <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required />
                <input type="number" placeholder="Year" value={year} onChange={(e) => setYear(e.target.value)} required />
                <input type="number" placeholder="Mileage" value={mileage} onChange={(e) => setMileage(e.target.value)} required />
                <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>

                <div className="image-upload">
                    <label>Upload Bike Image:</label>
                    <input type="file" accept="image/*" onChange={handleImageChange} />
                    {preview && <img src={preview} alt="Preview" className="image-preview" />}
                </div>

                <button type="submit">Submit</button>
            </form>
        </div>
        </>
    );
};

export default SellBike;
