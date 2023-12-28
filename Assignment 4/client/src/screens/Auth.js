import React from "react";
import { Typography, Box, TextField, Button } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();
  const [isSignup, setisSignup] = useState(false);
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChnage = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const sendRequest = async (type = "login") => {
    const res = await axios
      .post(`http://localhost:5000/api/users/${type}`, {
        name: inputs.name,
        email: inputs.email,
        password: inputs.password,
      })
      .catch((err) => {
        console.log(err);
      });

    const data = await res.data;
    return data;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    if (isSignup) {
      sendRequest("signup")
        .catch((error) => {
          console.error('Signup error:', error);
        })
        .finally(() => {
          setisSignup(false);
          navigate("/auth");
        });
    } else {
      sendRequest().then((data) => {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.user._id);
        navigate("/blogs");
      });
    }
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
        >
          <Typography padding={3} variant="h4" align="center">
            {isSignup ? "SignUp" : "Login"}
          </Typography>
          {isSignup && (
            <TextField
              name="name"
              margin="normal"
              variant="outlined"
              label="Name"
              fullWidth
              value={inputs.name}
              onChange={handleChnage}
            />
          )}
          {""}
          <TextField
            name="email"
            margin="normal"
            variant="outlined"
            label="Email"
            type="email"
            fullWidth
            value={inputs.email}
            onChange={handleChnage}
          />
          <TextField
            name="password"
            margin="normal"
            variant="outlined"
            label="Password"
            type="password"
            fullWidth
            value={inputs.password}
            onChange={handleChnage}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginTop: "20px" }}
          >
            Submit
          </Button>
          <Button
            onClick={() => setisSignup(!isSignup)}
            variant="outlined"
            color="secondary"
            fullWidth
            style={{ marginTop: "10px" }}
          >
            Go to {isSignup ? "Login" : "SignUp"}
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Auth;
