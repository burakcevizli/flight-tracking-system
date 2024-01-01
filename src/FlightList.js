import axios from 'axios';
import React, { useEffect, useState } from 'react';

const FlightList = () => {
    const [flights, setFlights] = useState([]);
    const [showDetail, setShowDetail] = useState(false);
    const [showOnlySelectedDetail, setShowOnlySelectedDetail] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState(null)

    const onClickHandler = () => {
        setShowDetail(!showDetail);
    };
    const toggleOnClickHandler = () => {
        setShowOnlySelectedDetail(!showOnlySelectedDetail)
    }

    useEffect(() => {
        axios
            .get("https://airlabs.co/api/v9/flights?api_key=a8690eb7-ee46-45eb-a4ba-5e55e309977e")
            .then((res) => {
                console.log("API Response:", res.data);
                setFlights(res.data.response.slice(0, 100));
            })
            .catch((error) => {
                console.error("Error fetching data from the API:", error);
            });
    }, []);

    return (
        <div className='flex flex-col items-center'>
            <h2 className='text-center my-8 text-[2rem] font-bold text-blue-600'>Flight List</h2>
            <div className="mb-4">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={onClickHandler}
                >
                    {showDetail ? "Hide Details" : "Show Details"}
                </button>
            </div>
            {flights.map((flight, index) => (
                <div key={index} className='w-[100rem]  mx-auto gap-1 flex text-center justify-between'>
                    <div onClick={() => setSelectedIndex(index)} className='w-[20rem] cursor-pointer border-2 py-2 rounded mb-2 border-amber-600'>
                        <h1 className='text-[1.2rem] text-purple-800 font-bold underline'>Uçuş Bilgileri</h1>
                        <h1 className='font-bold text-green-700'>{flight.flight_iata} ve {flight.flight_number}</h1>
                    </div>
                    <div className='w-[20rem] border-2 py-2 rounded mb-2 border-amber-600'>
                        <h1 className='text-[1.2rem] text-purple-800 font-bold underline'>Kalkış ve Varış Bilgileri</h1>
                        <h1 className='font-bold text-green-700'>{flight.dep_iata} ve {flight.arr_iata}</h1>
                    </div>
                    {(showDetail || selectedIndex === index) && (
                        <>
                            <div className='w-[20rem] border-2 py-2 rounded mb-2 border-amber-600'>
                                <h1 className='text-[1.2rem] text-purple-800 font-bold underline'>Havayolu Bilgileri</h1>
                                <h1 className='font-bold text-green-700'>{flight.airline_iata} ve {flight.flight_number}</h1>
                            </div>
                            <div className='w-[20rem] border-2 py-2 rounded mb-2 border-amber-600'>
                                <h1 className='text-[1.2rem] text-purple-800 font-bold underline'>Hava Aracı Bilgileri</h1>
                                <h1 className='font-bold text-green-700'>{flight.aircraft_icao} ve {flight.reg_number}</h1>
                            </div>
                            <div className='w-[20rem] border-2 py-2 rounded mb-2 border-amber-600'>
                                <h1 className='text-[1.2rem] text-purple-800 font-bold underline'>Konum Bilgileri</h1>
                                <h1 className='font-bold text-green-700'>{flight.lat.toFixed(2)} , {flight.lng.toFixed(2)} , {flight.alt} , {flight.speed}km</h1>
                            </div>
                        </>
                    )}
                </div>
            ))}
        </div>
    );
};

export default FlightList;
