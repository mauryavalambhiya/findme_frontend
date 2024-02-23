import SearchIcon from '../assets/nimbus_search.svg'

const SearchBar = () => {

  // eslint-disable-next-line no-unused-vars
  function handleSearch(event) {
    event.preventDefault();
    console.log('Form submited');
  }

  return (
    <>
      <form className="flex flex-raw  justify-center align-middle items-center w-full" onSubmit={(e) => {handleSearch(e)}}>
        {/* <div className=" w-full flex flex-col"> */}
        <div className='flex align-middle items-center w-full justify-center '>
            <input 
              className="min-h-fit h-10 md:h-12 max-w-4xl w-full  bg-slate-400 bg-opacity-15 text-txt-white px-3 py-2 border-0 border-none ring-2 ring-gray-500 focus:ring-2 focus:ring-gray-300 text-lg  rounded-lg  md:rounded-2xl"
              placeholder='Search Places'
            ></input>
            <button>
              <img src={SearchIcon} className='min-h-fit h-10 md:h-12 md:px-1 w-fit mx-2'></img>
            </button>
        </div>
      </form>
    </>
  )
}

export default SearchBar