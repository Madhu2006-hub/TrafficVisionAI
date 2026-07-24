import { useNavigate } from "react-router-dom";

function OperatorDashboard() {

    const name = localStorage.getItem("name");

    const navigate = useNavigate();


    return (

        <div
            style={{
                minHeight: "100vh",
                backgroundColor: "#f0f4f8",
                padding: "30px"
            }}
        >

            <h1>
                🚦 TrafficVision AI
            </h1>


            <h2>
                Welcome Operator {name}
            </h2>



            <div
                style={{
                    display: "flex",
                    gap: "20px",
                    marginTop: "30px"
                }}
            >


                <div
                    style={{
                        backgroundColor: "white",
                        padding: "20px",
                        borderRadius: "10px",
                        boxShadow: "0px 0px 10px gray",
                        width: "250px"
                    }}
                >

                    <h3>
                        Traffic Records
                    </h3>

                    <p>
                        View and update traffic data records.
                    </p>


                    <button
                        onClick={() => navigate("/traffic-records")}
                        style={{
                            padding: "10px",
                            backgroundColor: "#007bff",
                            color: "white",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer"
                        }}
                    >
                        View Records
                    </button>


                </div>



                <div
                    style={{
                        backgroundColor: "white",
                        padding: "20px",
                        borderRadius: "10px",
                        boxShadow: "0px 0px 10px gray",
                        width: "250px"
                    }}
                >

                    <h3>
                        Junction Monitoring
                    </h3>

                    <p>
                        Monitor current junction traffic status.
                    </p>

                </div>




                <div
                    style={{
                        backgroundColor: "white",
                        padding: "20px",
                        borderRadius: "10px",
                        boxShadow: "0px 0px 10px gray",
                        width: "250px"
                    }}
                >

                    <h3>
                        Traffic Analysis
                    </h3>

                    <p>
                        Analyze historical traffic patterns.
                    </p>

                </div>


            </div>


        </div>

    );

}


export default OperatorDashboard;