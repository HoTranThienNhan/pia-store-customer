import { Image } from 'antd';
import React from 'react';
import Slider from "react-slick";

const SliderComponent = ({ arrImages }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 1500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3500
    };
    return (
        <Slider {...settings}>
            {
                arrImages.map((image) => {
                    return (
                        <Image src={image} alt="slider" preview={false} />
                    )
                })
            }
        </Slider>
    )
};

export default SliderComponent

