import React from 'react';
import { Box, CardMedia } from '@mui/material';

const ImageThumbnail = ({ images, onClick }) => {
    return (
        <Box display="flex" justifyContent="center" mt={2}>
            {images.map((image, index) => (
                <CardMedia
                    key={index}
                    component="img"
                    height="100"
                    image={image}
                    alt={`Thumbnail ${index}`}
                    onClick={() => onClick(index)}
                    style={{ marginRight: 8, cursor: 'pointer', maxWidth: '25%',height: '200px' }}
                />
            ))}
        </Box>
    );
};

export default ImageThumbnail;