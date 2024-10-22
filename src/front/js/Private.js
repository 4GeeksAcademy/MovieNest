import React from "react";
import { useEffect } from "react";
import { useState } from "react";

export default function Private() {
  const [responseMessage, setResponseMessage] = useState();

  useEffect(() => {
    const fetchPrivateInfo = async () => {
      try {
        const sessionToken = sessionStorage.getItem("token");
        const localStorageToken = localStorage.getItem("token");

        if (sessionToken || localStorageToken) {
          const rawResponse = await fetch(
            `${process.env.BACKEND_URL}/api/private`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${localStorageToken ?? sessionToken}`,
              },
            }
          );
          const translatedResponse = await rawResponse.json();

          setResponseMessage(
            translatedResponse.message ?? translatedResponse.msg
          );
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchPrivateInfo();
  }, []);

  return (
    <div>
      <h1>Private</h1>
      <p>{responseMessage ? responseMessage : "No Token found"}</p>
    </div>
  );
}
