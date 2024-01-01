import axios from 'axios';
import React, { useEffect, useState } from 'react'

const FlightList = () => {
    const [flights, setFligths] = useState([]);


    useEffect(() => {
        axios
            .get("https://airlabs.co/api/v9/flights?api_key=a8690eb7-ee46-45eb-a4ba-5e55e309977e")
            .then((res) => {
                console.log("API Response:", res.data);
                setFligths(res.data.response.slice(0, 100));
            })
            .catch((error) => {
                console.error("Error fetching data from the API:", error);
            });
    }, [])

    return (
        <div>
            <h2>Flight List</h2>,
            {flights.map((flight, index) => (
                <div key={index} className='flex' >
                    <div>
                        <h1 className='underline'>Uçuş Bilgileri :</h1>
                        <h1>{flight.flight_iata} ve {flight.flight_number}</h1>
                    </div>
                    <div>
                        <h1>Havayolu Bilgileri :</h1>
                        <h1>{flight.airline_iata} ve {flight.flight_number}</h1>
                    </div>
                    <div>
                        <h1>Hava Aracı Bilgileri :</h1>
                        <h1>{flight.aircraft_icao} ve {flight.reg_number}</h1>
                    </div>
                    <div>
                        <h1>Kalkış ve Varış Bilgileri :</h1>
                        <h1>{flight.dep_iata} ve {flight.arr_iata}</h1>
                    </div>
                    <div>
                        <h1>Konum Bilgileri :</h1>
                        <h1>{flight.lat} , {flight.lng} , {flight.alt} , {flight.speed}</h1>
                    </div>
                </div>
            ))}
        </div >
    )
}

export default FlightList