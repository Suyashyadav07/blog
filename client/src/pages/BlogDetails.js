import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";

const BlogDetails = () => {
  const [blog, setBlog] = useState({});
  const id = useParams().id;
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({});

  const getBlogDetail = useCallback(async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5500/api/v1/blog/get-blog/${id}`
      );
      if (data?.success) {
        setBlog(data?.blog);
        setInputs({
          title: data?.blog.title,
          description: data?.blog.description,
          image: data?.blog.image,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  useEffect(() => {
    getBlogDetail();
  }, [getBlogDetail]);

  
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `http://localhost:5500/api/v1/blog/update-blog/${id}`,
        {
          title: inputs.title,
          description: inputs.description,
          image: inputs.image,
          user: id,
        }
      );
      if (data?.success) {
        toast.success("Blog Updated");
        navigate("/my-blogs");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box
  width={"50%"}
  border={3}
  borderRadius={10}
  padding={3}
  margin="auto"
  boxShadow={"10px 10px 20px rgba(0, 0, 0, 0.2)"}
  display="flex"
  flexDirection={"column"}
  marginTop="30px"
  backgroundColor="white"
  sx={{
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      boxShadow: "15px 15px 25px rgba(0, 0, 0, 0.3)",
      transform: "translateY(-3px)", 
    },
  }}
>
  <Typography
    variant="h2"
    textAlign={"center"}
    fontWeight="bold"
    padding={3}
    color="#2C3E50"
  >
    Update A Post
  </Typography>
  
  <InputLabel sx={{ mb: 1, mt: 2, fontSize: "20px", fontWeight: "bold", color: "#555" }}>
    Title
  </InputLabel>
  <TextField
    name="title"
    value={inputs.title}
    onChange={handleChange}
    margin="normal"
    variant="outlined"
    required
    sx={{
      "& .MuiOutlinedInput-root": {
        "& fieldset": { borderColor: "#888" },
        "&:hover fieldset": { borderColor: "#444" },
        "&.Mui-focused fieldset": { borderColor: "#FF9800" },
      },
    }}
  />

  <InputLabel sx={{ mb: 1, mt: 2, fontSize: "20px", fontWeight: "bold", color: "#555" }}>
    Description
  </InputLabel>
  <TextField
    name="description"
    value={inputs.description}
    onChange={handleChange}
    margin="normal"
    variant="outlined"
    required
    sx={{
      "& .MuiOutlinedInput-root": {
        "& fieldset": { borderColor: "#888" },
        "&:hover fieldset": { borderColor: "#444" },
        "&.Mui-focused fieldset": { borderColor: "#FF9800" },
      },
    }}
  />

  <InputLabel sx={{ mb: 1, mt: 2, fontSize: "20px", fontWeight: "bold", color: "#555" }}>
    Image URL
  </InputLabel>
  <TextField
    name="image"
    value={inputs.image}
    onChange={handleChange}
    margin="normal"
    variant="outlined"
    required
    sx={{
      "& .MuiOutlinedInput-root": {
        "& fieldset": { borderColor: "#888" },
        "&:hover fieldset": { borderColor: "#444" },
        "&.Mui-focused fieldset": { borderColor: "#FF9800" },
      },
    }}
  />

  <Button
    type="submit"
    color="warning"
    variant="contained"
    sx={{
      mt: 3,
      fontSize: "18px",
      fontWeight: "bold",
      padding: "10px",
      transition: "all 0.3s ease-in-out",
      "&:hover": {
        backgroundColor: "#E65100",
      },
    }}
  >
    UPDATE
  </Button>
</Box>

    </form>
  );
};

export default BlogDetails;
