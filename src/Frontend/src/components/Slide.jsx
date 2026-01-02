import { useState } from "react";
import banner1 from "../assets/img/banner/banner_1.png";
import { useEffect } from "react";

const slides = [banner1, banner1, banner1];

const Slide = () => {
    const [index, setIndex] = useState(0);
    // next
    const nextSlide = () => {
        if (index >= slides.length - 1) {
            setIndex(0);
        } else {
            setIndex(prev => prev + 1);
        }
    }
    // prev
    const prevSlide = () => {
        if (index <= 0) {
            setIndex(slides.length - 1);
        } else {
            setIndex(prev => prev - 1)
        }
    }
    // Auto slide mỗi 5 giây
    useEffect(() => {
        const timer = setTimeout(() => {
            nextSlide();
        }, 5000);

        return () => clearTimeout(timer);
    }, [index]); // chạy lại mỗi khi index đổi

    return (
        <div className=" relative w-full h-60 flex overflow-hidden ">
            {slides.map((slide, i) => {
                return (
                    <img
                        key={i}
                        src={slide}
                        className={`absolute transition-all rounded-2xl duration-700 ease-in-out w-full h-full  p bg-fixed  flex-shrink-0 bg-cover ${i === index ? 'opacity-100' : '  opacity-0'} `}
                    />
                )
            })}
            {/* <button className=" absolute bottom-[50%] right-[-14px] w-15 h-15 bg-white  rounded-full opacity-25 hover:opacity-65 cursor-pointer transition-all duration-300 ease-in-out" onClick={nextSlide}> next </button>
                <button className="absolute bottom-[50%] left-1 w-15 h-15 bg-white rounded-full opacity-25 hover:opacity-65 cursor-pointer transition-all duration-300 ease-in-out" onClick={prevSlide}> prev </button> */}
        </div>

    );

}


export default Slide;