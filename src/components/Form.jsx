// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";

import s from "../styles/Form.module.scss";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import useUrlPosition from "../hooks/useUrlPosition";
import Spinner from "./Spinner";
import Message from "./Message";
import BackButton from "./BackButton";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useCities } from "../contexts/CitiesContext";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}
const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";
function Form() {
  const navigate = useNavigate();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [lat, lng] = useUrlPosition();
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const [emoji, setEmoji] = useState("");
  const [geocodingError, setGeocodingError] = useState("");
  const {createNewCity,isLoading} = useCities();

  useEffect(() => {
    if(!lat && !lng) return;
    async function fetchCityData() {
      try {
        setIsLoadingGeocoding(true);
        setGeocodingError("");
        const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
        const data = await res.json();
        if (!data.countryCode)
          throw new Error("нет данных, нажмите на другое место");
        setCityName(data.city || data.locality || "");
        setCountry(data.countryName);
        setEmoji(convertToEmoji(data.countryCode));
      } catch (err) {
        setGeocodingError(err.message);
      } finally {
        setIsLoadingGeocoding(false);
      }
    }
    fetchCityData();
  }, [lat, lng]);
  function handleSubmit(e){
    e.preventDefault()
    if(!cityName || !date)return;
    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position:{lat,lng}
    }
    createNewCity(newCity)
    navigate('/app/cities')
  }
  if (isLoadingGeocoding) return <Spinner />;
  if(!lat && !lng) return<Message message='нажмите на карту'/>
  if (geocodingError) return <Message message={geocodingError} />;
  return (
    <form className={`${s.form} ${isLoading ? s.loading : ''}`} onSubmit={handleSubmit}>
      <div className={s.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={s.flag}>{emoji}</span>
      </div>

      <div className={s.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>

        <ReactDatePicker  id="date" onChange={date =>setDate(date)} selected={date} dateFormat='dd/MM/yyyy'/>
      </div>

      <div className={s.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={s.buttons}>
        <Button type="primary">Add</Button>
        <BackButton />
      </div>
    </form>
    // &larr;
  );
}

export default Form;
