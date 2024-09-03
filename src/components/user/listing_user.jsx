import React, { useEffect, useState } from 'react';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { Box, Button, Avatar, Typography } from '@mui/material';
import { fetchUserDetails } from '../../api/homeApi';
import { getListingsUser } from '../../api/userApi';



const ListingUser = ({userDetails}) => {
  const [listings, setListings ] = useState([]);
  const getListings = () => {
    if(userDetails.id){
      getListingsUser(userDetails.id)
    .then((data) => {
      setListings(data.data);
    });
   }
  };
  
  useEffect(getListings, [userDetails]);
  const columns = [
    { field: 'id', headerName: 'ID', width: 80 },
    { field: 'title', headerName: 'Tiêu đề', width: 150 },
    { field: 'description', headerName: 'Mô tả', width: 200, 
      valueGetter: (params) => params.replace(/\\n|\n/g, '<br>') },
    { field: 'address', headerName: 'Địa chỉ', width: 150 },
    { field: 'area', headerName: 'Diện tích', width: 100 },
    { field: 'price', headerName: 'Giá', width: 100 },
    { field: 'status', headerName: 'Tình trạng', width: 120 },
    { field: 'legal_status', headerName: 'Pháp lý', width: 100,
      valueGetter: (params) => params ? 'Hợp lệ' : 'Không hợp lệ' },
    { field: 'bedrooms', headerName: 'Số phòng ngủ', width: 120 },
    { field: 'bathrooms', headerName: 'Số phòng tắm', width: 120 },
    { field: 'furnishing', headerName: 'Nội thất', width: 100, 
      valueGetter: (params) => params ? 'Có' : 'Không' },
    { field: 'orientation', headerName: 'Hướng', width: 100 },
    { field: 'pricePerArea', headerName: 'Giá/m²', width: 100 },
    { field: 'expiration_date', headerName: 'Ngày hết hạn', width: 150,
      valueGetter: (params) => new Date(params).toLocaleDateString() },
    { field: 'createAt', headerName: 'Ngày tạo', width: 150, 
      valueGetter: (params) => new Date(params).toLocaleDateString() },
    { field: 'updatedAt', headerName: 'Ngày cập nhật', width: 150, 
      valueGetter: (params) => new Date(params).toLocaleDateString() },
    { field: 'category', headerName: 'Thể loại', width: 120, 
      valueGetter: (params) => params.name },
    { field: 'type', headerName: 'Loại hình', width: 120, 
      valueGetter: (params) => params.name },
    { field: 'region', headerName: 'Khu vực', width: 150, 
      valueGetter: (params) => `${params.name}, ${params.ward.name}, ${params.ward.district.name}` },
    { field: 'direction', headerName: 'Hướng', width: 100, 
      valueGetter: (params) => params.name },
    { field: 'user', headerName: 'Người đăng', width: 200,
      renderCell: (params) => (
        <Box display="flex" alignItems="center">
          <Avatar src={params.avatar} alt={params.name} />
          <Typography sx={{ marginLeft: 1 }}>{params.name}</Typography>
        </Box>
      )
    },
    { field: 'image', headerName: 'Hình ảnh', width: 300, 
      renderCell: (params) => (
        <Box display="flex" gap={1}>
          {params.value.split(';').map((img, index) => (
            <Avatar key={index} src={`http://localhost:3000/images/${img}`} alt={`Image ${index}`} />
          ))}
        </Box>
      )
    },
  ];

  return (
    <Box sx={{ height: 600, width: '100%', overflow: "hidden", marginBottom: "10px", marginTop: "10px" }}>
      <Typography variant="h4" gutterBottom>Danh sách tin bất động sản</Typography>
      <DataGrid rows={listings} columns={columns} pageSize={5} />
    </Box>
  );
};

export default ListingUser;