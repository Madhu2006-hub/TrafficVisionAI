import { useEffect, useState } from "react";
import axios from "axios";


function UserManagement() {

    const [users, setUsers] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("operator");

    // Fetch users
    const fetchUsers = async () => {

        try {

            const response = await axios.get(
                "http://127.0.0.1:8000/users/"
            );

            setUsers(response.data);

        }
        catch (error) {

            console.log(error);

        }

    };


    useEffect(() => {

        fetchUsers();

    }, []);
    const addUser = async () => {

        try {

            await axios.post(
                "http://127.0.0.1:8000/users/",
                null,
                {
                    params: {
                        name,
                        email,
                        password,
                        role
                    }
                }
            );


            alert("User Added");

            fetchUsers();

            setName("");
            setEmail("");
            setPassword("");

        }
        catch (error) {

            console.log(error);

        }

    };


    // Delete user
    const deleteUser = async (id) => {

        try {

            await axios.delete(
                `http://127.0.0.1:8000/users/${id}`
            );

            alert("User Deleted");

            fetchUsers();

        }
        catch (error) {

            console.log(error);

        }

    };



    return (

        <div
            style={{
                padding: "30px",
                backgroundColor: "#f0f4f8",
                minHeight: "100vh"
            }}
        >

            <h1>
                👥 User Management
            </h1>


            <table
                border="1"
                style={{
                    width: "100%",
                    backgroundColor: "white",
                    marginTop: "20px"
                }}
            >
                <div>

                    <h2>Add User</h2>

                    <input
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />


                    <input
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />


                    <input
                        placeholder="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />


                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    >

                        <option value="operator">
                            Operator
                        </option>

                        <option value="admin">
                            Admin
                        </option>

                    </select>


                    <button onClick={addUser}>
                        Add User
                    </button>


                </div>

                <thead>

                    <tr>

                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Action</th>

                    </tr>

                </thead>


                <tbody>

                    {
                        users.map((user) => (

                            <tr key={user.id}>

                                <td>{user.id}</td>

                                <td>{user.name}</td>

                                <td>{user.email}</td>

                                <td>{user.role}</td>

                                <td>

                                    <button
                                        onClick={() =>
                                            deleteUser(user.id)
                                        }
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


export default UserManagement;