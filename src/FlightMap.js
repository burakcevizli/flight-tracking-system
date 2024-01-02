"use client";
import React, { useEffect, useState } from 'react'
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow } from '@vis.gl/react-google-maps'
import { faPlane } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useHistory } from 'react-router-dom';


const FlightMap = () => {
    const mapId = "3883295c1c187d1e"
    const AnkaraPosition = { lat: 39.93, lng: 32.85 }
    const [flightData, setFlightData] = useState([]);
    const history = useHistory()
    const [userLocation, setUserLocation] = useState(null)

    const getUserLocation = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            setUserLocation({ lat: latitude, lng: longitude });
        },
            (error) => {
                console.log("Kullanıcı Konum Bilgisi Alınamıyor... ", error)
            }
        )
    }

    const onClickHandler = () => {
        console.log("CLİDKEDD")
    }
    const buttonOnClickHandler = () => {
        history.push("/flightList")
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
            <div style={{ height: "80vh" }}>
                <h1 className='text-center text-[2rem] font-bold mt-8 text-green-700 mb-2'>Burak Cevizli Air Tracker</h1>
                <div className='flex'>
                    <button onClick={buttonOnClickHandler} className='bg-blue-500 px-4 py-2 flex justify-center mx-auto mb-6'>Uçuş Listesini Görmek İçin Tıklayınız</button>
                    <button onClick={getUserLocation} className='bg-blue-500 px-4 py-2 flex justify-center mx-auto mb-6'>Konumunuzu Görmek İçin Tıklayınız.</button>
                </div>
                <Map zoom={10} center={AnkaraPosition || userLocation} mapId={mapId}>
                    {userLocation && (
                        <AdvancedMarker position={userLocation} style={{ cursor: 'pointer' }}>
                           
                        </AdvancedMarker>
                    )}
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
                <div className='flex mt-2 justify-center gap-4'>
                    <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 512 512"><path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" /></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 512 512"><path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" /></svg>
                </div>
            </div>
        </APIProvider>
    )
}

export default FlightMap