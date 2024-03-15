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
      setSuccess("Profile successfuly deleted");
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
      <div className=" w-full h-full bg-slate-400 p-10">
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

        <div className=" w-full bg-slate-50 ">
          {/* <p>Hiii</p> */}
        </div>
        {/* {profiles && <p>{JSON.stringify(profiles)}</p>} */}

        <button
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
        {/* <button className=" w-fit h-fit p-3 bg-green-400 m-3" onClick={()=>{
        setSuccess("Success masage generated!")
      }}>Make success</button>
      <button className=" w-fit h-fit p-3 bg-green-400 m-3" onClick={() => {
        setError("Error masage generated!")
      }}>Make error</button> */}
      </div>
    </>
  );
};

export default ManageProfile;
