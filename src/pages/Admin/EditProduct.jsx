/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ImageUpload from "../../components/ImageUpload";
import ImagePriview from "../../components/ImagePriview";
import { axiosPrivate } from "../../services/backen_api/axios";
// import { joinPaths } from "@remix-run/router";
import { useNavigate, useParams } from "react-router-dom";
// import { HiOutlineArrowCircleRight } from "react-icons/hi";

const fields = [
  {
    label: "Product Name",
    type: "text",
    placeholder: "Lenovo V15 Intel Celeron N4500 15.6",
    required: true,
    gridCols: 2,
  },
  {
    label: "Product Description",
    type: "Area",
    placeholder: "ntel Celeron N4500 processor, base speed 1.1 Ghz.....",
    required: true,
    gridCols: 2,
  },
];

export default function EditProduct() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const { productId } = useParams();
  const [isDisabled, setIsDisabled] = useState(false)
  const [isImgDisabled, setIsImgDisabled] = useState(true)
  const [imgUrl, setImgUrl] = useState("")
  const [location, setLocation] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState( false)
  // const [errormsg, setError] = useState(null);
  // const [successmsg, setSuccess] = useState(null)
  const [productIdList, setProductIdList] = useState([])
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState(null)
  const [selectedProfilesList, setselectedProfilesList] = useState([])


  const setFieldData = async () => {
    const controller = new AbortController();
    try {
      const response = await axiosPrivate.post("/v1/admin/getproductbyid",
      {
        project_id : productId
      },
      {
        signal: controller.signal,
        headers: {
          'origin_private': 'x03467235737',
        },
      });
      // let id_list = response.data.massage.map((massage) => massage._id)
      setValue('product name',response.data.massage.product_name)
      setValue('product description',response.data.massage.product_disc)
      setValue('selected_profiles',response.data.massage.profile_id)
      setselectedProfilesList(response.data.massage.profile_id)
      setValue('imgUrl',response.data.massage.product_image)
      setImgUrl(response.data.massage.product_image)
      setIsImgDisabled(false)
      setIsDisabled(false)
    } catch (err) {
      console.error(err );
      // navigate("/login", { state: { from: location }, replace: true });
    }
  }

  // set the data automatically in field
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

  // to check wether productid is valid or not in url
  useEffect(() => {
    console.log("Product id :- " + productId);
    let isMounted = true;
    const controller = new AbortController();

    const getProductList = async () => {
      try {
        const response = await axiosPrivate.post(
          "/v1/admin/getproduct",
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
        isMounted && setProductIdList(response.data.massage);

        if( id_list.includes( productId)){
          console.log("Product ID DOES EXIST" )
        }else{
          console.log("ID DOES NOT EXIST" )
          navigate("/addproduct",{ replace : true});
        }
      } catch (err) {
        console.error(err);
        // navigate("/login", { state: { from: location }, replace: true });
      }
    };

    getProductList();

    return () => {
      isMounted = false;
      controller.abort();
    };
  },[]);

  // manage the state of selected profiles using checkboxes
  const checkBoxClick = (event) => {
    console.log("Id :- " + event.target.value);
    if(selectedProfilesList.includes(event.target.value)){
      setselectedProfilesList(selectedProfilesList.filter((value) => value !== event.target.value));
    }else{
      setselectedProfilesList((prevSelectedList) => {
        // Create a new array by spreading the previous list
        const selected = [...prevSelectedList];
        // Add the new value to the array
        selected.push(event.target.value);
        // Return the updated array
        return selected;
      });
    }
  };
  
  // whenever any of the checkboxes changes(checked or unchecked) set the value in 
  // Form component state
  useEffect(() => {
    console.log("UPDATED :-- " + selectedProfilesList)
    setValue('selected_profiles', selectedProfilesList)
  },[selectedProfilesList])

  // get the profile from backend to be listed in form
  const getProfileList = async () => {
    const controller = new AbortController();

    try {
      const response = await axiosPrivate.post("/v1/admin/getprofiles",
      {},
      {
        signal: controller.signal,
        headers: {
          'origin_private': 'x03467235737',
        },
      });
      // let id_list = response.data.massage.map((massage) => massage._id)
      setProfiles(response.data.massage)
      console.log("PROFILE LIST :--- " + JSON.stringify(response.data.massage))

    } catch (err) {
      console.error(err );
      // navigate("/login", { state: { from: location }, replace: true });
    }
  }

  // initiate the process of getting profile information associated with user id
  useEffect(() => {
    getProfileList()
  },[])

  // take the form data as parameter and submit that using post request
  const submitData = async (data) => {
    const controller = new AbortController();

    const product_name = data['product name']
    const product_image = data['imgUrl']
    const product_disc = data['product description']
    const tegs_list= []
    const profile_id = data['selected_profiles']

    console.log("data :-- " + JSON.stringify(data))
      const response = await axiosPrivate.post("/v1/admin/editproduct",
      {
        product_id : productId,
        product_disc : product_disc,
        product_name : product_name,
        profile_id :profile_id,
        tegs_list : tegs_list,
        product_image : product_image,
      },
      {
        signal: controller.signal,
        headers: {
          'origin_private': 'x03467235737',
        },
      });
        return true
  }

  // get the geolocation
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

  // callback function when image upload completed successfully, 
  // set the image priview to true 
  // set the imgUrl property in form component state
  // setIsDisabled enable the save/add button
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

    if(selectedProfilesList.length == 0 || selectedProfilesList == null || selectedProfilesList == undefined){
      setError("Plese select atleast one profile");
      return; // Stop further execution
    }
    if(data.selected_profiles == null || data.selected_profiles == undefined){
      setError("Plese select profile");
      return; // Stop further execution
    }
    if(data.imgUrl == null || data.imgUrl == undefined){
      setError("Image URL is required.");
      return; // Stop further execution
    }
    setIsImgDisabled(false)
    var status = submitData(data)
    status = true
    if( status == true){
      setSuccess("Product details updated successfully")
      console.log("Form submited")
    }else{
      setError("Somthing went wrong :(");
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
              <p>Success! {success}</p>
            </div>
            <button
              className="text-green-100 hover:text-white"
              onClick={() => {
                setSuccess(false);
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
                <path d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" />
              </svg>
              <p>Warning! {error}</p>
            </div>
            <button
              className="text-red-100 hover:text-white"
              onClick={() => {
                setError(false);
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
            <h1 className="text-3xl font-bold">Edit Product</h1>
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
            {
              profiles && 
              <div className=" w-full h-fit flex flex-wrap justify-start gap-3 mb-6">
                <div className="relative flex w-full max-w-[24rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
                  <nav className="flex min-w-[240px]  flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700">
                    {profiles.map(profile => (
                        <div
                          key={profile._id}
                          role="button"
                          className="flex items-center w-full p-0 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
                        >
                          <label
                            htmlFor={profile._id}
                            className="flex items-center w-full px-3 py-2 cursor-pointer"
                          >
                            <div className="grid mr-3 place-items-center">
                              <div className="inline-flex items-center">
                                <label
                                  className="relative flex items-center p-0 rounded-full cursor-pointer"
                                  htmlFor={profile._id}
                                >
                                  <input
                                    checked={ selectedProfilesList.includes(profile._id)? true : false}
                                    id={profile._id}
                                    type="checkbox"
                                    name="profile"
                                    value={profile._id}
                                    onChange={checkBoxClick}
                                    className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-0"
                                  />
                                  <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="h-3.5 w-3.5"
                                      viewBox="0 0 20 20"
                                      fill="currentColor"
                                      stroke="currentColor"
                                    >
                                      <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"></path>
                                    </svg>
                                  </span>
                                </label>
                              </div>
                            </div>
                            <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
                              {profile.business_name}
                            </p>
                          </label>
                        </div>
                      ))
                      
                    }
                  </nav>
                </div>
              </div>
            }
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
                  setError(err);
                }}
              ></ImageUpload>
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
                  className="flex justify-center items-center gap-2 py-3 px-4 bg-blue-500 text-white text-md font-bold border border-blue-500 rounded-md ease-in-out duration-150 shadow-slate-600 hover:bg-white hover:text-blue-500 lg:m-0 md:px-6 mr-2 disabled:opacity-50 disabled:cursor-not-allowed"
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
