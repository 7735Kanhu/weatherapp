import { useEffect, useState } from "react";
import bgimage from "./image/bg.jpg";
import bg2 from "./image/bg2.jpg";
import { FiSun } from "react-icons/fi";
import { IoIosSearch } from "react-icons/io";
import axios from "axios";

function App() {
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [search, setSearch] = useState("");
  const [recent, setRecent] = useState([]);
  const [switchData, setSwitchData] = useState("");

  const getlocationHandler = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (res) => {
          setLat(res.coords.latitude);
          setLon(res.coords.longitude);
        },
        (err) => {
          console.log(err);
        }
      );
    }
    try {
      if (lat !== "" && lon !== "") {
        const { data } = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=717c1995b79a72edaefb013ee0ecd2ec`
        );
        setCity(data?.name);
        setCountry(data?.sys.country);
        setWeatherData(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = async () => {
    try {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=ac90dceabee97323a88981965455bf32`
      );
      // console.log("search data",data);
      setWeatherData(data);
      setSearch("");
      addToRecent(data?.name);
    } catch (error) {
      console.log(error);
      alert("No record found search other City");
      setSearch("");
    }
  };

  const addToRecent = (city) => {
    let recentData = recent;
    recentData.push(city);
    recentData = recentData.slice(-5);
    setRecent(recentData);
  };

  useEffect(() => {
    getlocationHandler();
    // eslint-disable-next-line
  }, []);

  function getCurrentDate() {
    return new Date().toLocaleDateString("en-us", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }

  function getTime(t) {
    const data = new Date(t * 1000);
    return data.toLocaleTimeString();
  }
  return (
    <div
      className="w-full h-[100vh] bg-cover bg-center text-white pt-6"
      style={{ backgroundImage: `url(${bgimage})` }}
    >
      <div className="m-auto flex flex-col justify-center align-middle w-[90vw] md:w-[60vw] md:flex-row h-max">
        <div className="p-8  bg-black flex flex-col gap-4 md:w-max">
          {weatherData ? (
            <img
              src={`http://openweathermap.org/img/wn/${weatherData?.weather[0].icon}@2x.png`}
              alt="mlt"
              className="w-24 m-auto "
            />
          ) : (
            <FiSun className="text-white text-6xl text-center w-full" />
          )}
          <h3 className="text-3xl font-bold text-center">
            {weatherData?.weather[0].main}
          </h3>
          <hr />
          <div className="flex gap-0 border-b-2">
            <input
              type="text"
              placeholder="Type Your City Name"
              className="p-2 bg-transparent border-0 outline-0"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
            <IoIosSearch
              className="text-4xl cursor-pointer rounded-full p-1"
              onClick={handleSearch}
            />
          </div>
          <h2 className="text-center">
            {weatherData?.name},{weatherData?.sys.country}
          </h2>
          <hr />
          <div className="flex justify-between">
            <h3>Temprature</h3>
            <h3>
              {switchData === "Celsius"
                ? (weatherData?.main.temp - 273.15).toFixed(2) + " ° C"
                : weatherData?.main.temp + " K"}
            </h3>
          </div>
          <hr />
          <div className="flex justify-between">
            <h3>Humidity</h3>
            <h3>{weatherData?.main.humidity} %</h3>
          </div>
          <hr />
          <div className="flex justify-between">
            <h3>Visibility</h3>
            <h3>{weatherData?.visibility / 1000} km</h3>
          </div>
          <hr />
          <div className="flex justify-between">
            <h3>Wind Speed</h3>
            <h3>{(weatherData?.wind.speed * 3600) / 1000} km/h</h3>
          </div>
          <hr />
          <div className="flex justify-center flex-col text-center">
            <h3 className="font-bold">Recent Search</h3>
            <ul className="mt-1">
              {recent
                ? recent.map((city, id) => (
                    <li
                      key={id}
                      className="mb-2 cursor-pointer"
                      onClick={() => setSearch(city)}
                    >
                      {city} <hr />
                    </li>
                  ))
                : ""}
            </ul>
          </div>
        </div>
        <div
          style={{ backgroundImage: `url(${bg2})` }}
          className="w-full bg-cover p-4 flex flex-col h-[100] justify-between gap-96 relative"
        >
          <div className="text-2xl font-bold flex justify-between">
            <div>
              <h2>{city}</h2>
              <h2>{country}</h2>
            </div>
            <select
              onChange={(e) => setSwitchData(e.target.value)}
              className="w-max h-max p-2 align-text-top  text-black text-sm"
            >
              <option value="Kelvin">Kelvin</option>
              <option value="Celsius">Celsius</option>
            </select>
          </div>
          <div className="text-2xl text-right font-bold align-bottom">
            <h2>{getTime(weatherData?.timezone)}</h2>
            <h2>{getCurrentDate()}</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
