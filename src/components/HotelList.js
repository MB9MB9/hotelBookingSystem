import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HotelList = () => {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/hotels')
      .then(response => {
        setHotels(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the hotels!', error);
      });
  }, []);

  return (
    <div>
      <h1>Hotel List</h1>
      <ul>
        {hotels.map(hotel => (
          <li key={hotel._id}>{hotel.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default HotelList;
