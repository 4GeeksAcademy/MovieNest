import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";

const ConfirmAccount = () => {
    const { token } = useParams();
    const [message, setMessage] = useState("");

    useEffect(() => {
        const confirmAccount = async () => {
            try {
                const response = await fetch(`${process.env.BACKEND_URL}/api/confirm/${token}`);
                const data = await response.json();
                if (response.ok) {
                    setMessage("Your account has been activated!");
                } else {
                    setMessage(data.message);
                }
            } catch (error) {
                setMessage("Error with the activation process.");
            }
        };

        confirmAccount();
    }, [token]);

    return (
        <div>
            <Navbar />
            <div className="container mt-5">
                <h3>{message}</h3>
            </div>
        </div>
    );
};

export default ConfirmAccount;
