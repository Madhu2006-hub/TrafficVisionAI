import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {

        try {

            const response = await loginUser({
                email,
                password
            });

            localStorage.setItem(
                "token",
                response.access_token
            );

            alert("Login Successful");

            navigate("/dashboard");

        }

        catch (error) {

            alert(
                error.response?.data?.detail ||
                "Login Failed"
            );

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
                    width: "460px",
                    padding: "30px",
                    backgroundColor: "white",
                    borderRadius: "10px",
                    boxShadow: "0px 0px 10px gray",
                    textAlign: "center",
                }}
            >

                <h1
                    style={{
                        fontSize: "20px",
                        fontWeight: "600",
                        lineHeight: "1",
                    }}
                >
                    🚦 TrafficVision AI
                </h1>
                <h3>Login</h3>

                <input
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                        width: "100%",
                        padding: "10px",
                        marginBottom: "15px",
                    }}
                />

                <input
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{
                        width: "100%",
                        padding: "10px",
                        marginBottom: "15px",
                    }}
                />

                <button
                    onClick={handleLogin}
                    style={{
                        width: "100%",
                        padding: "10px",
                        backgroundColor: "#007bff",
                        color: "white",
                        border: "none",
                        cursor: "pointer",
                    }}
                >
                    Login
                </button>

                <br /><br />

                <Link to="/register">
                    Don't have an account? Register
                </Link>

            </div>

        </div>

    );
}

export default Login;