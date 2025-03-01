import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../redux/actions/userActions';
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./auth.css"; // Shared styling for login & signup

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isDealer, setIsDealer] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSignup = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        dispatch(registerUser({ name, email, password, isDealer }));
        navigate('/');
    };

    return (
        <div>
            <Navbar />
            <div className="auth-container">
                <h2>Sign Up</h2>
                <form onSubmit={handleSignup}>
                    <input 
                        type="text" 
                        placeholder="Full Name" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        required 
                    />
                    <input 
                        type="email" 
                        placeholder="Email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                    <input 
                        type="password" 
                        placeholder="Confirm Password" 
                        value={confirmPassword} 
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                        required 
                    />
                    <div className="checkbox-container">
                        <input 
                            type="checkbox" 
                            id="isDealer" 
                            checked={isDealer} 
                            onChange={() => setIsDealer(!isDealer)} 
                        />
                        <label htmlFor="isDealer">Register as a Dealer</label>
                    </div>
                    <button type="submit" className="auth-btn">Sign Up</button>
                </form>
                <p>Already have an account? <a href="/login">Login</a></p>
            </div>
        </div>
    );
};

export default Signup;
