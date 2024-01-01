"use client";
import React, { useEffect, useState } from 'react'
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow } from '@vis.gl/react-google-maps'
import { faPlane } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const FlightMap = () => {
    const mapId = "3883295c1c187d1e"
    const AnkaraPosition = { lat: 39.93, lng: 32.85 }
    const [flightData, setFlightData] = useState([]);
    const onClickHandler = () => {
        console.log("CLİDKEDD")
    }


    const fetchData = () => {
        axios
            .get("https://airlabs.co/api/v9/flights?api_key=a8690eb7-ee46-45eb-a4ba-5e55e309977e")
            .then((res) => {
                console.log("API Response:", res.data);
                setFlightData(res.data.response.slice(0, 100));
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
                    {flightData.map((each, index) => (
                        <AdvancedMarker
                            key={index}
                            position={{ lat: each.lat, lng: each.lng }}
                            style={{ cursor: 'pointer' }}
                            onClick={onClickHandler}
                        >
                            <FontAwesomeIcon icon={faPlane} size='2xl' />
                        </AdvancedMarker>

                    ))}
                </Map>
            </div>
        </APIProvider>
    )
}

export default FlightMap