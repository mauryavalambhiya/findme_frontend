import SearchBar from "../../components/SearchBar";
import LocationBtn from "../../components/LocationBtn";
import LocationIcon from "../../assets/carbon_location.svg";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import GraduationIcon from "../../assets/education_icon.svg";
import FoodIcon from "../../assets/svgviewer-output.svg";
import HospitalIcon from "../../assets/hospital_2023.svg";
import DailyneedIcon from "../../assets/homedecor_icon.svg";
import axios from "../../services/backen_api/axios";
// import PullupsIcon from "../../assets/Pullups.svg";

const Home = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState(null);
  const [addressData, setAddressData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // const getip = () => {
  //   fetch('https://api.ipify.org?format=json')
  //   .then(response => response.json())
  //   .then(data => {
  //       console.log(data.ip);
  //       return data.ip
  //   })
  //   .catch(error => {
  //       console.log('Error:', error);
  //       return error.message
  //   });
  // }

  const getIpLoc = async () => {
    try {

    const options = {
      url: 'https://ipapi.co/json/',
    };
    
    const responce = await axios.get(options.url)
    const city =  responce.data.city
    const country = responce.data.country_name
    const lat = responce.data.latitude
    const long = responce.data.longitude
    let data = {
      city : city,
      country : country,
      gioCoordinates : [lat,long]
    }
    console.log(data)
    await storedata(country, city, lat, long)
    return data;
   }catch (error) {
    console.error('Error fetching IP location:', error.message);
    // You can handle the error appropriately here, such as returning a default value or re-throwing the error
    throw error;
  }
  }

  const storedata = async (country, city, lat, long) => {
    const locData = {
      city : city,
      country : country,
      gioCoordinates : [lat,long]
    }
    const jsonString = JSON.stringify(locData);
    localStorage.setItem('location', jsonString);
  }

  const getLocationToAddress = async (lat, long) => {
    try {
      setLoading(true);
      const response = await axios.get(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${long}&localityLanguage=en`);
      await setAddressData(response.data.city);
      await storedata( response.data.countryName ,response.data.city, lat, long)
      // console.log("Address :- " + response.data.city)
      setError(null);
    } catch (err) {
      setError(err.message);
      console.log("Error address :- " + error)

    } finally {
      setLoading(false);
    }
  }

  const getLocation = () => {
    // Add code to fetch current location here
    // Example:
    navigator.geolocation.getCurrentPosition((position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      setLocation([latitude, longitude]);
      getLocationToAddress(latitude, longitude)
    });
  };
  const handleSearch = (query) => {
    console.log("Searched");
    navigate(`/search?q=${query}&lat=${location[0]}&long=${location[1]}`, {
      replace: true,
    });
  };

  useEffect(() => {
    // eslint-disable-next-line no-unused-vars
    const storedJsonString = localStorage.getItem('location');
    const storedJsonData = JSON.parse(storedJsonString);
    // console.log(" local data :- " + JSON.stringify(storedJsonData))
    if ( storedJsonData == null || storedJsonData == undefined){
      const data = getIpLoc()
      console.log(data)
    }
  }, [])

  return (
    <>
      <section className="flex flex-col w-full h-fit px-4 md:px-8 md:px-35 justify-center items-center align-middle pt-40 space-y-4">
        <SearchBar onSearch={handleSearch} location={location}></SearchBar>
        <div className=" flex flex-row align-middle items-center">
          <section className=" h-fit w-fit bg-slate-300 pt-3 pb-4 px-2 mx-5 rounded-md">
          {
            loading 
            ? <p>Loading...</p>
            : (addressData == null 
              ? <p>Please select location</p>
              : <p>City : {addressData}</p>
            )
          }
            
          </section>
          {loading ? (
            <div className="w-fit h-fit p-2 bg-transparent border-2 border-white rounded-lg">
              {/* Loading... */}
              {/* <div className="flex justify-center items-center px-7">
                <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-10 w-10"></div>
              </div> */}
              <div role="status" className="px-8">
                  <svg aria-hidden="true" className="w-10 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-orange" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                  </svg>
                  <span className="sr-only">Loading...</span>
              </div>
            </div>
          ) : (
            <LocationBtn
              iconImg={LocationIcon}
              onBtnClick={getLocation}
              btnName="Location"
            ></LocationBtn>
          )}
        </div>
        {/* <div>
          <button onClick={() => { 
            const storedJsonString = localStorage.getItem('location');
            const storedJsonData = JSON.parse(storedJsonString);
            console.log(" local data :- " + JSON.stringify(storedJsonData))
            // getIpLoc()
           }}>Get ceche data</button>
        </div> */}
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
