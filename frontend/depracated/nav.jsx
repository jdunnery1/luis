import {SignedIn, SignedOut, SignOutButton, useSignIn, useUser} from "@clerk/clerk-react";
import {useEffect, useState} from "react";
import {axiosInstance} from "../src/lib/axios.js";

export const Nav = () => {

    const { signIn, isLoaded } = useSignIn()
    const {user} = useUser()
    const[admin, setAdmin] = useState(false)

    useEffect(() => {
        if (user?.id) {
            axiosInstance.get(`/users/user?id=${user.id}`).then((res) => {
                setAdmin(res.data.admin)
            })
        }
    }, [user]); // is admin?

    const handleSignIn = () => {
        signIn.authenticateWithRedirect({
            strategy: 'oauth_google',
            redirectUrl: '/sso-callback',
            redirectUrlComplete: '/auth-callback'
        })
    }

    return (
        <div id={'nav'} className={'w-full h-1/10 bg-[#ef4036] flex justify-between items-center px-5 cursor-default'}>
            <div id={'nav-left'} className={'flex justify-between items-center gap-10'}>
                <img src="/pokeball.png" alt="" className={'size-12'}/>
                <h1 className={'text-white font-bold text-[23px] font-[Pixelify_Sans]'}>Home</h1>
                <h1 className={'text-white font-bold text-[23px] font-[Pixelify_Sans]'}>Cart</h1>
            </div>
            {admin && <button className={'text-black text-[20px] font-[Pixelify_Sans] bg-white px-5 py-2 border-black border-2 rounded-md'}>Admin</button>}
            <div id={'nav-right'} className={'bg-neutral-50 px-3 py-2 border-black border-2 rounded-md'} onClick={handleSignIn}>
                <SignedOut><button className={'text-black text-[20px] font-[Pixelify_Sans]'}>Sign In</button></SignedOut>
                <SignedIn><SignOutButton><button className={'text-black text-[20px] font-bold font-[Pixelify_Sans]'}>Sign Out</button></SignOutButton></SignedIn>
            </div>
        </div>
    )
}