import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";


export const ChangePassword = () => {
    const [searchParams] = useSearchParams();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const [error, setErrMsg] = useState("");
    const navigate = useNavigate();


    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    async function handleSubmit(event) {
        event.preventDefault();

        if (password !== confirmPassword) {
            setErrMsg("Passwords do not match.");
            return;
        }
        try {
            const response = await fetch(`${process.env.BACKEND_URL}/api/change-password`, {
                method: "PUT",
                headers: {
                    'Content-Type': "application/json",
                    'Authorization': "Bearer " + sessionStorage.getItem("token")
                },
                body: JSON.stringify({
                    password: password,
                })
            });
            if (response.ok) {
                alert("Password successfully changed.");
                navigate('/');
            } else {
                const data = await response.json();
                setErrMsg(data.message || "Something went wrong.");
            }
        } catch (error) {
            setErrMsg(error.message);
        }
    }

    // terniary if no token show email, if token show 2 password inputs. set up an error
    return (
        <div className="container mt-5 forgot-password-div auth">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow">
                        <div className="card-body">
                            <h2 className="text-center mb-4">Change Password</h2>
                            <form onSubmit={handleSubmit}>

                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <div className="input-group">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            className="form-control"
                                            id="password"
                                            value={password}
                                            onChange={(e) => {
                                                setPassword(e.target.value)
                                                setErrMsg("");
                                            }}
                                            required
                                        />
                                        <i
                                            className={`position-absolute top-50 end-0 translate-middle-y me-3 text-muted fa-regular ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                                            style={{ cursor: "pointer", pointerEvents: "auto", zIndex: 10 }}
                                            onClick={togglePasswordVisibility}
                                        />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                                    <div className="input-group">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            className="form-control"
                                            id="confirmPassword"
                                            value={confirmPassword}
                                            onChange={(e) => {
                                                setConfirmPassword(e.target.value)
                                                setErrMsg("");
                                            }}
                                            required
                                        />
                                        <i
                                            className={`position-absolute top-50 end-0 translate-middle-y me-3 text-muted fa-regular ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                                            style={{ cursor: "pointer", pointerEvents: "auto", zIndex: 10 }}
                                            onClick={togglePasswordVisibility}
                                        />
                                    </div>
                                </div>


                                {error &&
                                    <div className="alert alert-danger" role="alert">
                                        {error}
                                    </div>
                                }

                                <button type="submit" className="btn btn-dark w-100">Submit</button>
                                <Link className="" to="/signup"><p className='text-center mt-4'>Click here to sign up</p></Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}