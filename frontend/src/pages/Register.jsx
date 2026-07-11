import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "operator"
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleRegister = async (e) => {

        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {

            await api.post("/auth/register", {
                name: formData.name,
                email: formData.email,
                password: formData.password,
                role: formData.role
            });

            alert("Registration Successful");

            navigate("/");

        } catch (error) {

            if (error.response) {
                alert(error.response.data.detail);
            } else {
                alert("Unable to connect to the backend.");
            }

        }

    };

    return (

        <div
            style={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#f0f4f8",
            }}
        >

            <div
                style={{
                    width: "380px",
                    padding: "30px",
                    backgroundColor: "white",
                    borderRadius: "10px",
                    boxShadow: "0px 0px 10px gray",
                    textAlign: "center",
                }}
            >

                <h1>🚦 TrafficVision AI</h1>

                <h3>Create Account</h3>

                <form onSubmit={handleRegister}>

                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        style={inputStyle}
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        style={inputStyle}
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        style={inputStyle}
                    />

                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        style={inputStyle}
                    />

                    <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        style={inputStyle}
                    >
                        <option value="admin">Admin</option>
                        <option value="operator">Traffic Operator</option>
                    </select>

                    <button
                        type="submit"
                        style={buttonStyle}
                    >
                        Register
                    </button>

                </form>

                <br />

                <Link to="/">
                    Already have an account? Login
                </Link>

            </div>

        </div>

    );

}

const inputStyle = {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    boxSizing: "border-box"
};

const buttonStyle = {
    width: "100%",
    padding: "10px",
    backgroundColor: "green",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
};

export default Register;