import { useEffect, useState } from "react";
import axios from "axios";


function TrafficRecords() {

    const [records, setRecords] = useState([]);

    const [editRecord, setEditRecord] = useState(null);



    const fetchTraffic = async () => {

        try {

            const response = await axios.get(
                "http://127.0.0.1:8000/traffic/"
            );

            setRecords(response.data);

        }
        catch (error) {

            console.log(error);

        }

    };



    useEffect(() => {

        fetchTraffic();

    }, []);




    const deleteRecord = async (id) => {

        try {

            await axios.delete(
                `http://127.0.0.1:8000/traffic/${id}`
            );


            alert("Record Deleted");


            fetchTraffic();

        }
        catch (error) {

            console.log(error);

        }

    };




    const updateRecord = async () => {

        try {

            await axios.put(
                `http://127.0.0.1:8000/traffic/${editRecord.id}`,
                editRecord
            );


            alert("Record Updated");


            setEditRecord(null);


            fetchTraffic();

        }
        catch (error) {

            console.log(error);

        }

    };




    return (

        <div
            style={{
                padding: "30px"
            }}
        >

            <h1>
                🚦 Traffic Records
            </h1>



            {
                editRecord &&

                <div
                    style={{
                        background: "#eee",
                        padding: "20px",
                        marginBottom: "20px"
                    }}
                >

                    <h3>
                        Edit Traffic Record
                    </h3>


                    <input
                        value={editRecord.location}
                        onChange={(e) =>
                            setEditRecord({
                                ...editRecord,
                                location: e.target.value
                            })
                        }
                    />


                    <input
                        value={editRecord.vehicle_count}
                        onChange={(e) =>
                            setEditRecord({
                                ...editRecord,
                                vehicle_count: e.target.value
                            })
                        }
                    />


                    <select
                        value={editRecord.congestion_level}
                        onChange={(e) =>
                            setEditRecord({
                                ...editRecord,
                                congestion_level: e.target.value
                            })
                        }
                    >

                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>

                    </select>



                    <select
                        value={editRecord.road_status}
                        onChange={(e) =>
                            setEditRecord({
                                ...editRecord,
                                road_status: e.target.value
                            })
                        }
                    >

                        <option>Normal</option>
                        <option>Busy</option>
                        <option>Closed</option>

                    </select>



                    <button
                        onClick={updateRecord}
                    >
                        Save
                    </button>


                </div>
            }



            <table
                border="1"
                width="100%"
            >

                <thead>

                    <tr>

                        <th>ID</th>
                        <th>Location</th>
                        <th>Vehicles</th>
                        <th>Congestion</th>
                        <th>Status</th>
                        <th>Actions</th>

                    </tr>

                </thead>



                <tbody>


                    {
                        records.map((record) => (


                            <tr key={record.id}>


                                <td>
                                    {record.id}
                                </td>


                                <td>
                                    {record.location}
                                </td>


                                <td>
                                    {record.vehicle_count}
                                </td>


                                <td>
                                    {record.congestion_level}
                                </td>


                                <td>
                                    {record.road_status}
                                </td>


                                <td>


                                    <button
                                        onClick={() =>
                                            setEditRecord(record)
                                        }
                                    >
                                        ✏️ Edit
                                    </button>



                                    <button
                                        onClick={() =>
                                            deleteRecord(record.id)
                                        }
                                    >
                                        🗑 Delete
                                    </button>


                                </td>


                            </tr>


                        ))
                    }


                </tbody>


            </table>


        </div>

    );

}


export default TrafficRecords;