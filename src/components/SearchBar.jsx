/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import SearchIcon from '../assets/nimbus_search.svg'
import { useState } from 'react';

const SearchBar = () => {

  const [searchinput, setsearchinput] = useState("")
  // eslint-disable-next-line no-unused-vars
  function handleSearch(event) {
    event.preventDefault();
  }

  return (
    <>
      <form className="flex flex-raw  justify-center align-middle items-center w-full" onSubmit={(e) => {handleSearch(e)}}>
        {/* <div className=" w-full flex flex-col"> */}
        <div className='flex align-middle items-center w-full justify-center '>
            <input 
              className="min-h-fit h-10 md:h-12 max-w-4xl w-full  bg-slate-400 bg-opacity-15 text-txt-white px-3 py-2 border-0 border-none ring-2 ring-gray-500 focus:ring-2 focus:ring-gray-300 text-lg  rounded-lg  md:rounded-2xl"
              placeholder='Search Places'
              onChange={(e) => { setsearchinput(e.target.value)}}
            ></input>
            {/* <button>
              <img src={SearchIcon} className='min-h-fit h-10 md:h-12 md:px-1 w-fit mx-2'></img>
            </button> */}
            <Link to={`/search?q=${searchinput}`}>
              <img src={SearchIcon} className='min-h-fit h-10 md:h-12 md:px-1 w-fit mx-2'></img>
            </Link>

        </div>
      </form>
    </>
  )
}

export default SearchBar