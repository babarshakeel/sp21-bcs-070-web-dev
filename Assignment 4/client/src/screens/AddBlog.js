import React, { useState } from "react";
import { Typography, Box, InputLabel, TextField, Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddBlog = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    imageURL: "",
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const sendRequest = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/api/blog/add",
        {
          title: inputs.title,
          description: inputs.description,
          image: inputs.imageURL,
          user: localStorage.getItem("userId"),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = response.data;
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest().then((data) => {
      console.log(data);
      navigate("/blogs");
    });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          maxWidth={400}
          display="flex"
          flexDirection={"column"}
          alignItems="center"
          justifyContent={"center"}
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          margin="auto"
          marginTop={5}
          borderRadius={5}
          sx={{
            "& .MuiInputLabel-root": { color: "text.secondary", mt: 2 },
            "& .MuiTextField-root": { mt: 1, mb: 1, width: "100%" },
          }}
        >
          <Typography variant="h6">Post your blog</Typography>
          <InputLabel>Title</InputLabel>
          <TextField
            variant="outlined"
            name="title"
            onChange={handleChange}
            value={inputs.title}
          />
          <InputLabel>Description</InputLabel>
          <TextField
            variant="outlined"
            name="description"
            onChange={handleChange}
            value={inputs.description}
          />
          <InputLabel>Image Url</InputLabel>
          <TextField
            variant="outlined"
            name="imageURL"
            onChange={handleChange}
            value={inputs.imageURL}
          />
          <Button type="submit">Submit</Button>
        </Box>
      </form>
    </div>
  );
};

export default AddBlog;
