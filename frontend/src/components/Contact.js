import React, { useState } from "react";
import Navbar from "../components/Navbar";
import API from "../utils/axiosInstance";
import "./contact.css"; // Contact page styling

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post("/api/contact", formData);
            alert("Your message has been sent!");
            setFormData({ name: "", email: "", message: "" });
        } catch (error) {
            alert("Failed to send message. Try again!");
        }
        
        
    };

    return (
        <div>
            <Navbar />
            <div className="contact-container">
                <h2>Contact Us</h2>
                <p>Have any questions? Feel free to reach out!</p>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        name="name" 
                        placeholder="Your Name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        required 
                    />
                    <input 
                        type="email" 
                        name="email" 
                        placeholder="Your Email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        required 
                    />
                    <textarea 
                        name="message" 
                        placeholder="Your Message" 
                        rows="5"
                        value={formData.message} 
                        onChange={handleChange} 
                        required 
                    />
                    <button type="submit" className="contact-btn">Send Message</button>
                </form>
            </div>
        </div>
    );
};

export default Contact;
