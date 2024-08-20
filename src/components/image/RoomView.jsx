import React, { useRef } from 'react';
import { Box, Card, CardMedia, IconButton } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Slider from 'react-slick';
import './RoomView.css'
const RoomView = ({ images, onPrev, onNext, currentImage }) => {
    const sliderRef = useRef(null);
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        initialSlide: currentImage,
    }; 

    React.useEffect(() => {
        if (sliderRef.current) {
            sliderRef.current.slickGoTo(currentImage);
        }
    }, [currentImage]);
    return (
        <Card>
            <Slider {...settings} ref={sliderRef}>
                {images.map((image, index) => (
                    <img
                        key={index}
                        component="img"
                        height="300"
                        src={image}
                        alt={`Room view ${index}`}
                        style={{ maxWidth: '80%', objectFit: 'contain', margin: '0 auto' }}
                    />
                ))}
            </Slider>
        </Card>
    );
};

export default RoomView;