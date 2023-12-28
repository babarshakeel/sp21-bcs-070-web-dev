import {
  Avatar,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";

const Blog = ({ title, description, imageURL, userName, isUser, id , likes }) => {
  // console.log(title, isUser);
  const [liked, setLiked] = useState(false);

  const navigate = useNavigate();
  const handleEdit = () => {
    navigate(`/myblogs/${id}`);
  };
  const deleteRequest = async () => {
    const res = axios
      .delete(`http://localhost:5000/api/blog/${id}`)
      .catch((err) => {
        console.log(err);
      });
    const data = await res.data;
    return data;
  };
  const handleDelete = () => {
    deleteRequest()
      .then((data) => {
        navigate("/myblogs").then(() => navigate("/blogs"));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleLike = async () => {
    try {
      const userId = localStorage.getItem("userId");
      await axios.put(`http://localhost:5000/api/blog/${id}/like`, { userId });
      setLiked(!liked);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Card
        sx={{
          width: "40%",
          margin: "auto",
          mt: 2,
          padding: 2,
          boxShadow: "10px 10px 20px #ccc",
        }}
      >
        {isUser && (
          <Box display="flex" justifyContent="flex-end">
            <IconButton onClick={handleEdit}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={handleDelete}>
              <DeleteOutlineRoundedIcon />
            </IconButton>
          </Box>
        )}
        <CardHeader
          avatar={
            <Avatar>
              {userName ? userName.slice(0, 1).toUpperCase() : ""}
            </Avatar>
          }
          title={userName || ""}
        />
        <CardMedia component="img" height="430" image={imageURL} />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
       
        <Box display="flex" alignItems="center">
         <Typography>{likes}</Typography>
          <FavoriteBorderIcon onClick={handleLike} style={{ color: liked ? "red" : "" , marginLeft: "10px"}} />
          
        </Box>
      </Card>
    </div>
  );
};
export default Blog;
