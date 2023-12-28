import React, { useEffect, useState } from "react";
import axios from "axios";
import Blog from "./BlogCard";

const UserBlogs = () => {
  const [user, setUser] = useState();
  const [page, setPage] = useState(1);

  const id = localStorage.getItem("userId");

  const sendRequest = async (page) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/blog/user/${id}?page=${page}`
      );
      const data = res.data;

      if (data.message === "No blog found") {
        console.log("No blog found for this user");
      } else {
        setUser(data.user);
      }
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  useEffect(() => {
    sendRequest(page);
  }, [page]);

  const handleNext = () => {
    setPage(page + 1);
  };

  const handlePrev = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  console.log("Blogs of user", user);

  return (
    <div>
      {user &&
        user.blogs &&
        user.blogs.map((blog, index) => (
          <Blog
            key={index}
            id={blog._id}
            isUser={true}
            title={blog.title}
            description={blog.description}
            imageURL={blog.image}
            userName={user.name}
            likes={blog.likes.length}
          />
        ))}
      
      <div
        style={{ display: "flex", justifyContent: "center", margin: "20px" }}
      >
        <button
          onClick={handlePrev}
          style={{
            marginRight: "10px",
            padding: "10px 20px",
            fontSize: "16px",
            borderRadius: "5px",
            border: "none",
            color: "white",
            backgroundColor: "#007BFF",
            cursor: "pointer",
          }}
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            borderRadius: "5px",
            border: "none",
            color: "white",
            backgroundColor: "#007BFF",
            cursor: "pointer",
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserBlogs;
