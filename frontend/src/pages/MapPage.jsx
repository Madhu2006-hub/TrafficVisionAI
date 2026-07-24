import React, { useEffect, useState } from "react";

import {
    MapContainer,
    TileLayer,
    Marker,
    Popup
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

import L from "leaflet";


// Fix Leaflet default marker icon issue

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({

    iconRetinaUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",

    iconUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",

    shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png"

});


// Congestion Icons

const redIcon = new L.Icon({

    iconUrl:
        "https://maps.google.com/mapfiles/ms/icons/red-dot.png",

    iconSize: [32, 32]

});


const yellowIcon = new L.Icon({

    iconUrl:
        "https://maps.google.com/mapfiles/ms/icons/yellow-dot.png",

    iconSize: [32, 32]

});


const greenIcon = new L.Icon({

    iconUrl:
        "https://maps.google.com/mapfiles/ms/icons/green-dot.png",

    iconSize: [32, 32]

});



// Marker color selection

function getMarkerIcon(level) {


    if (level === "High") {

        return redIcon;

    }

    else if (level === "Medium") {

        return yellowIcon;

    }

    else {

        return greenIcon;

    }

}





function MapPage() {


    const [trafficData, setTrafficData] = useState([]);

    const [search, setSearch] = useState("");

    const [filter, setFilter] = useState("All");





    // Fetch traffic data with auto refresh

    useEffect(() => {


        const fetchTrafficData = () => {


            fetch("http://localhost:8000/traffic")


                .then(response => response.json())


                .then(data => {


                    console.log(
                        "Updated Traffic Data:",
                        data
                    );


                    setTrafficData(data);


                })


                .catch(error => {


                    console.log(
                        "Error fetching traffic data:",
                        error
                    );


                });


        };



        fetchTrafficData();



        const interval = setInterval(

            fetchTrafficData,

            10000

        );



        return () => clearInterval(interval);



    }, []);






    // Search + filter logic

    const filteredTraffic = trafficData.filter((traffic) => {


        const matchesSearch =

            traffic.location
                .toString()
                .toLowerCase()
                .includes(
                    search.toLowerCase()
                );



        const matchesFilter =

            filter === "All"

            ||

            traffic.congestion_level === filter;



        return matchesSearch && matchesFilter;


    });






    // Statistics

    const totalJunctions = filteredTraffic.length;



    const totalVehicles = filteredTraffic.reduce(

        (sum, traffic) =>

            sum + Number(traffic.vehicle_count || 0),

        0

    );







    return (


        <div>


            <h2>
                Traffic Congestion Map
            </h2>





            {/* Search and Filter */}

            <div style={{ marginBottom: "15px" }}>


                <input

                    type="text"

                    placeholder="Search Junction"

                    value={search}

                    onChange={(e) =>
                        setSearch(e.target.value)
                    }


                    style={{

                        padding: "8px",

                        marginRight: "10px"

                    }}

                />





                <button onClick={() => setFilter("All")}>
                    All
                </button>


                <button onClick={() => setFilter("High")}>
                    High
                </button>


                <button onClick={() => setFilter("Medium")}>
                    Medium
                </button>


                <button onClick={() => setFilter("Low")}>
                    Low
                </button>



            </div>







            {/* Statistics */}

            <div>


                <h4>
                    Total Junctions: {totalJunctions}
                </h4>


                <h4>
                    Total Vehicles: {totalVehicles}
                </h4>


            </div>








            <MapContainer


                center={[

                    16.8148,

                    81.5275

                ]}


                zoom={14}


                style={{

                    height: "600px",

                    width: "100%"

                }}



            >





                <TileLayer


                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"


                    attribution="&copy; OpenStreetMap contributors"


                />








                {/* Legend */}


                <div

                    style={{

                        position: "absolute",

                        top: "20px",

                        right: "20px",

                        background: "white",

                        padding: "15px",

                        zIndex: 1000,

                        borderRadius: "8px"

                    }}

                >


                    <h4>
                        Traffic Level
                    </h4>


                    <p>🔴 High</p>

                    <p>🟡 Medium</p>

                    <p>🟢 Low</p>


                </div>









                {


                    filteredTraffic


                        .filter(

                            traffic =>

                                traffic.latitude !== null &&

                                traffic.longitude !== null &&

                                traffic.latitude !== undefined &&

                                traffic.longitude !== undefined &&

                                !isNaN(Number(traffic.latitude)) &&

                                !isNaN(Number(traffic.longitude)) &&

                                Number(traffic.latitude) !== 0 &&

                                Number(traffic.longitude) !== 0

                        )



                        .map((traffic, index) => (




                            <Marker


                                key={index}


                                position={[

                                    Number(traffic.latitude),

                                    Number(traffic.longitude)

                                ]}



                                icon={

                                    getMarkerIcon(
                                        traffic.congestion_level
                                    )

                                }


                            >




                                <Popup>



                                    <h3>

                                        Location:

                                        {" "}

                                        {traffic.location}

                                    </h3>




                                    <p>

                                        Vehicles:

                                        {" "}

                                        {traffic.vehicle_count}

                                    </p>




                                    <p>

                                        Congestion:

                                        {" "}

                                        {traffic.congestion_level}

                                    </p>




                                    <p>

                                        Road Status:

                                        {" "}

                                        {traffic.road_status}

                                    </p>



                                </Popup>




                            </Marker>



                        ))


                }





            </MapContainer>




        </div>


    );


}


export default MapPage;