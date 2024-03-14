/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ImageUpload from "../../components/ImageUpload";
import ImagePriview from "../../components/ImagePriview";
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
  const [error, setError] = useState(null);


  useEffect(() => {
    const delayedFunction = () => {
      // Code to be executed after the delay
      setValue("address", "Maurya")
    };

    // Set up the timeout
    const timeoutId = setTimeout(delayedFunction, 2000); // Change the delay time as needed

    // Clean-up function
    return () => {
      // Clear the timeout to prevent memory leaks
      clearTimeout(timeoutId);
    };
  },[])

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
      setError("Image URL is required.");
      return; // Stop further execution
    }
    setIsImgDisabled(false)
    console.log("Form submited")
    // You can perform further actions with the form data here
  };

  return (
    <div>
      <div className="container mx-auto">
        <div className="lg:w-7/12 pb-10 pt-5 w-full p-4 flex flex-wrap justify-center shadow-2xl my-20 rounded-md mx-auto">
          <div className="pb-5">
            <h1 className="text-3xl font-bold">Add Profile</h1>
          </div>
          <form
            onSubmit={(event) => {handleSubmit(onSubmit)(event)}}
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
                  ) : (field.label === "Category" || field.label === 'Sub Category') ? (
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
                  ): (
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
              { isImgDisabled 
              ?<></>
              :<ImagePriview urlEndpoint="https://ik.imagekit.io/findme/" imgUrl={imgUrl} width="100"></ImagePriview>
              }
              <ImageUpload urlEndpoint="https://ik.imagekit.io/findme/" folderPath="/products-pics" successListener={(data) => {onImgUploadComplete(data)}} errorListener={ (err) => { setError(err)}}></ImageUpload>
              {error && <span className="text-red-500">{error}</span>}
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
                <button
                  type="submit"
                  className="flex justify-center items-center gap-2 py-3 px-4 bg-blue-500 text-white text-md font-bold border border-blue-500 rounded-md ease-in-out duration-150 shadow-slate-600 hover:bg-white hover:text-blue-500 lg:m-0 md:px-6"
                  title="Save"
                >
                  <span>SAVE</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      
    </div>
  );
}