import { useEffect, useState } from "react";
import Layout from "../components/Layout";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    PointElement,
    LineElement,
    Tooltip,
    Legend
} from "chart.js";

import {
    Bar,
    Pie,
    Line
} from "react-chartjs-2";


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    PointElement,
    LineElement,
    Tooltip,
    Legend
);



function Analytics() {


    const [data, setData] = useState(null);

    const [trendData, setTrendData] = useState([]);

    const [prediction, setPrediction] = useState(null);





    useEffect(() => {

        loadAnalytics();

        loadTrend();

        getPrediction();

    }, []);






    const loadAnalytics = async () => {


        try {


            const response =
                await fetch(
                    "http://localhost:8000/dashboard/analytics"
                );


            const result =
                await response.json();


            console.log(
                "Analytics Data:",
                result
            );


            setData(result);


        }
        catch (error) {

            console.log(error);

        }

    };








    const loadTrend = async () => {


        try {


            const response =
                await fetch(
                    "http://localhost:8000/traffic/trend"
                );


            const result =
                await response.json();


            console.log(
                "Trend Data:",
                result
            );


            setTrendData(
                Array.isArray(result)
                    ? result
                    : []
            );


        }

        catch (error) {

            console.log(error);

        }


    };









    const getPrediction = async () => {


        try {


            const response =
                await fetch(

                    "http://localhost:8000/traffic/predict",

                    {

                        method: "POST",

                        headers: {

                            "Content-Type":
                                "application/json"

                        },


                        body: JSON.stringify({

                            junction: 1,

                            hour: new Date().getHours(),

                            day: new Date().getDate(),

                            month: new Date().getMonth() + 1,

                            weekday: new Date().getDay()

                        })

                    }

                );



            const result =
                await response.json();



            setPrediction(result);



        }

        catch (error) {

            console.log(error);

        }


    };








    if (!data) {

        return (

            <Layout>

                <h2>
                    Loading Analytics...
                </h2>

            </Layout>

        );

    }








    const barData = {

        labels: [
            "High",
            "Medium",
            "Low"
        ],


        datasets: [

            {

                label: "Congestion Count",

                data: [

                    data.high || 0,

                    data.medium || 0,

                    data.low || 0

                ]

            }

        ]

    };







    const pieData = {


        labels: [
            "High",
            "Medium",
            "Low"
        ],


        datasets: [

            {

                data: [

                    data.high || 0,

                    data.medium || 0,

                    data.low || 0

                ]

            }

        ]


    };








    const lineData = {


        labels:

            trendData.map(

                item => item.time

            ),


        datasets: [

            {

                label: "Vehicle Trend",

                data:

                    trendData.map(

                        item => item.vehicles

                    )

            }

        ]


    };






    return (

        <Layout>


            <h1>

                📊 Traffic Analytics Dashboard

            </h1>





            <div className="row mt-4">


                <Card
                    title="Total Records"
                    value={data.total_records}
                />


                <Card
                    title="Total Vehicles"
                    value={data.total_vehicles}
                />


                <Card
                    title="High"
                    value={data.high}
                />


                <Card
                    title="Medium"
                    value={data.medium}
                />


                <Card
                    title="Low"
                    value={data.low}
                />



            </div>







            <div className="row mt-4">


                <div className="col-md-6">

                    <div className="card p-3 shadow">

                        <h4>
                            Bar Chart
                        </h4>

                        <Bar data={barData} />


                    </div>


                </div>





                <div className="col-md-6">

                    <div className="card p-3 shadow">


                        <h4>
                            Pie Chart
                        </h4>


                        <Pie data={pieData} />


                    </div>


                </div>


            </div>







            <div className="card p-3 shadow mt-4">


                <h4>
                    📈 Traffic Trend
                </h4>


                <Line data={lineData} />


            </div>








            <div className="card shadow mt-4">


                <div className="card-header">

                    <h4>
                        🤖 AI Prediction
                    </h4>


                </div>


                <div className="card-body">


                    {

                        prediction ?

                            <>

                                <h5>

                                    Predicted Vehicles:
                                    {" "}
                                    {prediction.predicted_vehicle_count}

                                </h5>


                                <h5>

                                    Congestion:
                                    {" "}
                                    {prediction.congestion_level}

                                </h5>


                            </>


                            :

                            <p>
                                Loading...
                            </p>


                    }


                </div>


            </div>








            <div className="card shadow mt-4">


                <div className="card-header">

                    <h4>
                        Traffic By Location
                    </h4>

                </div>




                <table className="table">


                    <thead>

                        <tr>

                            <th>
                                Location
                            </th>

                            <th>
                                Vehicles
                            </th>

                        </tr>

                    </thead>



                    <tbody>


                        {

                            (data.locations || []).map(

                                (item, index) => (


                                    <tr key={index}>


                                        <td>
                                            {item.location}
                                        </td>


                                        <td>
                                            {item.vehicles}
                                        </td>


                                    </tr>


                                )


                            )


                        }


                    </tbody>


                </table>



            </div>






        </Layout>

    );


}








function Card({ title, value }) {


    return (

        <div className="col-md-2">


            <div className="card shadow p-3 text-center">


                <h5>
                    {title}
                </h5>


                <h2>
                    {value || 0}
                </h2>


            </div>


        </div>


    );


}



export default Analytics;