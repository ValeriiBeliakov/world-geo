import React from 'react';
import s from '../styles/CityList.module.scss'
import Spinner from "../components/Spinner"
import CityItem from './CityItem';
import Message from "./Message"
import { useCities } from '../contexts/CitiesContext';


const CityList = () => {
  const {cities,isLoading} = useCities()
    if(isLoading) return <Spinner/>
    if(!cities.length) return <Message message='add your first city by clicking on a city  on the map'/>
    return (
      <ul className={s.cityList}>
        {cities.map(city=>(
            <CityItem city={city} key={city.id}/>
        ))}
      </ul>
    );
};

export default CityList;