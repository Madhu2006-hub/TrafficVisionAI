import { Link } from "react-router-dom";

function Sidebar() {
    return (
        <div
            style={{
                width: "220px",
                height: "100vh",
                backgroundColor: "#2c3e50",
                color: "white",
                paddingTop: "20px",
                position: "fixed",
                left: 0,
                top: 0,
            }}
        >
            <h2 style={{ textAlign: "center" }}>
                🚦 TrafficVision AI
            </h2>

            <hr />

            <ul style={{ listStyle: "none", padding: "20px" }}>
                <li style={{ marginBottom: "20px" }}>
                    <Link
                        to="/dashboard"
                        style={{ color: "white", textDecoration: "none" }}
                    >
                        🏠 Dashboard
                    </Link>
                </li>

                <li style={{ marginBottom: "20px" }}>
                    <Link
                        to="/traffic"
                        style={{ color: "white", textDecoration: "none" }}
                    >
                        🚦 Traffic Monitoring
                    </Link>
                </li>

                <li style={{ marginBottom: "20px" }}>
                    <Link
                        to="/profile"
                        style={{ color: "white", textDecoration: "none" }}
                    >
                        👤 Profile
                    </Link>
                </li>

                <li>
                    <Link
                        to="/"
                        style={{ color: "white", textDecoration: "none" }}
                    >
                        🚪 Logout
                    </Link>
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;