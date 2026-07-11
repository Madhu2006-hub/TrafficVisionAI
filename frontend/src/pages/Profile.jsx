import { useEffect, useState } from "react";

import {
    getProfile,
    updateProfile,
    changePassword
} from "../services/profileService";

function Profile() {

    const [profile, setProfile] = useState({
        name: "",
        email: "",
        role: ""
    });

    const [password, setPassword] = useState({
        old_password: "",
        new_password: ""
    });

    useEffect(() => {

        loadProfile();

    }, []);

    const loadProfile = async () => {

        try {

            const data = await getProfile();

            setProfile(data);

        }

        catch {

            alert("Unable to Load Profile");

        }

    };

    const handleProfileChange = (e) => {

        setProfile({
            ...profile,
            [e.target.name]: e.target.value
        });

    };

    const handlePasswordChange = (e) => {

        setPassword({
            ...password,
            [e.target.name]: e.target.value
        });

    };

    const updateUserProfile = async () => {

        try {

            await updateProfile({

                name: profile.name,
                email: profile.email

            });

            alert("Profile Updated Successfully");

        }

        catch (error) {

            alert(error.response?.data?.detail);

        }

    };

    const updateUserPassword = async () => {

        try {

            await changePassword(password);

            alert("Password Changed Successfully");

            setPassword({

                old_password: "",
                new_password: ""

            });

        }

        catch (error) {

            alert(error.response?.data?.detail);

        }

    };

    return (

        <div style={{ padding: "40px" }}>

            <h1>👤 My Profile</h1>

            <hr />

            <h3>Profile Information</h3>

            <input
                name="name"
                placeholder="Name"
                value={profile.name}
                onChange={handleProfileChange}
            />

            <br /><br />

            <input
                name="email"
                placeholder="Email"
                value={profile.email}
                onChange={handleProfileChange}
            />

            <br /><br />

            <input
                value={profile.role}
                readOnly
            />

            <br /><br />

            <button
                onClick={updateUserProfile}
            >
                Update Profile
            </button>

            <hr />

            <h3>Change Password</h3>

            <input
                type="password"
                name="old_password"
                placeholder="Old Password"
                value={password.old_password}
                onChange={handlePasswordChange}
            />

            <br /><br />

            <input
                type="password"
                name="new_password"
                placeholder="New Password"
                value={password.new_password}
                onChange={handlePasswordChange}
            />

            <br /><br />

            <button
                onClick={updateUserPassword}
            >
                Change Password
            </button>

        </div>

    );

}

export default Profile;