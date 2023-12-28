import React, { useEffect, useState } from "react";
import { useParams , useNavigate} from "react-router-dom";
import { Typography, Box, InputLabel, TextField, Button } from "@mui/material";
import axios from "axios";

const BlogDetail = () => {
  const [blog, setBlog] = useState();
  const { id } = useParams();
  console.log(id);
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({ });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const fetchDetails = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/blog/${id}`);
      const data = await res.data;
      return data;
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchDetails().then((data) => {
      setBlog(data.blog);
      setInputs({title: data.blog.title, description: data.blog.description})

    });
  }, [id]);
  console.log(blog);

  // send request to update blog
  const sendRequest = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/api/blog/update/${id}`, {
        title: inputs.title,
        description: inputs.description,
      });
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
      navigate('/myblogs');
    });
  };
  return (
    <div>
      <h1>Blogs Detail</h1>
      {inputs &&
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
         
          <Button type="submit">Submit</Button>
        </Box>
      </form>}
    </div>
  );
};

export default BlogDetail;