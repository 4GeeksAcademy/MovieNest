import React from "react";
import { useState } from "react";

export default function Login() {
  const [inputValues, setInputValues] = useState({ email: "", password: "" });

  const onLogin = async () => {
    console.log("trying to get your info");
    console.log(process.env.BACKEND_URL);
    
    try {
      if (Object.values(inputValues).length) {
        const rawResponse = await fetch(`${process.env.BACKEND_URL}/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(inputValues),
        });
        const translatedResponse = await rawResponse.json();

        sessionStorage.setItem("token", translatedResponse.access_token);
        localStorage.setItem("token", translatedResponse.access_token);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Login</h1>

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
      <button onClick={onLogin}>Click to Login!</button>
    </div>
  );
}
