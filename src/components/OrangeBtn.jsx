/* eslint-disable react/prop-types */
const OrangeBtn = (props) => {
  return (
    <>
    <button className={`bg-orange ${props.width && `w-fit`}  h-fit rounded-md p-2 px-4 align-middle text-center hover:bg-orange hover:bg-opacity-80`} onClick={() => {props.onClickFunc()}}>
        <p className=" text-txt-white font-primary-font">{props.btnName}</p>
    </button>
    </>
  )
}

export default OrangeBtn