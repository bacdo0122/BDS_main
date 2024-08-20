import { useMemo, useState } from "react";
import defaultHomeImage from "../../assets/images/home-main-photo-example.jpg";
import ImageThumbnail from "./ImageThumbnail";
import RoomView from "./RoomView";

const HomeImage = ({ src }) => {
    const images = useMemo(() => src.split(';'), [src]);
    console.log("src:", images)
    // const images = [
    //     '/path-to-image1.png',
    //     '/path-to-image2.png',
    //     '/path-to-image3.png',
    //     '/path-to-image4.png',
    // ];
    const [currentImage, setCurrentImage] = useState(0);

    const handlePrev = () => {
        console.log(1);
        setCurrentImage((prev) => (prev > 0 ? prev - 1 : images.length - 1));
    };

    const handleNext = () => {
        console.log(currentImage < images.length - 1 ? currentImage + 1 : 0);
        setCurrentImage((prev) => (prev < images.length - 1 ? prev + 1 : 0));
    };

    return (
        <div>
            <RoomView
                images={images}
                onPrev={handlePrev}
                onNext={handleNext}
                currentImage={currentImage}
            />
            <ImageThumbnail images={images} onClick={setCurrentImage} />
        </div>
    );
};

export default HomeImage;
