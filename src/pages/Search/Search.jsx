import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// import SearchBar from "../../components/SearchBar";
import BlankCard from "../../components/BlankCard";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const Search = () => {
  const [locparams, setLocParams] = useState(null);  // save the location info
  const [mainparams, setMainParams] = useState(null);
  const [subparams, setSubParams] = useState(null);
  const [qparams, setQParams] = useState(null);
  const [pageLoded, setPageLoded] = useState(false);
  var [searchdata, setSearchData] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  // const [locparams, setLocParams] = useState(null);
  const location = useLocation();

  // search by main and sub category
  async function getData(query, maincat, subcat) {
    console.log("Get data :- " + query + " " + maincat + " " + subcat);
    const response = await axiosPrivate.post(
      "http://localhost:5000/v1/user/search",
      {
        search_query: query + " " + maincat + " " + subcat,
      },
      {
        headers: {
          origin_private: "x078672399",
          API_KEY: 'API-kkj234rKJEWFI4HV3YCH84N7TNC8T', 
        },
      }
    );
    setSearchData(response.data)
  }

  async function getLocData(query, maincat, subcat, location) {
    // locparams
    let data = {
      search_query: `${query} ${maincat} ${subcat}`,
      gps_location: location,
    };

    const response = await axiosPrivate.post(
      "http://localhost:5000/v1/user/search",
      data,
      {
        headers: {
          origin_private: "x078672399",
          API_KEY: 'API-kkj234rKJEWFI4HV3YCH84N7TNC8T', 
        },
      }
    );
    setSearchData(response.data)
  }

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const latValue = queryParams.get("lat");
    const longValue = queryParams.get("long");
    const qValue = queryParams.get("q");
    const mainValue = queryParams.get("maincat");
    const subValue = queryParams.get("subcat");
    if (!qValue) {
      setQParams("all");
    } else {
      setQParams(qValue);
    }
    if (!mainValue) {
      setMainParams("");
    } else {
      setMainParams(mainValue);
    }
    if (!subValue) {
      setSubParams("");
    } else {
      setSubParams(subValue);
    }

    if (latValue != null || longValue != null) {
      setLocParams([22.2873299, 70.7986046]);
    } else {
      setLocParams([latValue, longValue]);
    }

    setPageLoded(true);
  }, []);

  useEffect(() => {
    if (pageLoded) {
      if (locparams.length !== 0 && locparams[0] !== null) {
        getLocData(qparams, mainparams, subparams, locparams);
      } else {
        getData(qparams, mainparams, subparams);
      }
    }
  }, [pageLoded]);

  // if( locparams != []){
  //   useEffect(() => {
  //     if (pageLoded == true){
  //       getLocData(qparams, mainparams,subparams)
  //     }
  //   }, [pageLoded])
  // }else{
  //   useEffect(() => {
  //     if (pageLoded == true){
  //       getData(qparams, mainparams,subparams)
  //     }
  //   }, [pageLoded])
  // }

  // useEffect(() => {
  //   console.log("searchdata :- " +  searchdata)
  // }, [searchdata])

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?q=${searchInput}`, {
      replace: true,
    });
  };

  return (
    <div className=" ">
      <form
        className=" flex align-middle justify-start items-center mx-10"
        onSubmit={handleSearch}
      >
        <input
          className=" px-2 rounded-lg h-14 text-2xl border-gray-200 border-2 w-full mx-4"
          type="text"
          placeholder="Search anything"
          onChange={(e) => {
            setSearchInput(e.target.value.toString());
          }}
        ></input>
        <button className=" p-4 bg-orange text-white text-lg rounded-lg  mx-4">
          Search
        </button>
      </form>
      <div className="w-full p-4">
        {searchdata === null ? (
          <p>Nothing to show</p>
        ) : (
          searchdata["profile_id_list"].map((item, index) => (
            <BlankCard
              key={index}
              business_name={item.business_name}
              business_image={item.business_image}
              business_address={item.business_address}
              main_category={item.main_category}
              business_number={item.business_number}
              rating={4}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Search;
