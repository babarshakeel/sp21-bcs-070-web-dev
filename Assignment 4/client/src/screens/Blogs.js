import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Blog from "./BlogCard";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const sendRequest = async () => {
    let res;
    try {
      res = await axios.get("http://localhost:5000/api/blog");
    } catch (err) {
      console.log(err);
      throw err;
    }
    const data = await res.data;
    return data;
  };

  useEffect(() => {
    sendRequest().then((data) => setBlogs(data.blogs));
  }, []);
  console.log(blogs);
  return (
    <div>
      {blogs &&
        blogs.map((blog, index) => (
          <Blog
            id={blog._id}
            isUser={localStorage.getItem("userId") === blog.user._id}
            title={blog.title}
            description={blog.description}
            imageURL={blog.image}
            userName={blog.user.name}
            likes={blog.likes.length}
          />
        ))}
    </div>
  );
};

export default Blogs;
