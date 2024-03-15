/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ImageUpload from "../../components/ImageUpload";
import ImagePriview from "../../components/ImagePriview";
import { axiosPrivate } from "../../services/backen_api/axios";
// import { HiOutlineArrowCircleRight } from "react-icons/hi";

const fields = [
  {
    label: "Business Name",
    type: "text",
    placeholder: "Sterling Hospital",
    required: true,
    gridCols: 1,
  },
  {
    label: "Business Description",
    type: "Area",
    placeholder: "Eye Treatment,Cancer Treatment...",
    required: true,
    gridCols: 1,
  },
  {
    label: "Location",
    type: "text",
    placeholder: "Enter your location",
    required: true,
    gridCols: 1,
  },
  {
    label: "Category",
    type: "Category",
    placeholder: "Select Category",
    required: true,
    gridCols: 1,
    options: ["Education", "Hospital", "Daily Needs", "Gym", "Restaurent"],
  },
  {
    label: "Sub Category",
    type: "Sub Category",
    placeholder: "Select Sub Category",
    required: true,
    gridCols: 1,
    options: [
      "School",
      "Collages",
      "Coaching",
      "Vocational Training",
      "Competitive Training",
      "Typing School",
      "Children Hospital",
      "Eye Hospital",
      "Maternity Hospital",
      "Mental Hospital",
      "Public Hospital",
      "Veterinary Hospital",
      "MultiSpeciality Hospital",
      "Indian Flavours",
      "Global Cuisines",
      "Quick Bites",
      "Sweet Tooth",
      "5+ Stars",
      "Grocery",
      "Milk & Milk Products",
      "Fruits & Vegetables",
      "Stationery Store",
      "Medicines",
      "Laundry Services",
      "Electricians",
    ],
  },
  {
    label: "Phone",
    type: "tel",
    placeholder: "+919723130309",
    required: true,
    gridCols: 2,
    options: ["Mobile", "Landline", "Work"],
  },
  {
    label: "Address",
    type: "text",
    placeholder: "123 Main St, City, Country",
    required: true,
    gridCols: 2,
  },
];

export default function AddProfile() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const [isDisabled, setIsDisabled] = useState(true)
  const [isImgDisabled, setIsImgDisabled] = useState(true)
  const [imgUrl, setImgUrl] = useState("")
  const [location, setLocation] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState( false)
  const [errormsg, setErrorMsg] = useState(null);
  const [successmsg, setSuccessMsg] = useState(null)

  const submitData = async (data) => {
    const controller = new AbortController();

    const business_name = data['business name']
    const business_description = data['business description']
    const tegs_list= []
    const business_address = data['address']
    const business_number = data['phone']
    const business_image = data['imgUrl']
    const gps_location = data['location']
    const main_category = data['category']
    const sub_category = data['sub category']


      const response = await axiosPrivate.post("/v1/admin/addprofile",
      {
        business_name : business_name,
        business_description: business_description,
        tegs_list : tegs_list,
        business_address : business_address,
        business_number :business_number,
        business_image: business_image,
        gps_location : gps_location,
        main_category : main_category,
        sub_category :sub_category
      },
      {
        signal: controller.signal,
        headers: {
          'origin_private': 'x03467235737',
        },
      });
        return true

    

    // try {
    //   const response = await axiosPrivate.post("/v1/admin/addprofile",
    //   {
    //     business_name : business_name,
    //     business_description: business_description,
    //     tegs_list : tegs_list,
    //     business_address : business_address,
    //     business_number :business_number,
    //     business_image: business_image,
    //     gps_location : gps_location,
    //     main_category : main_category,
    //     sub_category :sub_category
    //   },
    //   {
    //     signal: controller.signal,
    //     headers: {
    //       'origin_private': 'x03467235737',
    //     },
    //   });
    //   if(response){
    //     return true
    //   }else{
    //     return false  
    //   }
    // } catch (err) {
    //   console.log("Error .....................")
    //   console.error(err );
    //   setError(true)
    //   setErrorMsg(err.massage)
    //   return false
    //   // navigate("/login", { state: { from: location }, replace: true });
    // }
  }
  const getLocation = () => {
    // Add code to fetch current location here
    // Example:
    navigator.geolocation.getCurrentPosition((position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      setLocation([latitude, longitude]);
      setValue("location", [latitude, longitude]);
    //   setLocation(${latitude}, ${longitude});
    //   setValue("location", ${latitude}, ${longitude});
    });
  };

  const onImgUploadComplete = (data) => {
    // console.log(JSON.stringify(data.url));
    setImgUrl(data.url)
    setIsImgDisabled(false)
    setValue("imgUrl", data.url);
    setIsDisabled(false)
  }

  const onSubmit = (data, event) => {
    event.preventDefault();
    console.log(data);
    if(data.imgUrl == null || data.imgUrl == undefined){
      setError(true)
      setErrorMsg("Image URL is required.");
      return; // Stop further execution
    }
    setIsImgDisabled(false)
    var status = submitData(data)
    status = true
    if( status == true){
      setSuccess(true)
      setSuccessMsg("Profile added successfully")
      console.log("Form submited")
    }else{
      setError(true)
      setErrorMsg("Somthing went wrong :(");
      console.log("Form not submited")
    }
    // You can perform further actions with the form data here
  };

  return (
    <div>
      {success && (
        <div className="fixed top-3 inset-0 z-50 flex items-start justify-center pointer-events-none">
          {/* Success message */}
          <div className="absolute px-8 py-6 bg-green-500 text-white flex justify-between rounded shadow-lg transition-all transform -translate-y-full opacity-0 translate-y-0 opacity-100 pointer-events-auto">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 mr-6"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
              </svg>
              <p>Success! {successmsg}</p>
            </div>
            <button
              className="text-green-100 hover:text-white"
              onClick={() => {
                setSuccess(false)
                setSuccessMsg("")
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {error && (
        <div className="fixed top-3 inset-0 z-50 flex items-start justify-center pointer-events-none">
          <div className="absolute px-8 py-6 bg-red-500 text-white flex justify-between rounded shadow-lg transition-all transform -translate-y-full opacity-0 translate-y-0 opacity-100 pointer-events-auto">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 mr-6"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                />
              </svg>
              <p>Warning! {errormsg}</p>
            </div>
            <button className="text-red-100 hover:text-white"
            onClick={() => {
              setError(false)
              setErrorMsg("")
            }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      <div className="container mx-auto">
        <div className="lg:w-7/12 pb-10 pt-5 w-full p-4 flex flex-wrap justify-center shadow-2xl my-20 rounded-md mx-auto">
          <div className="pb-5">
            <h1 className="text-3xl font-bold">Add Profile</h1>
          </div>
          <form
            onSubmit={(event) => {
              handleSubmit(onSubmit)(event);
            }}
            className="flex flex-col justify-start items-center w-full m-auto"
          >
            <div className="grid grid-cols-1 mb-6 md:grid-cols-2 gap-3 w-full">
              {fields.map((field, index) => (
                <div
                  key={index}
                  className={`text-left flex flex-col gap-2 w-full ${
                    field.gridCols === 2 ? "md:col-span-2" : ""
                  }`}
                >
                  <label className="font-semibold">{field.label}</label>
                  {field.label === "Location" ? (
                    <div className="flex items-center">
                      <input
                        {...register(field.label.toLowerCase(), {
                          required: field.required,
                        })}
                        className={`border border-gray-300 text-sm font-semibold mb-1 max-w-full w-full outline-none rounded-md m-0 py-3 px-4 md:py-3 md:px-4 md:mb-0 focus:border-red-500 ${
                          field.gridCols === 2 ? "md:w-full" : ""
                        }`}
                        type={field.type}
                        placeholder={field.placeholder}
                        value={location}
                        style={{ maxWidth: "500px" }} // Adjust width here
                      />
                      <button
                        type="button"
                        className="ml-2 py-3 px-4 w-72 bg-blue-500 text-white text-md font-bold border border-blue-500 rounded-md ease-in-out duration-150 shadow-slate-600 hover:bg-white hover:text-blue-500"
                        onClick={getLocation}
                      >
                        Get Location
                      </button>
                    </div>
                  ) : field.label === "Category" ||
                    field.label === "Sub Category" ? (
                    <select
                      {...register(field.label.toLowerCase(), {
                        required: field.required,
                      })}
                      className={`border border-gray-300 text-sm font-semibold mb-1 max-w-full w-full outline-none rounded-md m-0 py-3 px-4 md:py-3 md:px-4 md:mb-0 focus:border-red-500 ${
                        field.gridCols === 2 ? "md:w-full" : ""
                      }`}
                    >
                      <option value="" disabled selected>
                        {field.placeholder}
                      </option>
                      {field.options.map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      {...register(field.label.toLowerCase(), {
                        required: field.required,
                      })}
                      className={`border border-gray-300 text-sm font-semibold mb-1 max-w-full w-full outline-none rounded-md m-0 py-3 px-4 md:py-3 md:px-4 md:mb-0 focus:border-red-500 ${
                        field.gridCols === 2 ? "md:w-full" : ""
                      }`}
                      type={field.type}
                      placeholder={field.placeholder}
                    />
                  )}
                  {errors[field.label.toLowerCase()] && (
                    <span>This field is required</span>
                  )}
                </div>
              ))}
            </div>
            <div className=" w-full h-fit flex justify-center gap-3 mb-6">
              {isImgDisabled ? (
                <></>
              ) : (
                <ImagePriview
                  urlEndpoint="https://ik.imagekit.io/findme/"
                  imgUrl={imgUrl}
                  width="100"
                ></ImagePriview>
              )}
              <ImageUpload
                urlEndpoint="https://ik.imagekit.io/findme/"
                folderPath="/products-pics"
                successListener={(data) => {
                  onImgUploadComplete(data);
                }}
                errorListener={(err) => {
                  setError(true);
                  setErrorMsg(err);
                }}
              ></ImageUpload>
              {/* {r && <span className="text-red-500">{errormsg}</span>} */}
            </div>
            <div className="w-full text-left">
              <div className="flex justify-between w-full">
                <button
                  type="submit"
                  className={`flex justify-center items-center gap-2 py-3 px-4 bg-red-500 text-white text-md font-bold border border-red-500 rounded-md ease-in-out duration-150 shadow-slate-600 hover:bg-white hover:text-red-500 lg:m-0 md:px-6 mr-2 disabled:opacity-50 disabled:cursor-not-allowed`}
                  disabled={isDisabled}
                  title="Add"
                >
                  <span>ADD</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}