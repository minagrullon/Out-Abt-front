import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Rental from "./Rental";

let API;

export default function Rentals() {
  const [rentals, setRentals] = useState([]);

  useEffect(() => {
    axios
      .get(`${API}/rentals`)
      .then((res) => setRentals(res))
      .catch((err) => console.warn(err));
  }, []);

  return (
    <div className="rentals">
      <h3>Rental Listings</h3>
      {rentals.map((rental) => {
        return <Rental key={rental.id} />;
      })}
    </div>
  );
}
