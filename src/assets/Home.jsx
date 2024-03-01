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
        <SearchBar onSearch={handleSearch} location={location}></SearchBar>
        <LocationBtn
          iconImg={LocationIcon}
          onBtnClick={getLocation}
          btnName="Location"
        ></LocationBtn>
      </section>
      <section className="">
        {
          location == null 
          ? <p>Please select location</p>
          : <p>Location {location}</p>
        }
      </section>
      
  <section
    className="scrollicon bg-cover border-inset mx-auto my-auto mb-4 border-black rounded-lg py-10 flex justify-center items-center"
    style="background-image: url('Line 4.svg');">
    <div className="center text-white">
    </div>
    <div className="grid mr-4 grid-cols-5 gap-24 ">
      <div className="school hover:translate-y-4 transition-transform ">
        <button className=" bg-my-red p-2 rounded-md border-4 border-white"><img className="hosimg" src="Graduation Cap.svg"
            alt=""/></button>
      </div>
      <div className="food">
        <button className="bg-green-500 p-2 rounded-md border-4 border-white"><img className="hosimg" src="Food.svg"
            alt="" /></button>
      </div>
      <div className="hospital">
        <button className="bg-red-500 p-2 rounded-md border-4 border-white"><img className="hosimg" src="Hospital 3.png"
            alt="" /></button>
      </div>
      <div className="pullups">
        <button className="bg-yellow-500 p-2 rounded-md border-4 border-white"><img className="hosimg" src="Pullups.svg"
            alt="" /></button>
      </div>
      <div className="dailyneeds">
        <button className="bg-purple-500 p-2 rounded-md border-4 border-white"><img className="hosimg" src="Toothbrush.svg"
            alt="" /></button>
      </div>
      <div className="school">
        <button className="bg-blue-500 p-2 rounded-md border-4 border-white"><img className="hosimg" src="Graduation Cap.svg"
            alt="" /></button>
      </div>
      <div className="food">
        <button className="bg-green-500 p-2 rounded-md border-4 border-white"><img className="hosimg" src="Food.svg"
            alt="" /></button>
      </div>
      <div className="hospital">
        <button className="bg-red-500 p-2 rounded-md border-4 border-white"><img className="hosimg" src="Hospital 3.png"
            alt="" /></button>
      </div>
      <div className="pullups">
        <button className="bg-yellow-500 p-2 rounded-md border-4 border-white"><img className="hosimg" src="Pullups.svg"
            alt="" /></button>
      </div>
      <div className="dailyneeds">
        <button className="bg-purple-500 p-2 rounded-md border-4 border-white"><img className="hosimg" src="Toothbrush.svg"
            alt="" /></button>
      </div>
    </div>
  </section>

    </>
  );
};

export default Home;