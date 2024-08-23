import React from 'react';
import { Box, Typography, Card, CardMedia, CardContent, Grid } from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BedIcon from '@mui/icons-material/Bed';
import BathtubIcon from '@mui/icons-material/Bathtub';
import CropSquareIcon from '@mui/icons-material/CropSquare';
const properties = [
  {
    id: 1,
    title: "Bán nhà mặt phố NG V Cừ, Long Biên, 75m , 8T...",
    price: "28 tỷ 800 triệu",
    size: "75 m²",
    location: "Long Biên, Hà Nội",
    imageUrl: "/path/to/image1.jpg",
    totalImages: 5,
  },
  {
    id: 2,
    title: "Bán nhanh liền kề Vinhomes Gardenia, 94m2 5...",
    price: "34 tỷ",
    size: "94 m²",
    location: "Nam Từ Liêm, Hà Nội",
    imageUrl: "/path/to/image2.jpg",
    totalImages: 4,
  },
  {
    id: 3,
    title: "Chính chủ cho thuê kho xưởng tiêu chuẩn đầy đ...",
    price: "17 triệu",
    size: "3339 m²",
    location: "Long Biên, Hà Nội",
    imageUrl: "/path/to/image3.jpg",
    totalImages: 6,
  },
];

function HotPropertiesList({properties}) {
  return (
    <Box sx={{ padding: '16px', flex: 1, marginTop: '4%' }}>
          <Typography 
        variant="h5" 
        sx={{ 
          marginBottom: '8px' ,
          color: '#fff'
        }}
      >
       Danh sách các bất động sản đang hot hiện nay
      </Typography>
      <Grid container spacing={2}>
        {properties.map((property) => (
          <Grid item xs={12} key={property.id}>
            <Card sx={{ display: 'flex' }}>
              <CardMedia
                component="img"
                sx={{ width: 151 }}
                image={property.image && property.image.length > 0 ? property.image.split(';')[0] : "https://images.unsplash.com/photo-1591474200742-8e512e6f98f8?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGx1eHVyeSUyMGhvdXNlfGVufDB8fDB8fHww"}
                alt={property.title}
              />
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
       {property.title}
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
        {property.price} tỷ • {property.area} m² • {property.pricePerArea} tr/m²
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
        <Typography sx={{ marginRight: '16px' }}>{property.bedrooms}</Typography>
        
        <BathtubIcon sx={{ color: '#666', marginRight: '4px' }} />
        <Typography sx={{ marginRight: '16px' }}>{property.bathrooms}</Typography>

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
          {property.address}
        </Typography>
      </Box>

      {/* Short Description */}
      <Typography sx={{ marginTop: '8px' }}>
        {property.title}
      </Typography>
    </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default HotPropertiesList;