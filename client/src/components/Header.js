import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  AppBar,
  Toolbar,
  Button,
  Typography,
  Tabs,
  Tab,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../redux/store";
import toast from "react-hot-toast";
const Header = () => {
  let isLogin = useSelector((state) => state.isLogin);
  isLogin = isLogin || localStorage.getItem("userId");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [value, setValue] = useState();

  const handleLogout = () => {
    try {
      dispatch(authActions.logout());
      toast.success("Logout Successfully");
      navigate("/login");
      localStorage.clear();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <AppBar position="sticky" sx={{ backgroundColor: "#7B68EE", boxShadow: 3 }}>
  <Toolbar>
    <Typography 
      variant="h4" 
      sx={{ fontWeight: "bold", color: "#ECF0F1", letterSpacing: 1 }}
    >
      BlogBreeze
    </Typography>

    {isLogin && (
      <Box display="flex" marginLeft="auto" marginRight="auto">
        <Tabs
          textColor="inherit"
          value={value}
          onChange={(e, val) => setValue(val)}
          indicatorColor="secondary"
          sx={{
            "& .MuiTab-root": {
              fontSize: "1rem",
              fontWeight: "500",
              textTransform: "none",
              transition: "0.3s",
              "&:hover": { color: "#E74C3C" },
            },
          }}
        >
          <Tab label="Blogs" LinkComponent={Link} to="/blogs" />
          <Tab label="My Blogs" LinkComponent={Link} to="/my-blogs" />
          <Tab label="Create Blog" LinkComponent={Link} to="/create-blog" />
        </Tabs>
      </Box>
    )}

    <Box display="flex" marginLeft="auto">
      {!isLogin && (
        <>
          <Button
            sx={{
              margin: 1,
              color: "white",
              backgroundColor: "#E74C3C",
              "&:hover": { backgroundColor: "#C0392B" },
              fontSize: "0.9rem",
              fontWeight: "500",
              borderRadius: 2,
            }}
            LinkComponent={Link}
            to="/login"
          >
            Login
          </Button>
          <Button
            sx={{
              margin: 1,
              color: "white",
              backgroundColor: "#228B22",
              "&:hover": { backgroundColor: "#2980B9" },
              fontSize: "0.9rem",
              fontWeight: "500",
              borderRadius: 2,
            }}
            LinkComponent={Link}
            to="/register"
          >
            Register
          </Button>
        </>
      )}

      {isLogin && (
        <Button
          onClick={handleLogout}
          sx={{
            margin: 1,
            color: "white",
            backgroundColor: "#4B0082",
            "&:hover": { backgroundColor: "#27AE60" },
            fontSize: "0.9rem",
            fontWeight: "500",
            borderRadius: 2,
          }}
        >
          Logout
        </Button>
      )}
    </Box>
  </Toolbar>
</AppBar>
  </>
  );
};

export default Header;
