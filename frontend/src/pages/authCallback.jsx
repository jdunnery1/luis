import {Loader} from "lucide-react";
import {useEffect} from "react";
import {useUser} from "@clerk/clerk-react";
import {axiosInstance} from "../lib/axios.js";
import {useNavigate} from "react-router";

const AuthCallback = () => {

    const { isLoaded, user } = useUser()
    const navigate = useNavigate()

    useEffect(() => {
        const syncUser = async () => {
            try {
                if (!isLoaded || !user) return
                await axiosInstance.post('/auth/callback', {
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName
                })
            } catch (e) {
                console.log(e)
            } finally {
                navigate('/')
            }
        }

        syncUser()
        navigate('/')
    }, [isLoaded, user, navigate]);

    return (
        <div className={'w-screen h-screen flex items-center justify-center bg-[#f04037]'}>
            <div className={'w-1/4 h-1/4 bg-white shadow-xl flex flex-col items-center justify-around py-5 rounded-3xl'}>
                <h1 className={'text-black font-bold text-[30px]'}>Logging you In...</h1>
                <Loader className={'size-10 text-red-500 animate-spin'}/>
            </div>
        </div>
    );
};

export default AuthCallback;