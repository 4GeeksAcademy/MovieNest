import React from "react";
import { useState } from "react";

const RegisterUser = () => {
  const [inputValues, setInputValues] = useState({ email: "", password: "" });

  return (
    <div>
      <h1>Sign Up</h1>

      <input
        type="email"
        onChange={(event) => {
          const { value } = event.target;
          setInputValues((prevState) => ({
            ...prevState,
            email: value,
          }));
        }}
        value={inputValues.email}
        placeholder="email"
      />
      <input
        type="password"
        onChange={(event) => {
          const { value } = event.target;
          setInputValues((prevState) => ({
            ...prevState,
            password: value,
          }));
        }}
        value={inputValues.password}
        placeholder="password"
      />
      <button>Click to Login!</button>
    </div>
  );
};

export default RegisterUser;
