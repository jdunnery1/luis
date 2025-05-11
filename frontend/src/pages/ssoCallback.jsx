import {Loader} from "lucide-react";
import {AuthenticateWithRedirectCallback} from "@clerk/clerk-react";

const SsoCallback = () => {
    return (
        <div className={'w-screen h-screen flex items-center justify-center bg-[#f04037]'}>
            <div className={'w-1/4 h-1/4 bg-white shadow-xl flex flex-col items-center justify-around py-5 rounded-3xl'}>
                <h1 className={'text-black font-bold text-[30px]'}>Logging you In...</h1>
                <Loader className={'size-10 text-red-500 animate-spin'}/>
            </div>
            <AuthenticateWithRedirectCallback signUpForceRedirectUrl={'/auth-callback'} />
        </div>
    );
};

export default SsoCallback;