import Topbar from "../components/topbar.jsx";
import {useLocation, useNavigate} from "react-router";
import { motion } from "motion/react"
import {useUser} from "@clerk/clerk-react";
import {useEffect, useState} from "react";
import {axiosInstance} from "../lib/axios.js";
import {loadStripe} from "@stripe/stripe-js";

const Checkout = () => {

    const[cart, setCart] = useState([])
    const {user} = useUser()
    const navigate = useNavigate()

    useEffect(() => {
        if (!user) navigate('/')
        axiosInstance.get(`/users/user?id=${user?.id}`).then((res) => setCart(res.data.cart))
    }, []);

    const removeItem = (card) => {
        setCart(cart.filter((c) => c.cartId !== card.cartId ))
        axiosInstance.put('/users/del-cart', {id: user.id, card: card})
    }

    const makePayment = async () => {
        if (cart.length <= 0) return
        const stripe = await loadStripe('pk_test_51RKLaSD5mItnEVPO787RI3mTLlfo1AOTfMQD0fedPM1M2LhfCFyuWwNQpXtXu7URcIkgINolge7IyU2afTG1IjSa00OHBMqqY0')

        const response = await axiosInstance.post('/stripe/create-checkout-session', {products: cart}).then((res) => {
            const session = res.data
            const result = stripe.redirectToCheckout({
                sessionId: session.id
            })
        })
    }

    return (
        <div className={'w-screen h-screen overflow-hidden'}>
            <div className={'bg-[#f04037]'}>
                <Topbar setCart={() => {}}/>
            </div>
            <div className={'w-full h-full flex'}>
                <div className={'w-1/2 h-full overflow-y-auto p-10'}>
                    <h1 className={'text-[40px] font-[Pixelify_Sans] border-b-2 w-fit pr-20 border-[#f04037]'}>Cart</h1>
                    {cart.length > 0 ? cart?.map((card) => {
                        return (
                            <div className={'w-full h-1/5 overflow-hidden flex shadow-xl rounded-xl px-10 py-3 justify-between mb-5'}>
                                <div className={'flex gap-5'}>
                                    <img className={'h-full'} src={card.image} alt=""/>
                                    <div>
                                        <h1 className={'text-[28px] font-bold'}>{card.title}</h1>
                                        <h2>Qty: {card.qty}</h2>
                                        <h2>${card.price}</h2>
                                    </div>
                                </div>
                                <motion.button whileHover={{color: `#f04037`}} onClick={() => removeItem(card)}>Remove</motion.button>
                            </div>
                        )
                    }) : <h1 className={'text-[25px] mt-5'}>Nothing Yet!</h1>}
                </div>
                <div className={'w-1/2 h-full shadow-xl flex flex-col items-center justify-center gap-10'}>
                    <h1 className={'text-[50px] font-bold'}>Sub Total : ${cart.length > 0 ? cart.reduce((price, curr) => price + curr.price, 0) : '0.00'}</h1>
                    <button onClick={makePayment} className={'bg-[#f04037] px-5 py-3 rounded-xl w-3/4 text-white font-bold text-[30px]'}>Pay</button>
                </div>
            </div>
        </div>
    );
};

export default Checkout;