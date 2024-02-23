import SearchBar from "../../components/SearchBar";
import LocationBtn from "../../components/LocationBtn";
import LocationIcon from "../../assets/carbon_location.svg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Home = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState(null);

  const getLocation = () => {
    // Add code to fetch current location here
    // Example:
    navigator.geolocation.getCurrentPosition((position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      setLocation([latitude, longitude]);
      // setValue("location", ${latitude}, ${longitude});
    });
  };
  const handleSearch = (query) => {
    console.log("Searched");
    navigate(`/search?q=${query}&lat=${location[0]}&long=${location[1]}`, { replace: true });
  };

  return (
    <>
      <section className="flex flex-col w-full h-fit px-4 md:px-8 md:px-35 justify-center items-center align-middle pt-40 space-y-4">
        <SearchBar onSearch={handleSearch}></SearchBar>
        <LocationBtn
          iconImg={LocationIcon}
          onBtnClick={getLocation}
          btnName="Location"
        ></LocationBtn>
      </section>
      <section className=""></section>
    </>
  );
};

export default Home;