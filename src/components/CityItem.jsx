import React from 'react';
import s from '../styles/CityItem.module.scss';
import { Link } from 'react-router-dom';
import { useCities } from '../contexts/CitiesContext';


const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));
 
const CityItem = ({city}) => {
    const {cityName,emoji,date,id,position} = city;
    const {currentCity,deleteCity} = useCities();
    const handleDelete = (e)=>{
      e.preventDefault();
      deleteCity(id);
    }
    return (
        <li >
            <Link className={`${s.cityItem} ${id === currentCity.id ? s['cityItem--active']:"" }`} to={`${id}?lat=${position.lat}&lng=${position.lng}`}>
            <span className={s.emoji}>{emoji}</span>
            <h3 className={s.name}>{cityName}</h3>
            <time className={s.date}>{formatDate(date)}</time>
            <button className={s.deleteBtn} onClick={handleDelete}>&times;</button>
            </Link>
        </li>
    );
};

export default CityItem;