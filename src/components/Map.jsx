import React, { useEffect, useState } from "react";
import s from "../styles/Map.module.scss";
import { useNavigate, useSearchParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvent, useMapEvents } from "react-leaflet";
import { useCities } from "../contexts/CitiesContext";
import { useGeolocation } from "../hooks/useGeolocation";
import Button from "./Button";
import useUrlPosition from "../hooks/useUrlPosition";

const Map = () => {
    // const [searchParams] = useSearchParams();
    const [mapPosition, setPosition] = useState([40, 0]);
    const [ mapLat,mapLng] = useUrlPosition(); 
    const {
        isLoading: isLoadingPosition,
        position: geolocationPosition,
        getPosition,
      } = useGeolocation();
    
    const { cities } = useCities();
    

    useEffect(() => {
        if (mapLat && mapLng) setPosition([mapLat, mapLng])
    }, [mapLat, mapLng])
    useEffect(()=>{
        if(geolocationPosition) setPosition([geolocationPosition.lat,geolocationPosition.lng])
    },[geolocationPosition])
    return (
        <div className={s.mapContainer}>
            {!geolocationPosition && <Button type="position" onClick={getPosition} >{isLoadingPosition? 'Loading' : 'use your position'}</Button>}
            
            <MapContainer
                center={mapPosition}
            
                zoom={13}
                scrollWheelZoom={true}
                className={s.map}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                />
                {cities.map((city) => (<Marker key={city.id} position={[city.position.lat, city.position.lng]}>
                    <Popup>
                        {city.cityName}
                    </Popup>
                </Marker>))}
                <ChangeCenter position={mapPosition} />
                <DetectClick />
            </MapContainer>
        </div>
    );
};
function ChangeCenter({ position }) {
    const map = useMap();
    map.setView(position)
    return null;
}
function DetectClick() {
    const navigate = useNavigate();
  
    useMapEvents({
      click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
    });
  }

export default Map;
