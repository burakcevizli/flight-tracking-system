"use client";
import React, { useEffect, useState } from 'react'
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow } from '@vis.gl/react-google-maps'
import { faPlane } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';


const FlightMap = () => {
    const mapId = "3883295c1c187d1e"
    const AnkaraPosition = { lat: 39.93, lng: 32.85 }
    const [flightData, setFlightData] = useState([]);

    const airplaneIcon = (
        <img src='https://img1.pngindir.com/20180707/vfh/kisspng-airplane-computer-icons-flight-clip-art-5b4095d66949f0.6022332415309593184313.jpg' className='w-5' alt='ucak' />
    );

    const fetchData = () => {
        axios
            .get("https://airlabs.co/api/v9/flights?api_key=a8690eb7-ee46-45eb-a4ba-5e55e309977e")
            .then((res) => {
                console.log("API Response:", res.data);
                setFlightData(res.data.response);
            })
            .catch((error) => {
                console.error("Error fetching data from the API:", error);
            });
    };

    useEffect(() => {
        if (flightData.length === 0) {
            fetchData();
        }
    }, [flightData]);


    return (
        <APIProvider apiKey='AIzaSyBw_gyiOSnKzHdahIyf2zFJBbrGL3UwBKI'>
            <div style={{ height: "80vh", marginTop: "5rem" }}>
                <Map zoom={10} center={AnkaraPosition} mapId={mapId}>


                </Map>
            </div>
        </APIProvider>
    )
}

export default FlightMap