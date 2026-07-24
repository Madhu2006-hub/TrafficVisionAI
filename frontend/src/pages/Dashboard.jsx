import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDashboardStats } from "../services/dashboardService";
import Layout from "../components/Layout";


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

        catch (error) {

            alert("Please Login Again");

            navigate("/");

        }

    };



    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("name");

        navigate("/");

    };



    return (

        <Layout>

            <div>

                <h1 className="mb-4">
                    🚦 TrafficVision AI Dashboard
                </h1>



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
                    🚦 Traffic Management
                </button>
                <button
                    onClick={() => {
                        console.log("Traffic button clicked");
                        navigate("/traffic-records");
                    }}
                    style={buttonStyle}
                >
                    🚦 View Traffic Records
                </button>


                <button
                    onClick={() => navigate("/users")}
                    style={buttonStyle}
                >
                    👥 User Management
                </button>



                <button
                    onClick={() => navigate("/profile")}
                    style={buttonStyle}
                >
                    👤 My Profile
                </button>



                <button
                    onClick={logout}
                    style={{
                        ...buttonStyle,
                        background: "#dc3545"
                    }}
                >
                    🚪 Logout
                </button>


            </div>


        </Layout>

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
    marginBottom: "15px",
    background: "#0d6efd",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"

};



export default Dashboard;