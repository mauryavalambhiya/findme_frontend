import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
// import SearchBar from "../../components/SearchBar";
import axios  from "axios";
import BlankCard from "../../components/BlankCard";


const Search = () => {
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

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
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
    setPageLoded(true)
  }, []);

  useEffect(() => {
    if (pageLoded == true){
      getData(qparams, mainparams,subparams)
    }
  }, [pageLoded])

  // useEffect(() => {
  //   console.log("searchdata :- " +  searchdata)
  // }, [searchdata])

  return (
    <div className=" "> 
      <form className=" flex align-middle justify-start items-center mx-10">
        <input className=" px-2 rounded-lg h-14 text-2xl border-gray-200 border-2 w-full mx-4" type="text" placeholder="Search anything" ></input>
        <button className=" p-4 bg-orange text-white text-lg rounded-lg  mx-4">Search</button>
      </form>
      <div className=" w-full p-4">
        {
          searchdata == null
          ? <p>Nothing to show</p>
          : <p>{JSON.stringify(searchdata['profile_id_list'][0])}</p>
        }
        <BlankCard rating={4}></BlankCard>
      </div>
    </div>
  );
};

export default Search;
