import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

import Rental from "../Components/Rentals/Rental";

const API = process.env.REACT_APP_API_URL;

export default function Filter({ selectedLanguage }) {
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    axios
      .get(`${API}/listings?language=${selectedLanguage}`)
      .then((res) => {
        setFiltered(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [selectedLanguage]);

  return (
    <>
      {filtered.map((rental) => {
        return <Rental key={rental.id} rental={rental} />;
      })}
    </>
  );
}
