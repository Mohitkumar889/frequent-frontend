"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

function Project() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://frequent-backend.vercel.app/api/userList"
        );
        const result = response.data;
        console.log(result, "result");

        if (result.code === 1) {
          setUsers(result.data.userList);
        } else {
          setError(result.message);
        }
      } catch (error) {
        setError("Error fetching data");
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div style={{ textAlign: "center" }}>{error}</div>;
  }

  return (
    <div>
      <Link href="/" className="userListButton">
        Register Page
      </Link>
      <h1 style={{ textAlign: "center" }}>User List</h1>
      {users.length > 0 ? (
        <table className="user-table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Country</th>
              <th>State</th>
              <th>City</th>
              <th>Gender</th>
              <th>Age</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.countryDetail.name}</td>
                <td>{user.stateDetail.name}</td>
                <td>{user.cityDetail.name}</td>
                <td>{user.gender === "1" ? "Male" : "Female"}</td>
                <td>{user.age}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div style={{ textAlign: "center" }}>Loading...</div>
      )}
    </div>
  );
}

export default Project;
