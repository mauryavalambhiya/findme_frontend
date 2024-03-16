/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";

const ManageProfile = () => {
  const [profiles, setProfiles] = useState(null);
  const axiosPrivate = useAxiosPrivate();
  const controller = new AbortController();
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  // const [errormsg, setErrorMsg] = useState(null);
  // const [successmsg, setSuccessMsg] = useState(null)

  const updateList = (id) => {
    setProfiles(prevProfiles => {
      // Filter out the profile with the specified id
      const updatedProfiles = prevProfiles.filter(profile => profile._id !== id);
      return updatedProfiles;
    });
  };

  const deleteProfile = async (id) => {
    const controller = new AbortController();

    try {
      const response = await axiosPrivate.post(
        "v1/admin/deleteprofile",
        {
          business_id: id,
        },
        {
          signal: controller.signal,
          headers: {
            origin_private: "x03467235737",
          },
        }
      );
      // let id_list = response.data.massage.map((massage) => massage._id)
      // setSuccessMsg("Profile successfuly deleted")
      setSuccess("Profile successfully deleted");
      updateList(id)
    } catch (err) {
      console.error(err);
      setError(err.massage);
      // navigate("/login", { state: { from: location }, replace: true });
    }
  };

  const redirectTo = (profile_id) => {
    navigate(`/manageprofile/edit/${profile_id}`);
  };

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
      // let id_list = response.data.massage.map((massage) => massage._id)
      setProfiles(response.data.massage);
      console.log("PROFILE LIST :--- " + JSON.stringify(response.data.massage));
    } catch (err) {
      console.error(err);
      // navigate("/login", { state: { from: location }, replace: true });
    }
  };

  useEffect(() => {
    getProfileList();
  }, []);

  return (
    <>
      <div className=" w-full h-full px-10 my-4 pt-4">
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
                  // setSuccessMsg("")
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
                  // setErrorMsg("")
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

        <div className=" w-full m-auto h-fit text-center font-primary-font">
          <p className=" text-4xl font-bold">All Profiles</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
          {profiles &&
            profiles.map((profile) => (
              <div
                key={profile._id}
                className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col"
              >
                <img
                  className="w-full h-48 object-cover"
                  src={profile.business_image}
                  alt="Profile"
                />
                <div className="p-4 flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      {profile.business_name}
                    </h3>
                    <p className="text-gray-600">
                      {profile.business_description}
                    </p>
                  </div>
                  <div className="flex justify-end items-center mt-4">
                    <button
                      onClick={() => {
                        redirectTo(profile._id);
                      }}
                      className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M13.293 6.293a1 1 0 00-1.414 0l-5 5a1 1 0 101.414 1.414L12 8.414l4.293 4.293a1 1 0 001.414-1.414l-5-5z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        deleteProfile(profile._id);
                      }}
                      className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-100 ml-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 6.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414L11.414 12l3.293 3.293a1 1 0 11-1.414 1.414L10 13.414l-3.293 3.293a1 1 0 01-1.414-1.414L8.586 12 5.293 8.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* <button
          className=" w-fit h-fit p-3 bg-green-400 m-3"
          onClick={() => {
            redirectTo("65f35c967b9ac9fe2b12b5d8");
          }}
        >
          Edit profile  
        </button>
        <button
          className=" w-fit h-fit p-3 bg-green-400 m-3"
          onClick={() => {
            deleteProfile("65caf47aa4748e55eac2148c");
          }}
        >
          Delete profile
        </button>
        <button
          className=" w-fit h-fit p-3 bg-green-400 m-3"
          onClick={() => {
            console.log(profiles);
          }}
        >
          Log profile
        </button> */}
      </div>
    </>
  );
};

export default ManageProfile;
