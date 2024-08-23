import React from "react";
import { Typography, List, ListItem, ListItemText, Divider, Paper, Box } from "@mui/material";

const NewsCategories = () => {
  const categories = [
    { title: "Tin Tức Thị Trường", subcategories: ["Tin nóng", "Xu hướng thị trường"] },
    { title: "Chính Sách & Pháp Luật", subcategories: ["Chính sách nhà nước", "Tư vấn pháp luật"] },
    { title: "Dự Án Mới", subcategories: ["Dự án căn hộ", "Dự án biệt thự", "Dự án đất nền"] },
    { title: "Tư Vấn Đầu Tư", subcategories: ["Đầu tư bất động sản", "Cơ hội sinh lời"] },
    { title: "Phong Thủy", subcategories: ["Phong thủy nhà đất", "Tư vấn phong thủy"] },
    { title: "Kiến Trúc & Thiết Kế", subcategories: ["Thiết kế nội thất", "Xu hướng kiến trúc"] },
    { title: "Tài Chính & Ngân Hàng", subcategories: ["Lãi suất vay", "Chính sách tín dụng"] },
    { title: "Kinh Nghiệm Mua Bán", subcategories: ["Mua nhà", "Bán nhà"] },
    { title: "Phân Tích & Báo Cáo", subcategories: ["Báo cáo thị trường", "Phân tích chuyên sâu"] },
    { title: "Đời Sống & Cộng Đồng", subcategories: ["Cộng đồng cư dân", "Đời sống & tiện ích"] },
  ];

  return (
    <Box  style={{ padding: '16px', margin: '16px', width: '25%' }}>
      <Typography variant="h6" gutterBottom style={{color: "#fff"}}>
        Danh Mục Chuyên Mục Tin Tức
      </Typography>
      <List>
        {categories.map((category, index) => (
          <React.Fragment key={index}>
            <ListItem>
              <ListItemText
                primary={<Typography variant="subtitle1" style={{ fontWeight: 'bold', color: "#fff" }}>{category.title}</Typography>}
                secondary={<Typography variant="subtitle1" style={{ fontWeight: 'bold', color: "#ddd", opacity: 0.7 }}>{category.subcategories.join(", ")}</Typography>}
              />
            </ListItem>
            {index < categories.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default NewsCategories;