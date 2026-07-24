import { useState } from "react";
import Layout from "../components/Layout";

function RoutePrediction() {

    const [result, setResult] = useState(null);

    const findBestRoute = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await fetch(
                "http://127.0.0.1:8000/route/best-route",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            setResult(data);

        } catch {

            alert("Unable to fetch best route");

        }

    };

    return (

        <Layout>

            <h1>🛣 Best Route Prediction</h1>

            <p className="text-muted">
                Find the least congested route based on current traffic conditions.
            </p>

            <hr />

            <button
                className="btn btn-primary"
                onClick={findBestRoute}
            >
                Find Best Route
            </button>

            <br /><br />

            {
                result &&

                <div className="card shadow p-4 mt-4">

                    <h3 className="text-success">
                        ✅ Best Route Found
                    </h3>

                    <hr />

                    <p>
                        <strong>📍 Route :</strong> {result.best_route}
                    </p>

                    <p>
                        <strong>🚗 Vehicles :</strong> {result.traffic}
                    </p>

                    <p>
                        <strong>🚦 Congestion :</strong> {result.congestion}
                    </p>

                    <p>
                        <strong>🛣 Road Status :</strong> {result.road_status}
                    </p>

                </div>

            }

        </Layout>

    );

}

export default RoutePrediction;