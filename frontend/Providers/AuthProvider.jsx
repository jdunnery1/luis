
import {AuthenticateWithRedirectCallback, useAuth} from "@clerk/clerk-react";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import {axiosInstance} from "../src/lib/axios.js";

const updateApiToken = (token) => {
    if (token) axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    else delete axiosInstance.defaults.headers.common["Authorization"];
};

const AuthProvider = ({ children }) => {
    const { getToken, userId } = useAuth();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initAuth = async () => {
            try {
                const token = await getToken();
                updateApiToken(token);
            } catch (error) {
                updateApiToken(null);
                console.log("Error in auth provider", error);
            } finally {
                setLoading(false);
            }
        };

        initAuth();

        // clean up
    }, [getToken, userId]);

    if (loading)
        return (
            <div className={'w-screen h-screen flex items-center justify-center bg-[#f04037]'}>
                <div className={'w-1/4 h-1/4 bg-white shadow-xl flex flex-col items-center justify-around py-5 rounded-3xl'}>
                    <Loader className={'size-10 text-red-500 animate-spin'}/>
                </div>
            </div>
        );

    return <>{children}</>;
};
export default AuthProvider;