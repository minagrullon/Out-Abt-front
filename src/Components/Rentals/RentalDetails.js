import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BsSuitHeart } from "react-icons/bs";
import Suggested from "./Suggested";
import Contact from "../../Features/Contact";

import "./RentalDetails.css";
//* --------Map---------------
import MapContainer from "../../Features/MapContainer";
// import { useLoadScript } from "@react-google-maps/api"; // this is needed to make sure the map loads correctly
//* -------------------------------------------
const API = process.env.REACT_APP_API_URL;

export default function RentalDetails({ handleAddressSubmit }) {
  const [showMap, setShowMap] = useState(false);
  const handleToggle = () => {
    setShowMap(!showMap);
  };
  const [rental, setRental] = useState({});
  const [moreRentals, setMoreRentals] = useState([]);
  const [images, setImages] = useState([]);

  const { id } = useParams();
  const navigate = useNavigate();

  let datePosted = new Date(rental.date_posted);
  datePosted = datePosted.toDateString();
  let year = datePosted.split(" ").pop();
  let middle = datePosted.split(" ").splice(1, 2).join(" ");

  useEffect(() => {
    axios
      .get(`${API}/listings/${id}`)
      .then((res) => {
        setRental(res.data);
        setImages(res.data.image_url);
      })
      .catch((err) => console.warn(err));
  }, [id]);

  const deleteRental = () => {
    axios
      .delete(`${API}/listings/${id}`, {
        headers: {
          authorization: localStorage.getItem("jwtToken"),
        },
      })
      .then(() => {
        navigate(`/listings`);
      })
      .catch((error) => console.warn(error));
  };

  useEffect(() => {
    axios
      .get(`${API}/listings`)

      .then((res) => {
        setMoreRentals(res.data);
      })
      .catch((err) => console.warn(err));
  }, []);

  let filtered = moreRentals.filter((more) => rental.rooms === more.rooms);
  filtered = filtered.length > 3 ? filtered.splice(0, 3) : filtered;

  return (
    <div className="rental_details">
      {console.log(rental)}
      <div className="details_main_content">
        <div className="rental_dets_image">
          {images.map((image) => {
            return <img src={image} alt={image} />;
          })}
          {/* {typeof rental.image_url === "string" ? (
            <img src={rental.image_url} alt={rental.image_url} />
          ) : (
            <img src={rental.image_url} alt={rental.image_url} />
          )} */}
          {/* <img src={images[0]} alt={rental.image_url} /> */}
          {console.log(rental.image_url)}
          <button>
            <BsSuitHeart />
          </button>
        </div>
        <h2 className="rental_dets_title">{rental.title}</h2>
        <p>
          <em>
            Date Posted: {middle}, {year}
          </em>
        </p>
        <div className="important_dets">
          <p>
            <b>Monthly Rent:</b> ${rental.price}
          </p>

          <hr className="hr" />
          <p>
            <b>Rooms: </b>
            {rental.rooms}
          </p>
        </div>
        <div className="rental_dets_description">
          <p>{rental.description}</p>
        </div>
      </div>
      <>
        {localStorage.getItem("user_id") === String(rental.user_id) ? (
          <div className="rental_details_buttons">
            <button
              onClick={() => {
                navigate(`/listings/${id}/edit`);
              }}
            >
              Edit
            </button>
            <button onClick={deleteRental}>Delete</button>
          </div>
        ) : null}
      </>

      <div className="rental_map">
        <h5>View on Map</h5>
        <p>
          <button
            className="show-button button"
            onClick={handleToggle}
            style={{ backgroundColor: "teal" }}
          >
            {showMap ? "Hide Map" : "View on map"}
          </button>
        </p>
        {showMap && (
          <div className="middle map-container">
            <MapContainer
              handleAddressSubmit={handleAddressSubmit}
              location={rental.location}
            />
          </div>
        )}
        {/* <div style={{ display: "flex", height: "400px" }}>
          <MapContainer
            handleAddressSubmit={handleAddressSubmit}
            location={rental.location}
          />
        </div> */}
      </div>
      <hr />
      <div
        className="contact-container"
        style={{
          marginTop: "1em",
          marginBottom: "1em",
          marginRight: "auto",
          marginLeft: "auto",
        }}
      >
        <h3 style={{ color: "teal" }}>Contact</h3>
        <Contact />
      </div>
      <hr></hr>
      <h3 className="rental_recs_h">Similar listings</h3>
      <div className="rental_recs">
        {filtered.map((rental) => {
          return <Suggested key={rental.id} id={rental.id} rental={rental} />;
        })}
      </div>
    </div>
  );
}
