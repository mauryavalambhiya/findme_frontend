/* eslint-disable react/prop-types */
const LocationBtn = (props) => {
  return (
    <button className=" bg-transparent  border-2 w-fit h-fit flex rounded-md p-2 px-4 justify-center items-center  text-center hover:bg-slate-600 hover:bg-opacity-60" onClick={() => {props.onBtnClick()}}>
      <img src={props.iconImg} className="w-8 h-8" alt="" />
        <p className=" text-txt-white font-primary-font text-lg">{props.btnName}</p>
    </button>
  )
}

export default LocationBtn