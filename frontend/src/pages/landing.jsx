import HeaderContent from "../components/headerContent.jsx";
import Gallery from "../components/gallery.jsx";
import Modal from "../components/modal.jsx";
import {AnimatePresence} from "motion/react";
import {useEffect, useState} from "react";
import {axiosInstance} from "../lib/axios.js";
import {useUser} from "@clerk/clerk-react";

const Landing = () => {

    const[modalOpen, setModal] = useState(false)
    const[activeCard, setCard] = useState({})
    const[cart, setCart] = useState([])
    const {user} = useUser()

    useEffect(() => {
        console.log(cart)
    }, [cart]);

    const addCard = (card) => {
        console.log(cart.filter((c) => c.cardId === card.cardId))
        if (cart.filter((c) => c.cardId === card.cardId).length > 0) {
            cart.filter((c) => c.cardId === card.cardId)[0].qty += 1
            setCart([...cart])
            axiosInstance.put('/users/increment-qty', {id: user?.id, cardId: card.cardId})
        } else {
            setCart([...cart, card])
            axiosInstance.put('/users/add-cart', {id: user?.id, card: activeCard})
        }
    }

    return (
        <div className={'w-full h-full relative overflow-y-auto flex flex-col gap-30'}>
            <div className={'w-full h-[1080px] absolute bg-[url(/background.png)] z-[-1]'}></div>
            <HeaderContent setCart={(c) => setCart(c)} cart={cart} />
            <Gallery setModal={() => setModal(true)} setActiveCard={(card) => setCard(card)}/>
            <AnimatePresence initial={false} exitBeforeEnter={true} onExitComplete={() => null}>
                {modalOpen && <Modal addToCart={(card) => addCard(card)} modalOpen={modalOpen} activeCard={activeCard} handleClose={() => {setModal(false)}}/>}
            </AnimatePresence>
        </div>
    )
}

export default Landing