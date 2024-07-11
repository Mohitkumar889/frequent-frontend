"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer, Zoom } from "react-toastify";

function RegistrationForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    state: "",
    city: "",
    gender: "",
    dateOfBirth: "",
    age: "",
  });
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    axios
      .get("https://frequent-backend.vercel.app/api/getCountry")
      .then((response) => {
        setCountries(response.data.data.coutries);
      })
      .catch((error) => {
        toast.error(`Error fetching countries: ${error.message}`);
      });
  }, []);

  useEffect(() => {
    if (formData.country) {
      axios
        .get(
          `https://frequent-backend.vercel.app/api/getState/${formData.country}`
        )
        .then((response) => {
          setStates(response.data.data.states);
        })
        .catch((error) => {
          toast.error(`Error fetching states: ${error.message}`);
        });
    }
  }, [formData.country]);

  // console.log(formData, "formData");
  useEffect(() => {
    if (formData.state) {
      axios
        .get(
          `https://frequent-backend.vercel.app/api/getCity/${formData.state}`
        )
        .then((response) => {
          setCities(response.data.data.cities);
        })
        .catch((error) => {
          toast.error(`Error fetching cities: ${error.message}`);
        });
    }
  }, [formData.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "dateOfBirth") {
      const age = calculateAge(value);
      setFormData({
        ...formData,
        dateOfBirth: value,
        age: age,
      });
    }
  };

  const calculateAge = (dateOfBirth) => {
    const birthDate = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  const validateForm = () => {
    const {
      firstName,
      lastName,
      email,
      country,
      state,
      city,
      gender,
      dateOfBirth,
      age,
    } = formData;

    if (!firstName.match(/^[A-Za-z]+$/)) {
      toast.error("First Name must contain only alphabets.");
      return false;
    }
    if (!lastName.match(/^[A-Za-z]+$/)) {
      toast.error("Last Name must contain only alphabets.");
      return false;
    }
    if (!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
      toast.error("E-Mail must be in a valid format.");
      return false;
    }
    if (!country) {
      toast.error("Country is required.");
      return false;
    }
    if (!state) {
      toast.error("State is required.");
      return false;
    }
    if (!city) {
      toast.error("City is required.");
      return false;
    }
    if (!gender) {
      toast.error("Gender is required.");
      return false;
    }
    if (!dateOfBirth || age < 14 || age > 99) {
      toast.error("Date of Birth must be between 14 and 99 years.");
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      axios
        .post("https://frequent-backend.vercel.app/api/registerUser", formData)
        .then((response) => {
          console.log(response, "response");
          if (response.data.code === 1) {
            toast.success("User registered successfully!");
            setFormData({
              firstName: "",
              lastName: "",
              email: "",
              country: "",
              state: "",
              city: "",
              gender: "",
              dateOfBirth: "",
              age: "",
            });
          } else if (response.data.code === 0) {
            toast.error(response.data.message);
          } else {
            toast.error(response.data.message);
          }
        })
        .catch((error) => {
          toast.error(`Error registering user: ${error.message}`);
        });
    }
  };

  return (
    <>
      <div>
        <Link href="/userList" className="userListButton">
          User List
        </Link>
        <ToastContainer transition={Zoom} />
        <h1 style={{ textAlign: "center" }}>Register</h1>
        <form className="form" onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="field">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
          <div className="field">
            <label htmlFor="email">E-Mail</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="field">
            <label htmlFor="country">Country</label>
            <select
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
            >
              <option value="">Select Country</option>
              {countries.map((country) => (
                <option key={country._id} value={country._id}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="state">State</label>
            <select
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              disabled={!formData.country}
            >
              <option value="">Select State</option>
              {states.map((state) => (
                <option key={state._id} value={state._id}>
                  {state.name}
                </option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="city">City</label>
            <select
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              disabled={!formData.state}
            >
              <option value="">Select City</option>
              {cities.map((city) => (
                <option key={city._id} value={city._id}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>
          <div className="field">
            <label>Gender</label>
            <div className="field">
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="1"
                  checked={formData.gender == "1"}
                  onChange={handleChange}
                />
                Male
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="2"
                  checked={formData.gender === "2"}
                  onChange={handleChange}
                />
                Female
              </label>
            </div>
          </div>
          <div className="field">
            <label htmlFor="dateOfBirth">Date of Birth</label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
            />
          </div>
          <div className="field">
            <label htmlFor="age">Age</label>
            <input
              type="text"
              id="age"
              name="age"
              value={formData.age}
              readOnly
            />
          </div>
          <button type="submit" className="button">
            Register
          </button>
        </form>
      </div>
    </>
  );
}

export default RegistrationForm;
