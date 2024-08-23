import { Link } from 'react-router-dom';
import { HiMiniMapPin } from "react-icons/hi2";
import HomeImage from '../../image/HomeImage';
import BedIcon from '@mui/icons-material/Bed';
import BathtubIcon from '@mui/icons-material/Bathtub';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CropSquareIcon from '@mui/icons-material/CropSquare';
import './HomeCard.scss';
import { Box, Typography } from '@mui/material';

const HomeCard = ({ homeId, photoUrl, title, description, price, 
    isDetailImage = false, address, bathrooms, bedrooms, pricePerArea, area}) => {
    return (
        <article className="property-card">
            <article className="property-image-container">
            <Link to={`/home-details/${homeId}`}>
                {isDetailImage ? <HomeImage src={photoUrl} /> : <img src={photoUrl} alt="Home" />}
            </Link>
            </article>

            <Box 
      sx={{ 
        borderRadius: '8px', 
        padding: '16px', 
        marginBottom: '16px',
        maxWidth: '500px'
      }}
    >
      {/* Title */}
      <Typography 
        variant="h6" 
        sx={{ 
          fontWeight: 'bold', 
          marginBottom: '8px' 
        }}
      >
       {title}
      </Typography>

      {/* Price and Size */}
      <Typography 
        variant="h5" 
        sx={{ 
          color: '#d32f2f', 
          fontWeight: 'bold', 
          marginBottom: '8px' 
        }}
      >
        {price} tỷ • {area} m² • {pricePerArea} tr/m²
      </Typography>

      {/* Icons for Details */}
      <Box 
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          marginBottom: '8px' 
        }}
      >
        <BedIcon sx={{ color: '#666', marginRight: '4px' }} />
        <Typography sx={{ marginRight: '16px' }}>{bedrooms}</Typography>
        
        <BathtubIcon sx={{ color: '#666', marginRight: '4px' }} />
        <Typography sx={{ marginRight: '16px' }}>{bathrooms}</Typography>

      </Box>

      {/* Location */}
      <Box 
        sx={{ 
          display: 'flex', 
          alignItems: 'center' 
        }}
      >
        <LocationOnIcon sx={{ color: '#666', marginRight: '4px' }} />
        <Typography sx={{ color: '#666' }}>
          {address}
        </Typography>
      </Box>

      {/* Short Description */}
      <Typography sx={{ marginTop: '8px' }}>
        {title}
      </Typography>
    </Box>
        </article>
    );
};

export default HomeCard;
