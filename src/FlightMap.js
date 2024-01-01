"use client";
import React from 'react'
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow } from '@vis.gl/react-google-maps'

const FlightMap = () => {
    const mapId = "3883295c1c187d1e"
    const AnkaraPosition = { lat: 39.93, lng: 32.85 }


    return (
        <APIProvider apiKey='AIzaSyBw_gyiOSnKzHdahIyf2zFJBbrGL3UwBKI'>
            <div style={{height:"80vh", marginTop:"5rem"}}>
                <Map zoom={10} center={AnkaraPosition} mapId={mapId}></Map>
            </div>
        </APIProvider>
    )
}

export default FlightMap