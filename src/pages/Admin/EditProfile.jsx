/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ImageUpload from "../../components/ImageUpload";
import ImagePriview from "../../components/ImagePriview";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
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

export default function EditProfile() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const { profileId } = useParams();
  const [isDisabled, setIsDisabled] = useState(true)
  const [isImgDisabled, setIsImgDisabled] = useState(true)
  const [imgUrl, setImgUrl] = useState("")
  const [location, setLocation] = useState("");
  const [error, setError] = useState(null);
  const axiosPrivate = useAxiosPrivate();
  const [profileList, setProfileList] = useState([]);
  const navigate = useNavigate();

  const setFieldData = async () => {
    const controller = new AbortController();
    try {
      const response = await axiosPrivate.post("/v1/admin/getprofilesbyid",
      {
        profile_id : profileId
      },
      {
        signal: controller.signal,
        headers: {
          'origin_private': 'x03467235737',
        },
      });
      // let id_list = response.data.massage.map((massage) => massage._id)
      setValue('address', response.data.massage.business_address)
      setValue('business description',response.data.massage.business_description)
      setValue('business name',response.data.massage.business_name)
      setValue('category',response.data.massage.main_category)
      setValue('imgUrl',response.data.massage.business_image)
      setValue('location',response.data.massage.gps_location.coordinates)
      setValue('phone',response.data.massage.business_number)
      setValue('sub category',response.data.massage.sub_category)
      setImgUrl(response.data.massage.business_image)
      setLocation(response.data.massage.gps_location.coordinates)
      setIsImgDisabled(false)
      setIsDisabled(false)
      // console.log("Profile data :--- " + JSON.stringify(response.data.massage))

      // setProfiles(response.data.massage)
      // console.log("PROFILE LIST :--- " + JSON.stringify(response.data.massage))

    } catch (err) {
      console.error(err );
      // navigate("/login", { state: { from: location }, replace: true });
    }
  }

  useEffect(() => {
    console.log("Profile id :- " + profileId);
    let isMounted = true;
    const controller = new AbortController();

    const getProfileList = async () => {
      try {
        const response = await axiosPrivate.post(
          "/v1/admin/getprofiles",
          {},
          {
            signal: controller.signal,
            headers: {
              origin_private: "x03467235737",
            },
          }
        );
        let id_list = response.data.massage.map((massage) => massage._id)
        // console.log("PROFILE LIST :--- " + JSON.stringify(id_list));
        isMounted && setProfileList(response.data.massage);

        if( id_list.includes( profileId)){
          console.log("ID DOES EXIST" )
        }else{
          console.log("ID DOES NOT EXIST" )
          navigate("/manageprofile");
        }
      } catch (err) {
        console.error(err );
        // navigate("/login", { state: { from: location }, replace: true });
      }
    };

    getProfileList();

    return () => {
      isMounted = false;
      controller.abort();
    };
  },[]);

  useEffect(() => {
    const delayedFunction = () => {
      // Code to be executed after the delay
      // setValue("address", "Maurya")
      setFieldData()
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

  const SubmitData = async (data) => {
    const controller = new AbortController();

    const business_id = profileId
    const business_name = data['business name']
    const business_description = data['business description']
    const tegs_list= []
    const business_address = data['address']
    const business_number = data['phone']
    const business_image = data['imgUrl']
    const gps_location = data['location']
    const main_category = data['category']
    const sub_category = data['sub category']

    try {
      const response = await axiosPrivate.post("/v1/admin/editprofile",
      {
        business_id : business_id,
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
    } catch (err) {
      console.error(err );
      setError(err.massage)
      return false
      // navigate("/login", { state: { from: location }, replace: true });
    }

  }

  const onSubmit = (data, event) => {
    event.preventDefault();
    // console.log(data);
    if(data.imgUrl == null || data.imgUrl == undefined){
      setError("Image URL is required.");
      return
    }
    setIsImgDisabled(false)
    const status = SubmitData(data)
    if( status == true){
      console.log("Form submited")
    }else{
      console.log("Form not submited")

    }
    // You can perform further actions with the form data here
  };

  return (
    <div>
      <div className="container mx-auto">
        <div className="lg:w-7/12 pb-10 pt-5 w-full p-4 flex flex-wrap justify-center shadow-2xl my-20 rounded-md mx-auto">
          <div className="pb-5">
            <h1 className="text-3xl font-bold">Edit Profile</h1>
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
                {/* <button
                  type="submit"
                  className={`flex justify-center items-center gap-2 py-3 px-4 bg-red-500 text-white text-md font-bold border border-red-500 rounded-md ease-in-out duration-150 shadow-slate-600 hover:bg-white hover:text-red-500 lg:m-0 md:px-6 mr-2 disabled:opacity-50 disabled:cursor-not-allowed`}
                  disabled={isDisabled}
                  title="Add"
                >
                  <span>ADD</span>
                </button> */}
                <button
                  type="submit"
                  className="flex justify-center items-center gap-2 py-3 px-4 bg-blue-500 text-white text-md font-bold border border-blue-500 rounded-md ease-in-out duration-150 shadow-slate-600 hover:bg-white hover:text-blue-500 lg:m-0 md:px-6"
                  title="Save"
                  disabled={isDisabled}
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