import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
// import SearchBar from "../../components/SearchBar";
import axios  from "axios";
import BlankCard from "../../components/BlankCard";


const Search = () => {
  const [locparams, setLocParams] = useState(null);
  const [mainparams, setMainParams] = useState(null);
  const [subparams, setSubParams] = useState(null);
  const [qparams, setQParams] = useState(null);
  const [pageLoded, setPageLoded] = useState(false)
  var [searchdata, setSearchData] = useState(null);
  // const [locparams, setLocParams] = useState(null);
  const location = useLocation();

  function getData(query, maincat, subcat){
    console.log("Get data :- " + query + " " + maincat + " " + subcat)

    let data = JSON.stringify({
      "search_query": query + " " + maincat + " " + subcat
    });
    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://localhost:5000/v1/user/search',
      headers: { 
        'ORIGIN_PRIVATE': 'x078672399', 
        'API_KEY': 'API-kkj234rKJEWFI4HV3YCH84N7TNC8T', 
        'Content-Type': 'application/json', 
        'Cookie': 'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX3Bob25lbm8iOiI5OTc4OTE2NDk5IiwiaWF0IjoxNzA4Njg5MTM3LCJleHAiOjE3MDg3NzU1Mzd9.o1-0nQ_D54uF1U1u9kxp-IX3aXtzORyt0JWCrOnctNw'
      },
      data : data
    };
    
    axios.request(config)
    .then((response) => {
      setSearchData()
      setSearchData(response.data)
      // console.log(JSON.stringify(response.data.profile_id_list));
    })
    .catch((error) => {
      console.log(error);
    });

  }

  function getLocData(query, maincat, subcat, location){
    // locparams
    let data = JSON.stringify({
      "search_query": `${query} ${maincat} ${subcat}`,
      "gps_location" : location

    });

    console.log("DATA :-- "  + data);
    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://localhost:5000/v1/user/search',
      headers: { 
        'ORIGIN_PRIVATE': 'x078672399', 
        'API_KEY': 'API-kkj234rKJEWFI4HV3YCH84N7TNC8T', 
        'Content-Type': 'application/json', 
        'Cookie': 'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX3Bob25lbm8iOiI5OTc4OTE2NDk5IiwiaWF0IjoxNzA4Njg5MTM3LCJleHAiOjE3MDg3NzU1Mzd9.o1-0nQ_D54uF1U1u9kxp-IX3aXtzORyt0JWCrOnctNw'
      },
      data : data
    };
    
    axios.request(config)
    .then((response) => {
      setSearchData()
      setSearchData(response.data)
      // console.log(JSON.stringify(response.data.profile_id_list));
    })
    .catch((error) => {
      console.log(error);
    });
  }

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const latValue = queryParams.get("lat");
    const longValue = queryParams.get("long");
    const qValue = queryParams.get("q");
    const mainValue = queryParams.get("maincat");
    const subValue = queryParams.get("subcat");
    if(!qValue){
      setQParams("")
    }else{
      setQParams(qValue);
    }
    if (!mainValue) {
      setMainParams("");
    }else{
      setMainParams(mainValue);
    }
    if (!subValue) {
      setSubParams("");
    }else{
      setSubParams(subValue);
    }

    if( latValue != null || longValue != null){
      setLocParams([22.2873299, 70.7986046])
    }else{
      setLocParams([latValue,longValue])
    }

    setPageLoded(true)
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

  return (
    <div className=" "> 
      <form className=" flex align-middle justify-start items-center mx-10">
        <input className=" px-2 rounded-lg h-14 text-2xl border-gray-200 border-2 w-full mx-4" type="text" placeholder="Search anything" ></input>
        <button className=" p-4 bg-orange text-white text-lg rounded-lg  mx-4">Search</button>
      </form>
      <div className="w-full p-4">
      {
        searchdata === null
        ? <p>Nothing to show</p>
        : searchdata['profile_id_list'].map((item, index) => (
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
      }
    </div>
    </div>
  );
};

export default Search;
