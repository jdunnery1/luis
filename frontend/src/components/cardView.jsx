import {useEffect, useState} from "react";
import {axiosInstance} from "../lib/axios.js";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const CardView = () => {

    const[cards, setCards] = useState([])
    useEffect(() => {
        axiosInstance.get('/cards').then((res) => setCards(res.data.reverse()))
        document.querySelector('.react-multi-carousel-track ')?.setAttribute('style', 'height: 100%')
    }, []);

    function isDateInThisWeek(date) {
        const today = new Date();
        const firstDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay())); // Get the first day (Sunday) of the current week
        const lastDayOfWeek = new Date(today.setDate(today.getDate() + 6)); // Get the last day (Saturday) of the current week

        return date >= firstDayOfWeek && date <= lastDayOfWeek;
    }


    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3,
            slidesToSlide: 1 // optional, default to 1.
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
            slidesToSlide: 2 // optional, default to 1.
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1 // optional, default to 1.
        }
    }; // carousel sizing

    return (
        <div className={'w-screen h-[400px] px-10 flex gap-5 justify-between py-5 mt-10'}>
            <div className={`w-1/2 h-full px-5 ${cards.filter((c) => isDateInThisWeek(new Date(c.createdAt))).length > 2 ? '' : 'flex justify-center'}`}>
                {cards.filter((c) => isDateInThisWeek(new Date(c.createdAt))).length > 2 ?
                    <Carousel className={'w-full h-full'} responsive={responsive} swipeable={false} arrows={false} draggable={false} ssr={true} infinite={true} autoPlay={true} autoPlaySpeed={1000}>
                        {cards.filter((c) => isDateInThisWeek(new Date(c.createdAt))).map((card) => {
                            return (
                                <img src={card?.image} className={'rounded-md h-full object-cover'} draggable={false} alt=""/>
                            )
                        })}
                    </Carousel>
                    :
                    <img src={cards[0]?.image} draggable={false} className={'rounded-md'} alt=""/>
                }
            </div>
            <div className={'w-1/2 h-full pr-15'}>
                <h1 className={'text-white font-bold text-[50px] text-nowrap'}>About Us</h1>
                <p className={'text-white text-[15px]/7'}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
        </div>
    );
};

export default CardView;