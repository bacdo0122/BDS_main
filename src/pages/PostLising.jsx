import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Typography,
  Divider,
  Button,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { fetchAllTypes, fetchCategory, fetchCreateListing, fetchDirection, fetchDistrict, fetchRegion, fetchUserDetails, fetchWard } from '../api/homeApi';
import { UserContext } from "../context/UserProvider";
import { toast } from "react-toastify";
const PostListing = () => {
  const [bedrooms, setBedrooms] = useState(1);
  const [bathrooms, setBathrooms] = useState(1);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [types, setTypes] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [region, setRegion] = useState([]);
  const [category, setCategory] = useState([]);
  const [direction, setDirection] = useState([]);
  const [listing, setListing] = useState({
    type: '',
    category: '',
    regionId: '',
    userId: '',
    title: '',
    description: '',
    address: '',
    area: '',
    bedrooms: 1,
    price: '0',
    pricePerArea: '0',
    bathrooms: 1,
    district: '',
    ward: '',
    legal_status: '',
    orientation: '',
    furnishing: '',
    status: 'pending',
    direction: '',
    images: ''
  });

  const handleFileChange = (event) => {
    if (event.target.files) {
      setSelectedFiles([...event.target.files]);
    }
  };

  const getTypes = () => {
    fetchAllTypes()
          .then((json) => {
            setTypes(json);
          });
  }; 

  const getCategory = () => {
    fetchCategory()
          .then((json) => {
            setCategory(json);
          });
  }; 

  const getDirection = () => {
    fetchDirection()
          .then((json) => {
            setDirection(json);
          });
  }; 

  const getRegion = async () => {
    const res = await Promise.all([fetchDistrict(), fetchRegion(), fetchWard()]);
    setDistricts(res[0]);
    setRegion(res[1]);
    setWards(res[2]);
  }; 

  
  useEffect(() => {
    getTypes();
    getRegion();
    getCategory();
    getDirection();
  }, [])
  const [userDetails, setUserDetails] = useState({});
  const { user } = useContext(UserContext);
  const getUserDetail = () => {
    if(user.accessToken){
    fetchUserDetails(user.accessToken)
    .then((data) => {
        setUserDetails(data);
    });
   }
};

useEffect(getUserDetail, [user]);
  const hanldeCreateListing = async () => {
    try {
      const regionId = region.find(item => item.ward.name === listing.ward && item.ward.district.name === listing.district)
      await fetchCreateListing({...listing,
        image:selectedFiles.map(item => item.name).join(";"),
        bedrooms: Number(bedrooms),
        bathrooms: Number(bathrooms),
        direction_id: listing.direction,
        category_id: listing.category,
        type_id: listing.type,

        regionId: regionId?.id,
        userId: userDetails?.id,
        pricePerArea: Number(listing.pricePerArea),
        legal_status: Boolean(listing.legal_status),
        furnishing: Boolean(listing.furnishing),
      })
      toast.info("Đăng tin rao thành công! Đợi chấp thuận từ quản trị viên!")
    } catch (error) {
      toast.error("Sai thông tin ! Nhập lại!")
    }
  }

  return (
    <Box sx={{ maxWidth: 800, margin: "auto", padding: 2, color: "#fff" }}>
      {/* Thông tin cơ bản */}
      <Box mb={3}>
        <Typography variant="h6">Thông tin cơ bản</Typography>
        <Typography variant="caption">
          Thông tin có dấu (*) là bắt buộc
        </Typography>
        <Divider sx={{ my: 2 }} />

        {/* Loại bất động sản */}
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel style={{ color: "#fff" }}>Loại bất động sản</InputLabel>
          <Select label="Loại bất động sản" value={listing.type} onChange={(e) => setListing({...listing, type: e.target.value})}>
            {types.length > 0 && types.map(item => {
              return <MenuItem value={item.id}>{item.description}</MenuItem>
            })}
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel style={{ color: "#fff" }}>Chuyên mục bất động sản</InputLabel>
          <Select label="Loại bất động sản" value={listing.category} onChange={(e) => setListing({...listing, category: e.target.value})}>
            {category.length > 0 && category.map(item => {
              return <MenuItem value={item.id}>{item.description}</MenuItem>
            })}
          </Select>
        </FormControl>

        {/* Địa chỉ */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel style={{ color: "#fff" }}>Quận, huyện</InputLabel>
            <Select label="Quận, huyện" value={listing.district} onChange={(e) => {
              setListing({...listing, district: e.target.value})
            }} >
              {districts.length > 0 && districts.map(item => {
              return <MenuItem value={item.name}>{item.name}</MenuItem>
            })}
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel style={{ color: "#fff" }}>Phường, xã</InputLabel>
            <Select label="Phường, xã" value={listing.ward} onChange={(e) => setListing({...listing, ward: e.target.value})}>
            {wards.length > 0 && wards.map(item => {
              return <MenuItem value={item.name}>{item.name}</MenuItem>
            })}
           
            </Select>
          </FormControl>
        </Box>

        <TextField value={listing.address} onChange={(e) => setListing({...listing, address: e.target.value})}
          fullWidth
          label="Địa chỉ hiện thị trên tin đăng"
          variant="outlined"
          sx={{
            "& label": {
              color: "#fff", // Màu của label mặc định
            },
          }}
          InputProps={{
            style: {
              color: "#fff", // Màu văn bản
            },
          }}
        />
      </Box>

      {/* Thông tin bài viết */}
      <Box mb={3}>
        <Typography variant="h6" style={{ color: "#fff" }}>
          Thông tin bài viết
        </Typography>
        <Typography variant="caption">
          Không gộp nhiều bất động sản trong một tin rao, để quá trình đăng tin
          và duyệt nhanh hơn
        </Typography>
        <Divider sx={{ my: 2 }} />

        <TextField value={listing.title} onChange={(e) => setListing({...listing, title: e.target.value})}
          fullWidth
          label="Tiêu đề"
          variant="outlined"
          sx={{
            mb: 2,
            "& label": {
              color: "#fff", // Màu của label mặc định
            },
          }}
          InputProps={{
            style: {
              color: "#fff", // Màu văn bản
            },
          }}
        />
        <TextField value={listing.description} onChange={(e) => setListing({...listing, description: e.target.value})}
          fullWidth
          label="Mô tả"
          variant="outlined"
          multiline
          rows={4}
          sx={{
            mb: 2,
            "& label": {
              color: "#fff", // Màu của label mặc định
            },
          }}
          InputProps={{
            style: {
              color: "#fff", // Màu văn bản
            },
          }}
        />
      </Box>

      {/* Thông tin bất động sản */}
      <Box mb={3}>
        <Typography variant="h6">Thông tin bất động sản</Typography>
        <Divider sx={{ my: 2 }} />

        {/* Diện tích */}
        <TextField value={listing.area} onChange={(e) => setListing({...listing, area: e.target.value})}
          fullWidth
          label="Diện tích (m²)"
          variant="outlined"
          sx={{
            mb: 2,
            "& label": {
              color: "#fff", // Màu của label mặc định
            },
          }}
          InputProps={{
            style: {
              color: "#fff", // Màu văn bản
            },
          }}
        />

        {/* Mức giá */}
        <TextField value={listing.price} onChange={(e) => setListing({...listing, price: e.target.value})}
          fullWidth
          label={listing.type === 1 ? "Giá cho thuê (triệu / m2)" : "Giá bán (tỷ)"}
          variant="outlined"
          sx={{
            mb: 2,
            "& label": {
              color: "#fff", // Màu của label mặc định
            },
          }}
          InputProps={{
            style: {
              color: "#fff", // Màu văn bản
            },
          }}
        />

        {/* Mức giá moi m2 */}
        { listing.type === 2 &&
          <TextField value={listing.pricePerArea} onChange={(e) => setListing({...listing, pricePerArea: e.target.value})}
          fullWidth
          label="Giá mỗi m2"
          variant="outlined"
          sx={{
            mb: 2,
            "& label": {
              color: "#fff", // Màu của label mặc định
            },
          }}
          InputProps={{
            style: {
              color: "#fff", // Màu văn bản
            },
          }}
        />
        }

        {/* Tiện nghi */}
        <TextField value={listing.orientation} onChange={(e) => setListing({...listing, orientation: e.target.value})}
          fullWidth
          label="Tiện nghi"
          variant="outlined"
          sx={{
            mb: 2,
            "& label": {
              color: "#fff", // Màu của label mặc định
            },
          }}
          InputProps={{
            style: {
              color: "#fff", // Màu văn bản
            },
          }}
        />

        {/* Giấy tờ pháp lý */}
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel style={{ color: "#fff" }}>Giấy tờ pháp lý</InputLabel>
          <Select label="Giấy tờ pháp lý" value={listing.legal_status} onChange={(e) => setListing({...listing, legal_status: e.target.value})}>
            <MenuItem value="true">Có sổ</MenuItem>
            <MenuItem value="false">Không có sổ</MenuItem>
          </Select>
        </FormControl>

        {/* Số phòng ngủ */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Typography sx={{ flexGrow: 1 }} style={{ color: "#fff" }}>
            Số phòng ngủ
          </Typography>
          <IconButton onClick={() => setBedrooms((pre) => --pre)}>
            <RemoveIcon />
          </IconButton>
          <TextField 
            type="number"
            value={bedrooms}
            onChange={(e) => setBedrooms(parseInt(e.target.value))}
            sx={{ width: 60, mx: 2 }}
            inputProps={{ min: 0 }}
          />
          <IconButton onClick={() => setBedrooms((pre) => ++pre)}>
            <AddIcon />
          </IconButton>
        </Box>

        {/* Số phòng tắm */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Typography sx={{ flexGrow: 1 }} style={{ color: "#fff" }}>
            Số phòng tắm
          </Typography>
          <IconButton onClick={() => setBathrooms((pre) => --pre)}>
            <RemoveIcon />
          </IconButton>
          <TextField
            type="number"
            value={bathrooms}
            onChange={(e) => setBathrooms(parseInt(e.target.value))}
            sx={{ width: 60, mx: 2 }}
            inputProps={{ min: 0 }}
          />
          <IconButton onClick={() => setBathrooms((pre) => ++pre)}>
            <AddIcon />
          </IconButton>
        </Box>

        {/* Hướng nhà */}
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel style={{ color: "#fff" }}>Hướng nhà</InputLabel>
          <Select label="Hướng nhà" value={listing.direction} onChange={(e) => setListing({...listing, direction: e.target.value})}>
            {direction.length > 0 && direction.map(item => {
            return  <MenuItem value={item.id}>{item.name}</MenuItem>
            })}
          </Select>
        </FormControl>

        {/* Nội thất */}
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel style={{ color: "#fff" }}>Nội thất</InputLabel>
          <Select label="Nội thất" value={listing.furnishing} onChange={(e) => setListing({...listing, furnishing: e.target.value})}>
            <MenuItem value="true">Đã có nội thất</MenuItem>
            <MenuItem value="false">Chưa có nội thất</MenuItem>
          </Select>
        </FormControl>

        {/* Hình ảnh */}
        <Box mb={3}>
          <Typography variant="h6">Hình ảnh</Typography>
          <Divider sx={{ my: 2 }} />

          <Button variant="contained" component="label">
            Tải lên hình ảnh
            <input
              type="file"
              accept="image/*"
              multiple
              hidden
              onChange={handleFileChange}
            />
          </Button>

          {selectedFiles.length > 0 && (
            <Box mt={2}>
              <Typography>Hình ảnh đã chọn:</Typography>
              <ul>
                {selectedFiles.map((file, index) => (
                  <li key={index}>{file.name}</li>
                ))}
              </ul>
            </Box>
          )}
        </Box>
      </Box>

      <Button variant="contained" color="primary" onClick={hanldeCreateListing}>
        Gửi
      </Button>
    </Box>
  );
};

export default PostListing;
