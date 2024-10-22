import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Home</h1>
      <p>This is my very amazing website, you can find an access route below</p>
      <button
        onClick={() => {
          navigate("/login");
        }}
      >
        Click to Login
      </button>
      <a href="/signup">Dont have an account yet? Signup now</a>
    </div>
  );
}
