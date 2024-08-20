import React, { useState } from 'react';
import { Box, TextField, MenuItem, Select, InputLabel, FormControl, Typography, Divider, Button, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
const PostListing = () => {
    const [bedrooms, setBedrooms] = useState(1);
    const [bathrooms, setBathrooms] = useState(1);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
          setSelectedFiles([...event.target.files]);
        }
      };
    return (
        <Box sx={{ maxWidth: 800, margin: 'auto', padding: 2 }}>
          {/* Thông tin cơ bản */}
          <Box mb={3}>
            <Typography variant="h6">Thông tin cơ bản</Typography>
            <Typography variant="caption">Thông tin có dấu (*) là bắt buộc</Typography>
            <Divider sx={{ my: 2 }} />
            
            {/* Loại bất động sản */}
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Loại bất động sản</InputLabel>
              <Select label="Loại bất động sản">
                <MenuItem value="nha_rieng">Nhà riêng</MenuItem>
                <MenuItem value="can_ho">Căn hộ</MenuItem>
              </Select>
            </FormControl>
    
            {/* Địa chỉ */}
            <Box sx={{ display: 'flex', gap: 2 }}>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Tỉnh, thành phố</InputLabel>
                <Select label="Tỉnh, thành phố">
                  <MenuItem value="ha_noi">Hà Nội</MenuItem>
                  <MenuItem value="ho_chi_minh">Hồ Chí Minh</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Quận, huyện</InputLabel>
                <Select label="Quận, huyện">
                  <MenuItem value="cau_giay">Cầu Giấy</MenuItem>
                  <MenuItem value="dong_da">Đống Đa</MenuItem>
                </Select>
              </FormControl>
            </Box>
    
            <Box sx={{ display: 'flex', gap: 2 }}>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Phường, xã</InputLabel>
                <Select label="Phường, xã">
                  <MenuItem value="dich_vong">Dịch Vọng</MenuItem>
                  <MenuItem value="nghia_do">Nghĩa Đô</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Đường, phố</InputLabel>
                <Select label="Đường, phố">
                  <MenuItem value="tran_thai_tong">Trần Thái Tông</MenuItem>
                  <MenuItem value="nguyen_khang">Nguyễn Khang</MenuItem>
                </Select>
              </FormControl>
            </Box>
    
            <TextField fullWidth label="Địa chỉ hiện thị trên tin đăng" variant="outlined" />
          </Box>
    
          {/* Thông tin bài viết */}
          <Box mb={3}>
            <Typography variant="h6">Thông tin bài viết</Typography>
            <Typography variant="caption">
              Không gộp nhiều bất động sản trong một tin rao, để quá trình đăng tin và duyệt nhanh hơn
            </Typography>
            <Divider sx={{ my: 2 }} />
    
            <TextField fullWidth label="Tiêu đề" variant="outlined" sx={{ mb: 2 }} />
            <TextField fullWidth label="Mô tả" variant="outlined" multiline rows={4} sx={{ mb: 2 }} />
          </Box>

          {/* Thông tin bất động sản */}
      <Box mb={3}>
        <Typography variant="h6">Thông tin bất động sản</Typography>
        <Divider sx={{ my: 2 }} />

        {/* Diện tích */}
        <TextField fullWidth label="Diện tích (m²)" variant="outlined" sx={{ mb: 2 }} />

        {/* Mức giá */}
        <TextField fullWidth label="Mức giá (VNĐ)" variant="outlined" sx={{ mb: 2 }} />

        {/* Giấy tờ pháp lý */}
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Giấy tờ pháp lý</InputLabel>
          <Select label="Giấy tờ pháp lý">
            <MenuItem value="so_do">Sổ đỏ</MenuItem>
            <MenuItem value="so_hong">Sổ hồng</MenuItem>
            <MenuItem value="giay_to_khac">Giấy tờ khác</MenuItem>
          </Select>
        </FormControl>

         {/* Số phòng ngủ */}
         <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Typography sx={{ flexGrow: 1 }}>Số phòng ngủ</Typography>
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
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Typography sx={{ flexGrow: 1 }}>Số phòng tắm</Typography>
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
          <InputLabel>Hướng nhà</InputLabel>
          <Select label="Hướng nhà">
            <MenuItem value="dong">Đông</MenuItem>
            <MenuItem value="tay">Tây</MenuItem>
            <MenuItem value="nam">Nam</MenuItem>
            <MenuItem value="bac">Bắc</MenuItem>
          </Select>
        </FormControl>

        {/* Nội thất */}
        <TextField fullWidth label="Nội thất" variant="outlined" multiline rows={4} sx={{ mb: 2 }} />


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
    
          <Button variant="contained" color="primary">Gửi</Button>
        </Box>
      );
};

export default PostListing;