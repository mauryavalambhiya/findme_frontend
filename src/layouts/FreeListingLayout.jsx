/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
// import OrangeBtn from '../components/OrangeBtn'

const FreeListingLayout = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const [currentLocation, setCurrentLocation] = useState(null)
  const [ secondLastLocation, setsecondLastLocation] = useState(null)

  useEffect(() => {
    let parts = location.pathname.split('/')
    let loc = parts[parts.length - 1]
    let second_loc = parts[parts.length - 2]
    // console.log("Location :---" + JSON.stringify(parts[parts.length - 1]))
    setCurrentLocation(loc)
    setsecondLastLocation(second_loc)
  }, [location])

  useEffect(() => {
    console.log("currentLocation :--- " + currentLocation)
  }, [currentLocation])

  // const handleAddProductClick = () => {
  //   console.log('Add Product')
  // }

  return (
    <>
    {/* <div className=' w-fit px-10 md:w-full bg-slate-400  h-fit md:px-6 md:py-2 flex flex-col  md:flex-row justify-evenly items-center align-middle rounded-lg mx-auto'>
      <div className=' w-fit h-fit my-1 md:p-0 '>
      <OrangeBtn btnName={"ADD PRODUCT"} onClickFunc={handleAddProductClick}></OrangeBtn>
      </div>
      <div className=' w-fit h-fit my-1 md:p-0 '>
      <OrangeBtn btnName={"ADD PRODUCT"} onClickFunc={handleAddProductClick}></OrangeBtn>
      </div>
      <div className=' w-fit h-fit my-1 md:p-0 '>
      <OrangeBtn btnName={"ADD PRODUCT"} onClickFunc={handleAddProductClick}></OrangeBtn>
      </div>
    </div> */}

    {/* <div className='  h-fit px-6 py-2 md:mx-32 flex md:flex-row justify-evenly items-center align-middle md:rounded-lg overflow-auto shadow-[0_-5px_60px_-15px_rgba(0,0,0,0.3)]'> */}
    {/* <div className='h-fit px-6 py-2 md:mx-32 flex md:flex-row justify-evenly items-center align-middle md:rounded-lg overflow-auto shadow-[0_10px_20px_rgba(240,_46,_170,_0.7)]'> */}
    <div className='h-fit px-6 py-2 md:mx-32 flex md:flex-row justify-evenly items-center align-middle md:rounded-lg overflow-auto shadow-top-left'>
    
      <div className=' w-fit h-full my-1 mx-2 md:mx-2 md:p-0  '>
        <button className={`${(currentLocation == 'addproduct') || (secondLastLocation == 'editproduct') ? `bg-orange`: ` bg-slate-400`} w-full md:w-fit  h-full rounded-md p-2 px-4 align-middle text-center hover:bg-orange hover:bg-opacity-80 hover:bg-gray-400`} onClick={() => { navigate('addproduct')}}>
          <p className=" text-txt-white font-primary-font ">Add Product</p>
        </button>
      </div>
      <div className=' w-fit h-fit my-1 mx-2 md:mx-2 md:p-0  '>
        <button className={` ${ currentLocation == 'listitem' ? `bg-orange`: ` bg-slate-400`} w-full md:w-fit  h-fit rounded-md p-2 px-4 align-middle text-center hover:bg-orange hover:bg-opacity-80`} onClick={() => { navigate('listitem')}}>
          <p className=" text-txt-white font-primary-font">List Item</p>
        </button>
      </div>
      <div className=' w-fit h-fit my-1 mx-2 md:mx-2 md:p-0  '>
        <button className={` ${ (currentLocation == 'manageprofile' || secondLastLocation == 'edit' || currentLocation == 'add') ? `bg-orange`: ` bg-slate-400`} w-full md:w-fit  h-fit rounded-md p-2 px-4 align-middle text-center hover:bg-orange hover:bg-opacity-80`} onClick={() => { navigate('manageprofile')}}>
          <p className=" text-txt-white font-primary-font">Manage Profile</p>
        </button>
      </div>
    </div>
    <Outlet></Outlet>
    </>
  )
}

export default FreeListingLayout