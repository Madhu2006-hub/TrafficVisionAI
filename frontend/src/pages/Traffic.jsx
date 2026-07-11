import { useEffect, useState } from "react";

import {
    getAllTraffic,
    addTraffic,
    updateTraffic,
    deleteTraffic
} from "../services/trafficService";

function Traffic() {

    const [trafficList, setTrafficList] = useState([]);

    const [editingId, setEditingId] = useState(null);

    const [form, setForm] = useState({
        location: "",
        vehicle_count: "",
        congestion_level: "Low",
        road_status: "Open"
    });

    useEffect(() => {
        loadTraffic();
    }, []);

    const loadTraffic = async () => {

        try {

            const data = await getAllTraffic();

            setTrafficList(data);

        } catch {

            alert("Failed to Load Traffic Data");

        }

    };

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async () => {

        try {

            if (editingId === null) {

                await addTraffic(form);

                alert("Traffic Added Successfully");

            }

            else {

                await updateTraffic(
                    editingId,
                    form
                );

                alert("Traffic Updated Successfully");

                setEditingId(null);

            }

            setForm({
                location: "",
                vehicle_count: "",
                congestion_level: "Low",
                road_status: "Open"
            });

            loadTraffic();

        }

        catch (error) {

            alert(
                error.response?.data?.detail ||
                "Something Went Wrong"
            );

        }

    };

    const handleEdit = (traffic) => {

        setEditingId(traffic.id);

        setForm({
            location: traffic.location,
            vehicle_count: traffic.vehicle_count,
            congestion_level: traffic.congestion_level,
            road_status: traffic.road_status
        });

    };

    const handleDelete = async (id) => {

        if (!window.confirm("Delete this traffic record?"))
            return;

        await deleteTraffic(id);

        loadTraffic();

    };

    return (

        <div style={{ padding: "40px" }}>

            <h1>🚦 Traffic Management</h1>

            <br />

            <input
                name="location"
                placeholder="Location"
                value={form.location}
                onChange={handleChange}
            />

            <br /><br />

            <input
                name="vehicle_count"
                type="number"
                placeholder="Vehicle Count"
                value={form.vehicle_count}
                onChange={handleChange}
            />

            <br /><br />

            <select
                name="congestion_level"
                value={form.congestion_level}
                onChange={handleChange}
            >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
            </select>

            <br /><br />

            <select
                name="road_status"
                value={form.road_status}
                onChange={handleChange}
            >
                <option>Open</option>
                <option>Closed</option>
                <option>Under Maintenance</option>
            </select>

            <br /><br />

            <button onClick={handleSubmit}>

                {editingId ? "Update Traffic" : "Add Traffic"}

            </button>

            <hr />

            <table
                border="1"
                cellPadding="10"
                style={{
                    width: "100%",
                    textAlign: "center"
                }}
            >

                <thead>

                    <tr>

                        <th>ID</th>
                        <th>Location</th>
                        <th>Vehicle Count</th>
                        <th>Congestion</th>
                        <th>Road Status</th>
                        <th>Actions</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        trafficList.map((item) => (

                            <tr key={item.id}>

                                <td>{item.id}</td>

                                <td>{item.location}</td>

                                <td>{item.vehicle_count}</td>

                                <td>{item.congestion_level}</td>

                                <td>{item.road_status}</td>

                                <td>

                                    <button
                                        onClick={() => handleEdit(item)}
                                    >
                                        Edit
                                    </button>

                                    {" "}

                                    <button
                                        onClick={() => handleDelete(item.id)}
                                    >
                                        Delete
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

export default Traffic;