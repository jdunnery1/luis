import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { motion } from "motion/react"
import {animate} from "motion";
import '../src/styles/carousel.css'

const CardScroller = () => {

    document.querySelector('.react-multi-carousel-track')?.setAttribute('style', 'height: 100%')


    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 10,
            partialVisibilityGutter: 30
            // slidesToSlide: 3 // optional, default to 1.
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 5,
            partialVisibilityGutter: 30
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };
    

    return (
        <div className={'w-full h-5/10 py-3 cursor-default overflow-x-hidden'}>
            <Carousel className={'h-full w-full overflow-x-hidden'} ssr={true} itemClass={'pointer-events-none select-none mr-10 h-full'} centerMode={true} autoPlay={false} autoPlaySpeed={100} infinite={true} responsive={responsive} draggable={false} arrows={false}>
                <div className={'size-80'}><img className={'h-full'} src="/card.jpg" alt=""/></div>
                <div className={'size-80'}><img className={'h-full'} src="/card.jpg" alt=""/></div>
                <div className={'size-80'}><img className={'h-full'} src="/card.jpg" alt=""/></div>
                <div className={'size-80'}><img className={'h-full'} src="/card.jpg" alt=""/></div>
                <div className={'size-80'}><img className={'h-full'} src="/card.jpg" alt=""/></div>
                <div className={'size-80'}><img className={'h-full'} src="/card.jpg" alt=""/></div>
                <div className={'size-80'}><img className={'h-full'} src="/card.jpg" alt=""/></div>
                <div className={'size-80'}><img className={'h-full'} src="/card.jpg" alt=""/></div>
                <div className={'size-80'}><img className={'h-full'} src="/card.jpg" alt=""/></div>
                <div className={'size-80'}><img className={'h-full'} src="/card.jpg" alt=""/></div>
                <div className={'size-80'}><img className={'h-full'} src="/card.jpg" alt=""/></div>
                <div className={'size-80'}><img className={'h-full'} src="/card.jpg" alt=""/></div>
                <div className={'size-80'}><img className={'h-full'} src="/card.jpg" alt=""/></div>
                <div className={'size-80'}><img className={'h-full'} src="/card.jpg" alt=""/></div>
                <div className={'size-80'}><img className={'h-full'} src="/card.jpg" alt=""/></div>
            </Carousel>
        </div>
    )
};

export default CardScroller