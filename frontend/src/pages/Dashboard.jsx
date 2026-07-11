import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDashboardStats } from "../services/dashboardService";

function Dashboard() {

    const navigate = useNavigate();

    const [stats, setStats] = useState({
        total_users: 0,
        traffic_locations: 0,
        high_congestion: 0,
        medium_congestion: 0,
        low_congestion: 0
    });

    useEffect(() => {

        loadDashboard();

    }, []);

    const loadDashboard = async () => {

        try {

            const data = await getDashboardStats();

            setStats(data);

        }

        catch {

            alert("Please Login Again");

            navigate("/");
        }

    };

    const logout = () => {

        localStorage.removeItem("token");

        navigate("/");
    };

    return (

        <div
            style={{
                padding: "40px",
                background: "#f4f6f9",
                minHeight: "100vh"
            }}
        >

            <h1>🚦 TrafficVision AI Dashboard</h1>

            <br />

            <div
                style={{
                    display: "flex",
                    gap: "20px",
                    flexWrap: "wrap"
                }}
            >

                <Card
                    title="Total Users"
                    value={stats.total_users}
                />

                <Card
                    title="Traffic Locations"
                    value={stats.traffic_locations}
                />

                <Card
                    title="High Congestion"
                    value={stats.high_congestion}
                />

                <Card
                    title="Medium Congestion"
                    value={stats.medium_congestion}
                />

                <Card
                    title="Low Congestion"
                    value={stats.low_congestion}
                />

            </div>

            <br />

            <button
                onClick={() => navigate("/traffic")}
                style={buttonStyle}
            >
                Traffic Management
            </button>

            <button
                onClick={() => navigate("/profile")}
                style={buttonStyle}
            >
                My Profile
            </button>

            <button
                onClick={logout}
                style={{
                    ...buttonStyle,
                    background: "red"
                }}
            >
                Logout
            </button>

        </div>

    );

}

function Card({ title, value }) {

    return (

        <div
            style={{
                width: "220px",
                background: "white",
                padding: "20px",
                borderRadius: "10px",
                boxShadow: "0px 0px 10px lightgray",
                textAlign: "center"
            }}
        >

            <h3>{title}</h3>

            <h1>{value}</h1>

        </div>

    );

}

const buttonStyle = {

    padding: "10px 20px",
    marginRight: "15px",
    background: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"

};

export default Dashboard;