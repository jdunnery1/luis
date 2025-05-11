import {CircleCheckBig} from 'lucide-react'
import {useUser} from "@clerk/clerk-react";
import {useEffect} from "react";
import {useNavigate} from "react-router";
import {axiosInstance} from "../lib/axios.js";

const Success = () => {

    const {user} = useUser()
    useEffect(() => {
        console.log(user?.id)
        const userRes = axiosInstance.get(`/users/user?id=${user?.id}`).then((res) => {
            res.data.cart.forEach((card) => {
                console.log(`${card.title} ${card.qty}`)
                axiosInstance.put('/cards/update-qty', {card: card, qty: -1})
            })
        })
        axiosInstance.put('/users/empty-cart', {id: user?.id})
    }, []);

    setTimeout(function() {
        window.location.href = '/';
    }, 3000);

    return (
        <div className={'w-screen h-screen bg-[#f04037] flex items-center justify-center'}>
            <div className={'w-2/4 h-2/4 bg-white rounded-3xl flex flex-col items-center justify-center py-5'}>
                <CircleCheckBig className={'size-30 text-emerald-500'}/>
                <h1 className={'font-bold font-[Pixelify_Sans] text-[40px] mb-0'}>Thank You!</h1>
                <h2 className={'text-[20px] font-bold'}>We've received your order</h2>
                <h3>Redirecting....</h3>
            </div>
        </div>
    );
};

export default Success;