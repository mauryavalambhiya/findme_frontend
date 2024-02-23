/* eslint-disable no-unused-vars */
import {useState, useRef , useEffect, useContext} from 'react'
import AuthContext from '../../context/AuthProvider';
import axios  from '../../services/backen_api/axios';

const LOGIN_URL = '/v1/auth/login'
const OTP_URL = '/v1/auth/onboard'
export const Login = () => {

  const { setAuth } = useContext(AuthContext)
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [otp, setOtp] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [ success, setSuccess] = useState(false);

  useEffect( () => {
    userRef.current.focus()
  },[])

  useEffect ( () => {
    setErrMsg('');

  }, [user, otp])

  async function handleSubmit(e){
    e.preventDefault()
    // console.log("Submited")
    try{
      const response = await axios.post(
        LOGIN_URL,
        {
          phone_number: user,
          otp: otp
        },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true 
        }
      );
      // console.log("DATA := " + JSON.stringify(response?.data));      
      // console.log("RESPONCE" + JSON.stringify(response));      
      const accessToken = response?.data?.accessToken;
      // const roles = response?.data?.roles;
      setAuth({user, otp, accessToken})
      setUser('')
      setOtp('')
      setSuccess(true)
      console.log("SUCCESSFULL ")

    }catch(err){
      console.log(e.massage)
      if( !err?.response){
          setErrMsg('No server Response')
      }else if (err.response?.status === 501){
        setErrMsg("Invalid OTP. Please try again with the correct credentials.")
      }
      else if ( err.response?.status === 422){
        setErrMsg("Invalid OTP. Please try again with the correct credentials.")
      }else{
        setErrMsg("Unknown error. Login Failed")
      }
      console.log("ERROR")
      errRef.current.focus()
    }

  }

  return (
    <>
    {
       success 
       ? <section>
        <h1>You are logged in!</h1>
        <br></br>
        <p><a href='#'>Go to Home</a></p>
       </section>
       :<div className=" flex align-middle h-lvh w-fit m-auto">
        <div className="flex flex-col justify-center align-middle items-start m-auto w-fit  border-2 border-gray-900 rounded-lg">
        <div className=" w-fit flex  p-4 align-middle justify-center items-center">
          <div className="flex flex-row justify-center align-middle p-3 m-3 border-r-2 ">
            <p className="inline text-black font-logo-font text-4xl">find</p>
            <p className="inline text-orange font-logo-font text-4xl underline">
              Me
            </p>
          </div>
          <div className="flex flex-col justify-center align-middle m-3">
            <p className="inline text-black  font-primary-font text-md">
              Welcome
            </p>
            <p className="inline text-black font-primary-font text-md underline m-auto mr-10">
              Login for better experience
            </p>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className=" flex flex-row justify-center align-middle items-start ml-5 border-b-2">
            <div className="  m-auto  pr-4  border-r-2">
              <label htmlFor='phonenumber' className=" text-3xl font-light">+91</label>
            </div>
            <input
              id='phonenumber'
              className=" border-none focus:border-gray-400 focus:border-2 w-[270px] h-14 font-normal text-2xl pl-2"
              type="text"
              placeholder="Phone Number"
              ref={userRef}
              autoComplete='off'
              onChange={(e) => { setUser(e.target.value)}}
              value={user}
              required
            ></input>
            <button type="button" className=" bg-orange h-fit rounded-md p-2 align-middle text-center hover:bg-orange hover:bg-opacity-80 font-primary-font" onClick={() => console.log("Clicked")}>
                <p className=" text-txt-white font-primary-font">Send SMS</p>
            </button>
          </div>
          <div className="  flex flex-row justify-center align-middle items-start ml-5  border-b-2 p-4">
            <div className="  m-auto  pr-4  border-r-2">
              <label htmlFor='otp' className=" text-3xl font-light">OTP</label>
            </div>
            <input
              id='otp'
              className=" border-none focus:border-gray-400 focus:border-2 w-[270px] h-14 font-normal text-2xl pl-2"
              type="password"
              placeholder="Enter Otp"
              autoComplete='off'
              onChange={(e) => {  setOtp(e.target.value)}}
              value={otp}
              required
            ></input>
          </div>
        <div className=" flex flex-col w-full h-fit p-4 items-center">
          <button type='submit' className=" bg-orange w-fit h-fit rounded-md p-2 px-16 align-middle text-center hover:bg-orange hover:bg-opacity-80 font-primary-font">
              <p className=" text-txt-white font-primary-font">Login with Otp</p>
          </button>
          <p className="m-4">
            Maybe letter
          </p>
          <p className={`m-4 ${errMsg ? 'block' : 'hidden'}`} ref={errRef} aria-live='assertive'>
            {errMsg !== undefined ? "Not error" : errMsg}
          </p>
        </div>
        </form>

      </div>
    </div>
    }
    </>
  );
};
