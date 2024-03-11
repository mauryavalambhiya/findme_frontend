import axios from "../services/backen_api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        const response = await axios.get('/v1/auth/refresh', {
            withCredentials: true,
            headers: {
                'origin_private' : "x03467235737"
            }
        });
        console.log("refresh token res :- ", JSON.stringify(response))
        setAuth(prev => {
            // console.log(JSON.stringify(prev));
            // console.log(response.data.accessToken);
            return { 
                ...prev, 
                accessToken: response.data.accessToken,
                role : response.data.role
             }
        });
        return response.data.accessToken;
    }
    return refresh;
};

export default useRefreshToken;
