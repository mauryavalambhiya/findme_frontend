import { useState } from "react"
import useAxiosPrivate from "../../hooks/useAxiosPrivate"

const ManageProfile = () => {

  const [profiles, setProfiles] = useState(null)
  const axiosPrivate = useAxiosPrivate();
  const controller = new AbortController();


  const getProfileList = async () => {
    try {
      const response = await axiosPrivate.post("/v1/admin/getprofilesbyid",
      {
        profile_id : '65cc76fb9870d3c22ae1fd7d'
      },
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

  return (
    <>
    <div>ManageProfile</div>
    <div className=" m-auto">
      <p>Profile By id</p>
      <button className=" w-fit h-fit px-3 py-2 bg-yellow-800 text-white" onClick={getProfileList}>Get Profile list</button>
      {
        profiles == null
        ? <p>Nothing to show ....</p>
        : <p>{JSON.stringify(profiles)}</p>
      }
    </div>
    </>
  )
}

export default ManageProfile