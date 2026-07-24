import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";

function Home() {

    const navigate = useNavigate();

    return (

        <Layout>

            <div className="text-center">

                <h1
                    className="display-4 fw-bold text-primary"
                >
                    🚦 TrafficVision AI
                </h1>

                <p
                    className="lead mt-3"
                >
                    AI Powered Smart Traffic Prediction &
                    Congestion Management System
                </p>

                <br />

                <button
                    className="btn btn-primary btn-lg me-3"
                    onClick={() => navigate("/dashboard")}
                >
                    Dashboard
                </button>

                <button
                    className="btn btn-success btn-lg"
                    onClick={() => navigate("/traffic")}
                >
                    Traffic
                </button>
                <button
                    onClick={() => {
                        window.location.href = "/users";
                    }}
                >
                    Manage Users
                </button>
                <hr className="my-5" />

                <div className="row">

                    <div className="col-md-3">

                        <div className="card shadow p-3">

                            <h2>🚦</h2>

                            <h4>Traffic Monitoring</h4>

                            <p>
                                View and monitor live traffic records.
                            </p>

                        </div>

                    </div>

                    <div className="col-md-3">

                        <div className="card shadow p-3">

                            <h2>📈</h2>

                            <h4>Prediction</h4>

                            <p>
                                Predict congestion using Machine Learning.
                            </p>

                        </div>

                    </div>

                    <div className="col-md-3">

                        <div className="card shadow p-3">

                            <h2>🛣</h2>

                            <h4>Best Route</h4>

                            <p>
                                Find the least congested route.
                            </p>

                        </div>

                    </div>

                    <div className="col-md-3">

                        <div className="card shadow p-3">

                            <h2>👥</h2>

                            <h4>Role Based Access</h4>

                            <p>
                                Separate Admin and Operator modules.
                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </Layout>

    );

}

export default Home;