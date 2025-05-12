import {motion} from "motion/react";
import Backdrop from "./backdrop.jsx";
import {axiosInstance} from "../lib/axios.js";
import {useUser} from "@clerk/clerk-react";
import {useEffect, useState} from "react";

const dropIn = {
    hidden: {
        y: "-100vh",
        opacity: 0,
    },
    visible: {
        y: "0",
        opacity: 1,
        transition: {
            duration: 0.1,
            type: "spring",
            damping: 25,
            stiffness: 500,
        },
    },
    exit: {
        y: "100vh",
        opacity: 0,
    },
};

const Modal = ({handleClose, activeCard, addToCart}) => {

    const {user} = useUser()
    const[admin, setAdmin] = useState(false)
    const handleCart = () => {
        addToCart(activeCard)
        axiosInstance.put('/users/add-cart', {id: user?.id, card: activeCard})
        handleClose()
    }

    useEffect(() => {
        axiosInstance.get(`/users/user?id=${user?.id}`).then((res) => setAdmin(res.data.admin))
    }, []);

    const handleRemove = () => {
        axiosInstance.delete(`/cards/remove?cardId=${activeCard.cardId}`)
        window.location.reload()
    }

    return (
        <Backdrop onClick={handleClose}>
            <motion.div className={'w-3/10 h-3/4 bg-white rounded-3xl relative overflow-hidden flex flex-col items-center justify-between min-w-[248px] max-sm:w-[95%] max-sm:h-[60%]'} onClick={(e) => e.stopPropagation()} variants={dropIn} initial={'hidden'} animate={'visible'} exit={'exit'}>
                <div className={'w-full h-full flex flex-col items-center'}>
                    <div className={'w-full h-2/3 py-3 flex justify-center'}>
                        <img src={activeCard?.image} className={'scale-100'} alt=""/>
                    </div>
                    <div className={'w-full h-1/3 bg-[#f04037] border-t-5 flex flex-col px-3 items-center justify-between pb-5'}>
                        <div className={'flex w-full justify-between items-center'}>
                            <h1 className={'text-[30px] font-bold text-white'}>{activeCard?.title}</h1>
                            <h1 className={'text-white text-[20px]'}>${activeCard.price}</h1>
                        </div>
                        <div className={'w-full flex justify-between'}>
                            <h1 className={'text-white font-bold text-[20px]'}>From {activeCard?.set}</h1>
                            <h1 className={'text-white font-bold text-[20px]'}>{activeCard?.qty} in Stock</h1>
                        </div>
                        {user && <button onClick={handleCart} className={'bg-white w-full rounded-xl text-[25px] font-[Pixelify_Sans]'}>Add to Cart</button>}
                    </div>
                </div>
                {admin && <button onClick={handleRemove} className={'absolute top-5 right-3 bg-[#f04037] text-white font-bold px-3 py-2 rounded-xl'}>Remove</button>}
            </motion.div>
        </Backdrop>
    )
}

export default Modal

