import React from "react";
import { Typography, List, ListItem, ListItemText, Divider, Paper, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NewsCategories = ({newsCategory}) => {
  const navigate = useNavigate()

  return (
    <Box  style={{ padding: '16px', margin: '16px', width: '25%' }}>
      <Typography variant="h6" gutterBottom style={{color: "#fff"}}>
        Danh Mục Chuyên Mục Tin Tức
      </Typography>
      <List>
        {newsCategory.map((category, index) => (
          <React.Fragment key={index}>
            <ListItem>
              <ListItemText
                primary={<Typography   onClick={() => navigate(`/news/${category.id}`)} variant="subtitle1" style={{ fontWeight: 'bold', color: "#fff", cursor: "pointer" }}>{category.name}</Typography>}
                secondary={<Typography variant="subtitle1" style={{ fontWeight: 'bold', color: "#ddd", opacity: 0.7 }}>{category.description}</Typography>}
              />
            </ListItem>
            {index < newsCategory.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default NewsCategories;