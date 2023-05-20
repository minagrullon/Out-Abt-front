import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Rental from "./Rental";
import { useContextProvider } from "../../Provider";
import "./Rentals.css";

const API = process.env.REACT_APP_API_URL;

export default function Rentals() {
  const { user, setUser } = useContextProvider();

  const [rentals, setRentals] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API}/listings`)

      .then((res) => {
        setRentals(res.data);
        // console.log(res.data);
      })
      .catch((err) => console.warn(err));
  }, []);

  return (
    <div className="rentals">
      <h2 className="rentals_title">Rental Listings</h2>
      <div className="rentals_button_container">
        <button
          className="rentals_add"
          onClick={() => navigate(`/listings/new`)}
        >
          Add New +
        </button>
      </div>
      {rentals.map((rental) => {
        return <Rental key={rental.id} rental={rental} />;
      })}
    </div>
  );
}
