/* eslint-disable no-unused-vars */
import axios from "axios";
import useAuth from './useAuth'
import { useEffect } from "react";
import { useCookies } from 'react-cookie';

const useLogout = () => {
    
    const { setAuth, persist, setPersist  } = useAuth();
    const [sessionCookies, setSessionCookie, removeSessionCookie] = useCookies(['SessionID']);
    const [jwtCookies, setJwtCookie, removeJwtCookie] = useCookies(['jwt']);

    useEffect(() => {
        localStorage.setItem("persist", persist);
    }, [persist])

    const logout = async () => {
    setAuth({});
    removeSessionCookie('SessionID');
    removeJwtCookie('jwt');
    console.log("sessionCookies :--- " + sessionCookies)
    console.log("jwtCookies :--- " + jwtCookies)
    setPersist(prev => prev == true ? !prev : prev);

    try {
        const response = await axios('/logout', {
            withCredentials: true
        });
    } catch (err) {
        console.error(err);
    }
}

return logout;
}

export default useLogout