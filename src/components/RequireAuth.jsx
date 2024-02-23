/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({allowedRoles}) => {
    const { auth } = useAuth();
    const location = useLocation();
    console.log(JSON.stringify(auth))

    return (
        auth?.user
            ? <Outlet/>
            :<Navigate to="/login" state={{ from : location}}  replace/>
    )

    // return (
    //     auth?.user
    //         ? auth?.roles?.find(role => allowedRoles?.includes(role))
    //             ? <Outlet />
    //             : auth?.user
    //                 ? <Navigate to="/unauthorized" state={{ from: location }} replace />
    //                 : <Navigate to="/login" state={{ from: location }} replace />
    //         :<Navigate to="/login" state={{ from : location}}  replace/>
    // )
}

export default RequireAuth


// /* eslint-disable react/prop-types */
// import { useLocation, Navigate, Outlet } from "react-router-dom";
// import useAuth from "../hooks/useAuth";

// const RequireAuth = ({allowedRoles}) => {
//     const { auth } = useAuth();
//     const location = useLocation();
//     console.log(JSON.stringify(auth))

//     return (
//         auth?.role.find(role => allowedRoles?.includes(role))
//             ? <Outlet/>
//             : auth?.user
//                 ?<Navigate to="/unauthorised" state={{from : location}} replace ></Navigate>
//                 :<Navigate to="/login" state={{ from : location}}  replace/>
//     )
// }

// export default RequireAuth