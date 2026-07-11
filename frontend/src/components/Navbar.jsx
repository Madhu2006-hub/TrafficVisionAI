import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav
            style={{
                backgroundColor: "#1976d2",
                color: "white",
                padding: "15px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
            }}
        >
            <h2>🚦 TrafficVision AI</h2>

            <div>
                <Link
                    to="/dashboard"
                    style={{ color: "white", marginRight: "20px", textDecoration: "none" }}
                >
                    Dashboard
                </Link>

                <Link
                    to="/traffic"
                    style={{ color: "white", marginRight: "20px", textDecoration: "none" }}
                >
                    Traffic
                </Link>

                <Link
                    to="/profile"
                    style={{ color: "white", marginRight: "20px", textDecoration: "none" }}
                >
                    Profile
                </Link>

                <Link
                    to="/"
                    style={{ color: "white", textDecoration: "none" }}
                >
                    Logout
                </Link>
            </div>
        </nav>
    );
}

export default Navbar;