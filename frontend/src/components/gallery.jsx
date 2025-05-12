import {useEffect, useState} from "react";
import {axiosInstance} from "../lib/axios.js";
import Modal from "./modal.jsx";
import {AnimatePresence} from 'motion/react'

const Gallery = ({setModal, setActiveCard}) => {

    const[cards, setCards] = useState([])
    useEffect(() => {
        axiosInstance.get('/cards').then((res) => setCards(res.data))
    }, []); // get cards
    const[query, setQuery] = useState('')

    return (
        <div className={'w-screen h-5/10 py-5 px-5'}>
            <div className={'flex w-full justify-between pl-50'}>
                <h1 className={'text-[#f04037] font-[Pixelify_Sans] text-[40px]'}>Gallery</h1>
                <input onChange={(e) => setQuery(e.target.value)} className={'bg-white text-right outline-none text-[20px] px-5 rounded-3xl'} type="text" placeholder={'Search Cards'}/>
            </div>
            <div className={'w-full h-fit flex flex-wrap gap-5 mt-10 mb-10'}>
                {cards?.filter((c) => c.title.toLowerCase().includes(query)).map((card) => {
                    return (
                        <div onClick={() => {setModal(true); setActiveCard(card)}} className={'w-1/6 overflow-hidden flex flex-col items-center gap-2 *:pointer-events-none *:select-none'}>
                            <img className={'rounded-xl'} src={card.image} alt=""/>
                            <h1 className={'font-bold text-[20px] text-[#f04037] text-center'}>{card.title}</h1>
                            <h2 className={'text-[15px]'}>${card.price}</h2>
                        </div>
                    )
                })}
            </div>

        </div>
    );
};

export default Gallery;