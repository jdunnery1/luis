import {SignedIn, SignedOut, SignOutButton, useSignIn, useUser} from "@clerk/clerk-react";
import {useEffect, useState} from "react";
import {axiosInstance} from "../lib/axios.js";
import {useNavigate} from "react-router";



const Topbar = ({cart, setCart}) => {

    const { signIn, isLoaded} = useSignIn()
    const {user} = useUser()
    const[admin, setAdmin] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        if (!user) return
        axiosInstance.get(`/users/user?id=${user.id}`).then((res) => {setAdmin(res.data.admin); setCart(res.data.cart)})
    }, [user]); // is admin?

    const handleSignIn = () => {
        signIn.authenticateWithRedirect({
            strategy: 'oauth_google',
            redirectUrl: '/sso-callback',
            redirectUrlComplete: '/auth-callback'
        }).then(() => {console.log('Signed In')})
    }

    return (
        <div className={'w-screen h-fit px-10 py-3 flex justify-between items-center *:select-none'}>
            <div className={'flex justify-between gap-15'}>
                <img onClick={() => navigate('/')} src="/pokeball.png" alt="" className={'size-10'}/>
                <h1 onClick={() => { if (user) navigate('/checkout', {state: {cart: cart}})}} className={'font-[Pixelify_Sans] text-white font text-[28px]'}>Checkout {cart ? `(${cart.length})` : ''}</h1>
            </div>
            <div>
                <SignedOut>
                    <button onClick={handleSignIn} className={'font-[Pixelify_Sans] text-white font-bold text-[28px]'}>Sign in</button>
                </SignedOut>
                <SignedIn>
                    <div className={'flex justify-between gap-20'}>
                        {admin && <button onClick={() => navigate('/admin', {state: admin})} className={'text-[20px] font-[Pixelify_Sans] bg-white rounded-xl px-5'}>Admin</button>}
                        <SignOutButton>
                            <button className={'font-[Pixelify_Sans] text-white font-bold text-[28px]'}>Sign Out</button>
                        </SignOutButton>
                    </div>
                </SignedIn>
            </div>
        </div>
    );
};

export default Topbar;