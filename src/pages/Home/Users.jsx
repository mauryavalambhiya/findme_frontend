import { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
// import useAuth from "../../hooks/useAuth";

const Users = () => {
    const [users, setUsers] = useState(null);
    const axiosPrivate = useAxiosPrivate();
    // const navigate = useNavigate();
    // const location = useLocation();
    // const { auth } = useAuth()
    

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getUsers = async () => {
            try {
                const response = await axiosPrivate.get('/v1/user', {
                    signal: controller.signal,
                    headers: {
                        'origin_private': 'x03467235737',
                    }
                });
                console.log(response.data.message);
                setUsers(response.data.message)
                isMounted && setUsers(response.data.message);
            } catch (err) {
                console.error(err);
                // navigate('/login', { state: { from: location }, replace: true });
            }
        }

        getUsers();

        return () => {
            isMounted = false;
            controller.abort();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        // setUsers(auth.auth?.user)
        console.log('users  :---- ' + JSON.stringify(users))
    }, [users])

    return (
        <article>
            <h2>Users List</h2>

            {
                users == null
                ? <p>Nothing to show</p>
                : <div>
                    <p>{JSON.stringify(users?.phone_number)}</p>
                    {/* <img src=`${JSON.stringify(users.profile_image)}`/> */}
                    <img src={users.profile_image} alt="Profile Image" />
                </div>
            }
            
        </article>
    );
};

export default Users;
