import SearchBar from "../../components/SearchBar";
import LocationBtn from "../../components/LocationBtn";
import LocationIcon from "../../assets/carbon_location.svg";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import GraduationIcon from "../../assets/education_icon.svg";
import FoodIcon from "../../assets/svgviewer-output.svg";
import HospitalIcon from "../../assets/hospital_2023.svg";
import DailyneedIcon from "../../assets/homedecor_icon.svg";
// import PullupsIcon from "../../assets/Pullups.svg";

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
    navigate(`/search?q=${query}&lat=${location[0]}&long=${location[1]}`, {
      replace: true,
    });
  };

  return (
    <>
      <section className="flex flex-col w-full h-fit px-4 md:px-8 md:px-35 justify-center items-center align-middle pt-40 space-y-4">
        <SearchBar onSearch={handleSearch} location={location}></SearchBar>
        <div className=" flex flex-row align-middle items-center">
          
          <section className=" h-fit w-fit bg-slate-300 pt-3 pb-4 px-2 mx-5 rounded-md">
            {location == null ? (
              <p>Please select location</p>
            ) : (
              <p>Location {location}</p>
            )}
          </section>
          <LocationBtn
            iconImg={LocationIcon}
            onBtnClick={getLocation}
            btnName="Location"
          ></LocationBtn>
        </div>
      </section>
      {/* <section className="">
        {location == null ? (
          <p>Please select location</p>
        ) : (
          <p>Location {location}</p>
        )}
      </section> */}

      <section className=" scrollicon bg-cover border-inset mx-auto my-auto mb-4 border-black rounded-lg py-10 flex justify-center items-center">
        <div className="center text-white"></div>
        <div className="grid mr-4 grid-cols-4 gap-x-16 gap-y-12 ">
          <div className="school hover:translate-y-4 transition-transform ">
            <Link
              to="education"
              className=" block bg-my-red p-2 rounded-md border-4 border-white"
            >
              <img className=" m-auto h-28 " src={GraduationIcon} alt="" />
            </Link>
          </div>
          <div className=" food hover:translate-y-4 transition-transform ">
            <Link
              to="resturants"
              className=" block p-2 rounded-md border-4 border-white"
            >
              {/* <img className="hosimg" src={FoodIcon} alt="" /> */}
              <img className=" m-auto h-28  " src={FoodIcon} alt="" />
            </Link>
          </div>
          <div className="hospital hover:translate-y-4 transition-transform ">
            <Link
              to="hospitals"
              className=" block p-2 rounded-md border-4 border-white"
            >
              <img className="m-auto h-28" src={HospitalIcon} alt="" />
            </Link>
          </div>
          {/* <div className="pullups hover:translate-y-4 transition-transform ">
            <Link className="bg-yellow-500 block p-2 rounded-md border-4 border-white">
              <img className="hosimg" src={PullupsIcon} alt="" />
            </Link>
          </div> */}
          <div className="dailyneeds hover:translate-y-4 transition-transform ">
            <Link
              to="dailyneed"
              className=" block p-2 rounded-md border-4 border-white"
            >
              <img className="m-auto h-28" src={DailyneedIcon} alt="" />
            </Link>
          </div>
          <div className="school hover:translate-y-4 transition-transform ">
            <Link
              to="education"
              className=" block p-2 rounded-md border-4 border-white"
            >
              <img className=" m-auto h-28 " src={GraduationIcon} alt="" />
            </Link>
          </div>
          <div className=" food hover:translate-y-4 transition-transform ">
            <Link
              to="resturants"
              className=" block p-2 rounded-md border-4 border-white"
            >
              {/* <img className="hosimg" src={FoodIcon} alt="" /> */}
              <img className=" m-auto h-28  " src={FoodIcon} alt="" />
            </Link>
          </div>
          <div className="hospital hover:translate-y-4 transition-transform ">
            <Link
              to="hospitals"
              className=" block p-2 rounded-md border-4 border-white"
            >
              <img className="m-auto h-28  " src={HospitalIcon} alt="" />
            </Link>
          </div>
          {/* <div className="pullups hover:translate-y-4 transition-transform ">
            <Link className="bg-yellow-500  block p-2 rounded-md border-4 border-white">
              <img className="hosimg" src={PullupsIcon} alt="" />
            </Link>
          </div> */}
          <div className="dailyneeds hover:translate-y-4 transition-transform ">
            <Link
              to="dailyneed"
              className=" block p-2 rounded-md border-4 border-white"
            >
              <img className="m-auto h-28" src={DailyneedIcon} alt="" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
