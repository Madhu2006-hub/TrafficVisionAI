import { Link, useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    const role = localStorage.getItem("role");

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("name");

        navigate("/");

    };

    return (

        <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow">

            <div className="container-fluid">

                <Link
                    className="navbar-brand fw-bold"
                    to="/home"
                >
                    🚦 TrafficVision AI
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div
                    className="collapse navbar-collapse"
                    id="navbarNav"
                >

                    <ul className="navbar-nav ms-auto">

                        <li className="nav-item">
                            <Link className="nav-link" to="/home">
                                🏠 Home
                            </Link>
                        </li>

                        {
                            role === "admin" &&
                            <li className="nav-item">
                                <Link className="nav-link" to="/dashboard">
                                    📊 Dashboard
                                </Link>
                            </li>
                        }

                        <li className="nav-item">
                            <Link className="nav-link" to="/traffic">
                                🚦 Traffic
                            </Link>
                        </li>

                        {
                            role === "admin" &&
                            <li className="nav-item">
                                <Link className="nav-link" to="/analytics">
                                    📈 Analytics
                                </Link>
                            </li>
                        }

                        <li className="nav-item">
                            <Link className="nav-link" to="/map">
                                🗺 Map
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/route">
                                🛣 Route Prediction
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/profile">
                                👤 Profile
                            </Link>
                        </li>

                        <li className="nav-item">
                            <button
                                className="btn btn-danger ms-3"
                                onClick={logout}
                            >
                                Logout
                            </button>
                        </li>

                    </ul>

                </div>

            </div>

        </nav>

    );

}

export default Navbar;